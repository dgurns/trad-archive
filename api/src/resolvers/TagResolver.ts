import { Resolver, Mutation, Ctx, Arg, Query } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { Tag } from 'entities/Tag';
import { User } from 'entities/User';
import { CreateTagInput } from 'resolvers/TagResolverTypes';
import { EntityType } from 'entities/entityHelpers';
import { AudioItem } from 'entities/AudioItem';
import { Person } from 'entities/Person';
import { Instrument } from 'entities/Instrument';

@Resolver()
export class TagResolver {
  @Query(() => Tag)
  tag(@Arg('id') id: string) {
    return Tag.findOne(id, {
      relations: [
        'audioItem',
        'person',
        'instrument',
        'relationship',
        'createdByUser',
      ],
    });
  }

  @Mutation(() => Tag)
  async createTag(
    @Arg('input') input: CreateTagInput,
    @Ctx() ctx: CustomContext
  ) {
    const {
      subjectEntityType,
      subjectEntityId,
      objectEntityType,
      objectEntityId,
    } = input;

    const user = await User.findOne(ctx.userId);
    if (!user) {
      throw new Error('Must be logged in to create a Tag');
    }

    const tag = Tag.create({ createdByUser: user });

    switch (subjectEntityType) {
      case EntityType.AudioItem:
        const audioItem = await AudioItem.findOne(subjectEntityId);
        if (audioItem) {
          tag.audioItem = audioItem;
          break;
        }
      // If the item isn't found and break isn't called, the switch statement
      // will continue on to the default case and throw an error.
      default:
        throw new Error('Must provide a valid Item type and ID');
    }

    switch (objectEntityType) {
      case EntityType.Person:
        const personEntity = await PersonEntity.findOne(entityId);
        if (personEntity) {
          tag.personEntity = personEntity;
          break;
        }
      case EntityType.Instrument:
        const instrumentEntity = await InstrumentEntity.findOne(entityId);
        if (instrumentEntity) {
          tag.instrumentEntity = instrumentEntity;
          break;
        }
      case EntityType.Tune:
        const tuneEntity = await TuneEntity.findOne(entityId);
        if (tuneEntity) {
          tag.tuneEntity = tuneEntity;
          break;
        }
      default:
        throw new Error('Must provide a valid Entity type and ID');
    }

    // Check to make sure the tag doesn't already exist
    const existingTag = await Tag.findOne({ where: { ...tag } });
    if (existingTag) {
      throw new Error('This Tag has already been added');
    }

    await tag.save();
    return tag;
  }
}
