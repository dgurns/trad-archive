import { Resolver, Mutation, Ctx, Arg, Query } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { Tag } from 'entities/Tag';
import { User } from 'entities/User';
import {
  CreateTagInput,
  CreateTagEntityType,
  CreateTagItemType,
} from 'resolvers/TagResolverTypes';
import { AudioItem } from 'entities/Item';
import {
  DateEntity,
  InstrumentEntity,
  PersonEntity,
  PlaceEntity,
  TuneEntity,
} from 'entities/Entity';

@Resolver()
export class TagResolver {
  @Query(() => Tag)
  tag(@Arg('id') id: string) {
    return Tag.findOne(id, {
      relations: [
        'audioItem',
        'placeEntity',
        'personEntity',
        'instrumentEntity',
        'tuneEntity',
        'dateEntity',
        'createdByUser',
      ],
    });
  }

  @Mutation(() => Tag)
  async createTag(
    @Arg('data') data: CreateTagInput,
    @Ctx() ctx: CustomContext
  ) {
    const { itemType, itemId, entityType, entityId } = data;

    const user = await User.findOne(ctx.userId);
    if (!user) {
      throw new Error('Must be logged in to create a Tag');
    }

    const tag = Tag.create({ createdByUser: user });

    switch (itemType) {
      case CreateTagItemType.AudioItem:
        const audioItem = await AudioItem.findOne(itemId);
        if (audioItem) {
          tag.audioItem = audioItem;
          break;
        }
      // If the item isn't found and break isn't called, the switch statement
      // will continue on to the default case and throw an error.
      default:
        throw new Error('Must provide a valid Item type and ID');
    }

    switch (entityType) {
      case CreateTagEntityType.PlaceEntity:
        const placeEntity = await PlaceEntity.findOne(entityId);
        if (placeEntity) {
          tag.placeEntity = placeEntity;
          break;
        }
      case CreateTagEntityType.PersonEntity:
        const personEntity = await PersonEntity.findOne(entityId);
        if (personEntity) {
          tag.personEntity = personEntity;
          break;
        }
      case CreateTagEntityType.InstrumentEntity:
        const instrumentEntity = await InstrumentEntity.findOne(entityId);
        if (instrumentEntity) {
          tag.instrumentEntity = instrumentEntity;
          break;
        }
      case CreateTagEntityType.TuneEntity:
        const tuneEntity = await TuneEntity.findOne(entityId);
        if (tuneEntity) {
          tag.tuneEntity = tuneEntity;
          break;
        }
      case CreateTagEntityType.DateEntity:
        const dateEntity = await DateEntity.findOne(entityId);
        if (dateEntity) {
          tag.dateEntity = dateEntity;
          break;
        }
      default:
        throw new Error('Must provide a valid Entity type and ID');
    }

    await tag.save();
    return tag;
  }
}
