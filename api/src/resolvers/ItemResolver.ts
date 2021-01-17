import { Resolver, Query, Mutation, Ctx, Arg, Authorized } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { AudioItem } from 'entities/Item';
import { UserPermission } from 'entities/User';

@Resolver()
export class ItemResolver {
  @Query(() => AudioItem, { nullable: true })
  audioItem(@Arg('id') id: number) {
    return AudioItem.findOne(id, { relations: ['addedByUser'] });
  }

  @Query(() => [AudioItem])
  async audioItems(
    @Arg('take', { defaultValue: 20 }) take?: number,
    @Arg('skip', { defaultValue: 0 }) skip?: number
  ) {
    return AudioItem.find({ take, skip, relations: ['addedByUser'] });
  }

  @Mutation(() => AudioItem)
  @Authorized(UserPermission.Admin)
  async createAudioItem(
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Arg('urlSource') urlSource: string,
    @Ctx() ctx: CustomContext
  ) {
    if (!urlSource) {
      throw new Error('A new AudioItem must have a urlSource');
    }
    const audioItem = AudioItem.create({
      title,
      description,
      urlSource,
      addedByUserId: ctx.userId,
    });
    await audioItem.save();
    return audioItem;
  }
}
