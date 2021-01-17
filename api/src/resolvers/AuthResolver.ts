import bcrypt from 'bcrypt';
import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { getManager } from 'typeorm';
import { UserInputError, AuthenticationError } from 'apollo-server-lambda';

import { User } from 'entities/User';
import AuthService from 'services/Auth';
import { CustomContext } from 'middleware/context';

@Resolver()
export class AuthResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: CustomContext) {
    if (!ctx.userId) {
      return null;
    }
    const user = await User.findOne(ctx.userId);
    return user;
  }

  @Mutation(() => User)
  async signUp(
    @Arg('email') email: string,
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Ctx() ctx: CustomContext
  ) {
    if (!email || !username || !password) {
      throw new UserInputError('Must provide email, username, and password');
    }

    const existingUser = await getManager()
      .createQueryBuilder(User, 'user')
      .where('user.email = :email OR user.username = :username', {
        email,
        username,
      })
      .getOne();
    if (existingUser) {
      const emailAlreadyExists = existingUser.email === email;
      throw new Error(
        emailAlreadyExists
          ? 'There is already an account under that email address. Please log in'
          : 'That username is taken, please pick another one'
      );
    }

    if (!AuthService.isValidEmail(email)) {
      throw new Error('Invalid email address');
    }
    if (!AuthService.isSecurePassword(password)) {
      throw new Error('Password must be at least 6 characters');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = User.create({
      email,
      username,
      hashedPassword,
    });
    await user.save();

    const jwt = AuthService.createJwt(user);
    ctx.setResponseJwtCookie = AuthService.makeValidJwtCookie(jwt);

    return user;
  }

  @Mutation(() => User)
  async logIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: CustomContext
  ) {
    if (!email || !password) {
      throw new UserInputError('Must provide email and password');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AuthenticationError(
        'Could not find user with that email address'
      );
    }

    const passwordIsValid = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordIsValid) {
      throw new AuthenticationError('Invalid password');
    }

    const jwt = AuthService.createJwt(user);
    ctx.setResponseJwtCookie = AuthService.makeValidJwtCookie(jwt);

    return user;
  }

  @Mutation(() => Boolean)
  logOut(@Ctx() ctx: CustomContext) {
    ctx.setResponseJwtCookie = AuthService.makeInvalidJwtCookie();
    return true;
  }
}
