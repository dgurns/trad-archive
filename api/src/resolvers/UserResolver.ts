import { Resolver, Query, Ctx } from 'type-graphql';
import { User } from 'entities/User';
import { authenticateRequest } from 'auth';
@Resolver()
export class UserResolver {
  @Query(() => User)
  test(@Ctx() ctx: any) {
    const authError = authenticateRequest(ctx);
    if (authError) return authError;

    return { id: 1 };
  }
}
