import { Resolver, Query, Mutation, Ctx, Arg, Authorized } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { AudioItem, Item } from 'entities/Item';
import { User, UserPermission } from 'entities/User';

@Resolver()
export class ItemResolver {
  @Query(() => AudioItem, { nullable: true })
  audioItem(@Arg('id') id: string) {
    return AudioItem.findOne(id, {
      relations: [
        'addedByUser',
        'tags',
        'tags.placeEntity',
        'tags.personEntity',
        'tags.instrumentEntity',
        'tags.tuneEntity',
      ],
    });
  }

  @Query(() => [AudioItem])
  async audioItems(
    @Arg('take', { nullable: true, defaultValue: 20 }) take: number,
    @Arg('skip', { nullable: true, defaultValue: 0 }) skip: number
  ) {
    return AudioItem.find({
      take,
      skip,
      order: { createdAt: 'DESC' },
      relations: [
        'addedByUser',
        'tags',
        'tags.placeEntity',
        'tags.personEntity',
        'tags.instrumentEntity',
        'tags.tuneEntity',
      ],
    });
  }

  @Query(() => Item, { nullable: true })
  async item(@Arg('id') id: string) {
    // For now, this only checks AudioItems, but eventually will be expanded
    // to query across all Item types.
    return AudioItem.findOne(id, {
      relations: [
        'addedByUser',
        'tags',
        'tags.placeEntity',
        'tags.personEntity',
        'tags.instrumentEntity',
        'tags.tuneEntity',
      ],
    });
  }

  @Query(() => [Item])
  async items(
    @Arg('take', { nullable: true, defaultValue: 20 }) take: number,
    @Arg('skip', { nullable: true, defaultValue: 0 }) skip: number
  ) {
    const audioItems = await AudioItem.find({
      take,
      skip,
      order: { createdAt: 'DESC' },
      relations: [
        'addedByUser',
        'tags',
        'tags.placeEntity',
        'tags.personEntity',
        'tags.instrumentEntity',
        'tags.tuneEntity',
      ],
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
