import { Resolver, Query, Ctx } from 'type-graphql';
import { User } from 'entities/User';
@Resolver()
export class UserResolver {
  @Query(() => User)
  test(@Ctx() ctx: any) {
    console.log('resolver ctx', ctx);
    return { id: 1 };
  }
}
