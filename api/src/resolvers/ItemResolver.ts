import { Resolver, Query, Mutation, Ctx, Arg, Authorized } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { AudioItem } from 'entities/Item';
import { User, UserPermission } from 'entities/User';

@Resolver()
export class ItemResolver {
  @Query(() => AudioItem, { nullable: true })
  audioItem(@Arg('id') id: string) {
    return AudioItem.findOne(id, { relations: ['addedByUser', 'tags'] });
  }

  @Query(() => [AudioItem])
  async audioItems(
    @Arg('take', { defaultValue: 20 }) take?: number,
    @Arg('skip', { defaultValue: 0 }) skip?: number
  ) {
    return AudioItem.find({ take, skip, relations: ['addedByUser', 'tags'] });
  }

  @Mutation(() => AudioItem)
  // @Authorized(UserPermission.Admin)
  async createAudioItem(
    @Arg('title') title: string,
    @Arg('urlSource') urlSource: string,
    @Arg('description', { nullable: true }) description: string,
    @Ctx() ctx: CustomContext
  ) {
    if (!urlSource) {
      throw new Error('A new AudioItem must have a urlSource');
    }
    const addedByUser = await User.findOne({ where: { email: 'dan@dan.com' } });
    if (!addedByUser) {
      throw new Error('Error fetching the user who is adding the item');
    }
    const audioItem = AudioItem.create({
      title,
      description,
      urlSource,
      addedByUser,
    });
    await audioItem.save();
    return audioItem;
  }
}
