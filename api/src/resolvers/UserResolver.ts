import { Resolver, Arg, Query } from 'type-graphql';
import { User } from 'entities/User';

@Resolver()
export class UserResolver {
  @Query(() => User)
  user(@Arg('id') id: string) {
    return User.findOne(id);
  }
}
