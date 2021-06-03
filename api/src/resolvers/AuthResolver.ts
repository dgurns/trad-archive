import bcrypt from "bcrypt";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { getManager } from "typeorm";
import { UserInputError, AuthenticationError } from "apollo-server-lambda";
import isAfter from "date-fns/isAfter";

import { SignUpInput, LogInInput } from "resolvers/AuthResolverTypes";
import { User } from "models/User";
import { CustomContext } from "middleware/context";
import AuthService from "services/Auth";
import MailerService from "services/Mailer";
import Mailer from "services/Mailer";

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
		const { email, username } = input;
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

		await Mailer.sendEmailWithAutoLoginUrl({
			user,
			autoLoginTokenUnhashed: tokenUnhashed,
		});

		return user;
	}

	@Mutation(() => User)
	async logIn(@Arg("email") email: string, @Arg("password") password: string) {
		if (!email || !password) {
			throw new UserInputError("Must provide email and password");
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

		await Mailer.sendEmailWithAutoLoginUrl({
			user,
			autoLoginTokenUnhashed: tokenUnhashed,
		});

		return user;
	}

	@Mutation(() => User)
	async authenticateWithAutoLoginToken(
		@Arg("token") token: string,
		@Ctx() ctx: CustomContext
	) {
		if (!token) {
			throw new Error("No auto-login token provided");
		}
		const hashedToken = bcrypt.hash(token, 10);

		const user = await User.findOne({
			where: { autoLoginTokenHashed: hashedToken },
		});
		if (!user || !user.autoLoginTokenExpiry) {
			throw new Error("Invalid auto-login token");
		}

		const tokenExpiry = new Date(user.autoLoginTokenExpiry);
		if (isAfter(tokenExpiry, new Date())) {
			const jwt = AuthService.createJwt(user);
			ctx.setResponseJwtCookie = AuthService.makeValidJwtCookie(jwt);
		} else {
			throw new Error("This auto-login token has expired");
		}
	}

	@Mutation(() => Boolean)
	logOut(@Ctx() ctx: CustomContext) {
		ctx.setResponseJwtCookie = AuthService.makeInvalidJwtCookie();
		return true;
	}
}
