import bcrypt from "bcrypt";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { getManager } from "typeorm";
import { UserInputError, AuthenticationError } from "apollo-server-lambda";
import isAfter from "date-fns/isAfter";

import {
	SignUpInput,
	LogInInput,
	AuthenticateWithAutoLoginTokenInput,
} from "resolvers/AuthResolverTypes";
import { User } from "models/User";
import { CustomContext } from "middleware/context";
import AuthService from "services/Auth";
import MailerService from "services/Mailer";

@Resolver()
export class AuthResolver {
	@Query(() => User, { nullable: true })
	async currentUser(@Ctx() ctx: CustomContext) {
		if (!ctx.userId) {
			return null;
		}
		const user = await User.findOne({ where: { id: ctx.userId } });
		return user;
	}

	@Mutation(() => User)
	async signUp(@Arg("input") input: SignUpInput) {
		const { email, username, redirectTo } = input;
		if (!email || !username) {
			throw new UserInputError("Must provide email and username");
		}
		if (!AuthService.isValidEmail(email)) {
			throw new Error("Invalid email address");
		}

		const existingUser = await getManager()
			.createQueryBuilder(User, "user")
			.where("user.email = :email OR user.username = :username", {
				email,
				username,
			})
			.getOne();
		if (existingUser) {
			const emailAlreadyExists = existingUser.email === email;
			throw new Error(
				emailAlreadyExists
					? "There is already an account under that email address. Please log in"
					: "That username is taken, please pick another one"
			);
		}

		const { tokenUnhashed, tokenHashed, tokenExpiry } =
			await AuthService.createAutoLoginToken();

		const user = User.create({
			email,
			username,
			autoLoginTokenHashed: tokenHashed,
			autoLoginTokenExpiry: tokenExpiry,
		});
		await user.save();

		await MailerService.sendEmailWithAutoLoginUrl({
			user,
			autoLoginTokenUnhashed: tokenUnhashed,
			redirectTo,
		});

		return user;
	}

	@Mutation(() => User)
	async logIn(@Arg("input") input: LogInInput) {
		const { email, redirectTo } = input;
		if (!email) {
			throw new UserInputError("Must provide email");
		}

		const user = await User.findOne({ where: { email } });
		if (!user) {
			throw new AuthenticationError(
				"Could not find user with that email address"
			);
		}

		const { tokenUnhashed, tokenHashed, tokenExpiry } =
			await AuthService.createAutoLoginToken();
		user.autoLoginTokenHashed = tokenHashed;
		user.autoLoginTokenExpiry = tokenExpiry;
		await user.save();

		await MailerService.sendEmailWithAutoLoginUrl({
			user,
			autoLoginTokenUnhashed: tokenUnhashed,
			redirectTo,
		});

		return user;
	}

	@Mutation(() => User)
	async authenticateWithAutoLoginToken(
		@Arg("input") input: AuthenticateWithAutoLoginTokenInput,
		@Ctx() ctx: CustomContext
	) {
		// If the user is already logged in, return the User
		if (ctx.userId) {
			const loggedInUser = await User.findOne({ where: { id: ctx.userId } });
			if (loggedInUser) {
				return loggedInUser;
			} else {
				throw new Error("Error fetching logged in user");
			}
		}

		const { tokenUnhashed } = input;
		if (!tokenUnhashed) {
			throw new Error("No auto-login token provided");
		}
		const tokenHashed = bcrypt.hash(tokenUnhashed, 10);

		const user = await User.findOne({
			where: { autoLoginTokenHashed: tokenHashed },
		});
		if (!user || !user.autoLoginTokenExpiry) {
			throw new Error("This is not a valid auto-login token");
		}

		const tokenExpiry = new Date(user.autoLoginTokenExpiry);
		if (isAfter(tokenExpiry, new Date())) {
			const jwt = AuthService.createJwt(user);
			ctx.setResponseJwtCookie = AuthService.makeValidJwtCookie(jwt);
		} else {
			throw new Error("This auto-login token is no longer valid");
		}

		// Invalidate the auto-login token now that the user has logged in
		user.autoLoginTokenExpiry = AuthService.makeInvalidAutoLoginTokenExpiry();
		await user.save();

		return user;
	}

	@Mutation(() => Boolean)
	async logOut(@Ctx() ctx: CustomContext) {
		// Invalidate any existing auto-login token for the user
		if (ctx.userId) {
			const loggedInUser = await User.findOne({ where: { id: ctx.userId } });
			if (loggedInUser) {
				loggedInUser.autoLoginTokenExpiry =
					AuthService.makeInvalidAutoLoginTokenExpiry();
				await loggedInUser.save();
			}
		}

		// Set an invalid response JWT cookie which will clear the cookie on the
		// client side
		ctx.setResponseJwtCookie = AuthService.makeInvalidJwtCookie();
		return true;
	}
}
