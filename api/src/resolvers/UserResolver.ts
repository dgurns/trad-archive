import { Resolver, Arg, Query } from 'type-graphql';
import { User } from 'models/User';

@Resolver()
export class UserResolver {
  @Query(() => User)
  user(@Arg('id') id: string) {
    return User.findOne({ where: { id } });
  }
}
