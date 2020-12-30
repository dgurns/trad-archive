import { Resolver, Query } from 'type-graphql';
import { User } from 'api/entities/User';

@Resolver()
export class UserResolver {
  @Query(() => User)
  signUp() {
    const user = new User();
    return user;
  }
}
