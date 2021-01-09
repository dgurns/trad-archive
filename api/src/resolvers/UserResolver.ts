import { Resolver, Query, Ctx } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { User } from 'entities/User';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  getCurrentUser(@Ctx() ctx: CustomContext) {
    return ctx.user;
  }
}
