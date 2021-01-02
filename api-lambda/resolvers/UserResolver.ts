import { Resolver, Query } from 'type-graphql';
import { User } from '../entities/User';

@Resolver()
export class UserResolver {
  @Query(() => User)
  signUp() {
    const user = new User();
    user.id = 1;
    return user;
  }
}
