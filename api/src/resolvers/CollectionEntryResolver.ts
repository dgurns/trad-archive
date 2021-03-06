import { Resolver, Mutation, Ctx, Arg, Query } from 'type-graphql';
import { getManager } from 'typeorm';
import { CustomContext } from 'middleware/context';
import { User } from 'models/User';
import {
  CreateCollectionEntryInput,
  DeleteCollectionEntryInput,
} from 'resolvers/CollectionEntryResolverTypes';
import { CollectionEntry } from 'models/CollectionEntry';
import { AudioItem } from 'models/entities/AudioItem';

@Resolver()
export class CollectionEntryResolver {
  @Query(() => [CollectionEntry])
  collectionEntriesForUser(@Ctx() ctx: CustomContext) {
    if (!ctx.userId) {
      throw new Error('Must be logged in to get CollectionEntries');
    }
    return getManager()
      .createQueryBuilder(CollectionEntry, 'collectionEntry')
      .where('collectionEntry.userId = :userId', { userId: ctx.userId })
      .leftJoinAndSelect('collectionEntry.audioItem', 'audioItem')
      .leftJoinAndSelect('audioItem.tags', 'tags')
      .leftJoinAndSelect('tags.relationship', 'relationship')
      .leftJoinAndSelect('tags.objectAudioItem', 'objectAudioItem')
      .leftJoinAndSelect('tags.objectPerson', 'objectPerson')
      .leftJoinAndSelect('tags.objectPlace', 'objectPlace')
      .leftJoinAndSelect('tags.objectInstrument', 'objectInstrument')
      .leftJoinAndSelect('audioItem.createdByUser', 'audioItemCreatedByUser')
      .orderBy('collectionEntry.createdAt', 'DESC')
      .getMany();
  }

  @Mutation(() => CollectionEntry)
  async createCollectionEntry(
    @Arg('input') input: CreateCollectionEntryInput,
    @Ctx() ctx: CustomContext
  ) {
    const { audioItemId } = input;

    const user = await User.findOne({ where: { id: ctx.userId } });
    if (!user) {
      throw new Error('Must be logged in to create a CollectionEntry');
    }
    const audioItem = await AudioItem.findOne({ where: { id: audioItemId } });
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
    @Arg('input') input: DeleteCollectionEntryInput,
    @Ctx() ctx: CustomContext
  ) {
    const { id, audioItemId } = input;

    if (!id && !audioItemId) {
      throw new Error(
        'Must provide either a CollectionEntry ID or the associated AudioItem ID'
      );
    }
    if (!ctx.userId) {
      throw new Error('Must be logged in to delete a CollectionEntry');
    }
    let collectionEntry: CollectionEntry | undefined;
    if (id) {
      collectionEntry = await CollectionEntry.findOne({
        where: { id },
        relations: ['user'],
      });
    } else if (audioItemId) {
      collectionEntry = await getManager()
        .createQueryBuilder(CollectionEntry, 'collectionEntry')
        .where('collectionEntry.audioItemId = :audioItemId', { audioItemId })
        .leftJoinAndSelect('collectionEntry.user', 'user')
        .getOne();
    }
    if (!collectionEntry) {
      throw new Error('Could not find CollectionEntry');
    }
    if (ctx.userId !== collectionEntry.user.id) {
      throw new Error('A CollectionEntry can only be deleted by its own user');
    }

    await collectionEntry.remove();
    return true;
  }
}
