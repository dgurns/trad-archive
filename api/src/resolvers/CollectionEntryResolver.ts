import { Resolver, Mutation, Ctx, Arg, Query } from 'type-graphql';
import { getManager } from 'typeorm';
import { CustomContext } from 'middleware/context';
import { User } from 'models/User';
import { CreateCollectionEntryInput } from 'resolvers/CollectionEntryResolverTypes';
import { CollectionEntry } from 'models/CollectionEntry';
import { AudioItem } from 'models/entities/AudioItem';

@Resolver()
export class CollectionEntryResolver {
  @Query(() => [CollectionEntry])
  async collectionEntriesForUser(
    @Arg('id') id: string,
    @Ctx() ctx: CustomContext
  ) {
    if (!ctx.userId || id !== ctx.userId) {
      throw new Error(
        'CollectionEntries can only be queried by their own user'
      );
    }
    return getManager()
      .createQueryBuilder(CollectionEntry, 'collectionEntry')
      .where('collectionEntry.userId = :id', { id })
      .leftJoinAndSelect('collectionEntry.audioItem', 'audioItem')
      .leftJoinAndSelect('collectionEntry.user', 'user')
      .getMany();
  }

  @Mutation(() => CollectionEntry)
  async createCollectionEntry(
    @Arg('input') input: CreateCollectionEntryInput,
    @Ctx() ctx: CustomContext
  ) {
    const { audioItemId } = input;

    const user = await User.findOne(ctx.userId);
    if (!user) {
      throw new Error('Must be logged in to create a CollectionEntry');
    }
    const audioItem = await AudioItem.findOne(audioItemId);
    if (!audioItem) {
      throw new Error('Could not find an AudioItem with that ID');
    }

    const collectionEntry = CollectionEntry.create({
      audioItem,
      user,
    });
    await collectionEntry.save();
    return collectionEntry;
  }

  @Mutation(() => Boolean)
  async deleteCollectionEntry(
    @Arg('id') id: string,
    @Ctx() ctx: CustomContext
  ) {
    if (!ctx.userId) {
      throw new Error('Must be logged in to delete a CollectionEntry');
    }
    const collectionEntry = await CollectionEntry.findOne(id, {
      relations: ['user'],
    });
    if (!collectionEntry) {
      throw new Error('Could not find CollectionEntry with that ID');
    }
    if (ctx.userId !== collectionEntry.user.id) {
      throw new Error('A CollectionEntry can only be deleted by its own user');
    }

    await collectionEntry.remove();
    return true;
  }
}
