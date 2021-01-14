import { Resolver, Query, Ctx } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { User } from 'entities/User';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: CustomContext) {
    if (!ctx.userId) {
      return null;
    }
    const user = await User.findOne(ctx.userId);
    return user;
  }
}
