import { Resolver, Query, Mutation, Ctx, Arg, Authorized } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { Entity } from 'entities/entityHelpers';
import { AudioItem } from 'entities/AudioItem';
import { User, UserPermission } from 'entities/User';

@Resolver()
export class AudioItemResolver {
  @Query(() => AudioItem, { nullable: true })
  audioItem(@Arg('id') id: string) {
    return AudioItem.findOne(id, {
      relations: [
        'createdByUser',
        'updatedByUser',
        'tags',
        'tags.relationship',
        'tags.objectAudioItem',
        'tags.objectPerson',
        'tags.objectInstrument',
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
        'createdByUser',
        'updatedByUser',
        'tags',
        'tags.relationship',
        'tags.objectAudioItem',
        'tags.objectPerson',
        'tags.objectInstrument',
      ],
    });
  }

  @Mutation(() => AudioItem)
  @Authorized(UserPermission.Admin)
  async createAudioItem(
    @Arg('name') name: string,
    @Arg('urlSource') urlSource: string,
    @Arg('description', { nullable: true }) description: string,
    @Ctx() ctx: CustomContext
  ) {
    if (!name || !urlSource) {
      throw new Error(
        'A new Audio Item must have at least a Title and Source URL'
      );
    }
    if (!urlSource.includes('http')) {
      throw new Error('The source URL is invalid');
    }
    const createdByUser = await User.findOne(ctx.userId);
    if (!createdByUser) {
      throw new Error('Error fetching the user who is adding the item');
    }
    const audioItem = AudioItem.create({
      name,
      description,
      urlSource,
      createdByUser,
    });
    await audioItem.save();
    return audioItem;
  }
}
