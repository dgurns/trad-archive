import { Resolver, Query, Mutation, Ctx, Arg, Authorized } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { AudioItem, Item } from 'entities/Item';
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
    return AudioItem.find({
      take,
      skip,
      order: { createdAt: 'DESC' },
      relations: ['addedByUser', 'tags'],
    });
  }

  @Query(() => [Item])
  async items(
    @Arg('take', { defaultValue: 20 }) take?: number,
    @Arg('skip', { defaultValue: 0 }) skip?: number
  ) {
    const audioItems = await AudioItem.find({
      take,
      skip,
      order: { createdAt: 'DESC' },
      relations: ['addedByUser', 'tags'],
    });
    // When there are more Item types, compile most recent across all queries
    // and return
    return [...audioItems];
  }

  @Mutation(() => AudioItem)
  @Authorized(UserPermission.Admin)
  async createAudioItem(
    @Arg('title') title: string,
    @Arg('urlSource') urlSource: string,
    @Arg('description', { nullable: true }) description: string,
    @Ctx() ctx: CustomContext
  ) {
    if (!title || !urlSource) {
      throw new Error(
        'A new Audio Item must have at least a Title and Source URL'
      );
    }
    if (!urlSource.includes('http')) {
      throw new Error('The source URL is invalid');
    }
    const addedByUser = await User.findOne(ctx.userId);
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
