import { Resolver, Mutation, Ctx, Arg, Query } from 'type-graphql';
import { getManager, SelectQueryBuilder } from 'typeorm';
import { CustomContext } from 'middleware/context';
import { Tag } from 'models/Tag';
import { User } from 'models/User';
import { TagsToEntityInput, CreateTagInput } from 'resolvers/TagResolverTypes';
import { EntityType } from 'models/entities/base';
import { AudioItem } from 'models/entities/AudioItem';
import { Person } from 'models/entities/Person';
import { Instrument } from 'models/entities/Instrument';
import { Place } from 'models/entities/Place';
import { Relationship } from 'models/Relationship';

const tagRelationsForFind = [
  'subjectAudioItem',
  'subjectPerson',
  'subjectInstrument',
  'subjectPlace',
  'objectAudioItem',
  'objectPerson',
  'objectInstrument',
  'objectPlace',
];

const addTagRelationsToQueryBuilder = (
  query: SelectQueryBuilder<Tag>
): SelectQueryBuilder<Tag> => {
  return query
    .leftJoinAndSelect('tag.relationship', 'relationship')
    .leftJoinAndSelect('tag.subjectAudioItem', 'subjectAudioItem')
    .leftJoinAndSelect('tag.subjectPerson', 'subjectPerson')
    .leftJoinAndSelect('tag.subjectInstrument', 'subjectInstrument')
    .leftJoinAndSelect('tag.subjectPlace', 'subjectPlace')
    .leftJoinAndSelect('tag.objectAudioItem', 'objectAudioItem')
    .leftJoinAndSelect('tag.objectPerson', 'objectPerson')
    .leftJoinAndSelect('tag.objectInstrument', 'objectInstrument')
    .leftJoinAndSelect('tag.objectPlace', 'objectPlace');
};

@Resolver()
export class TagResolver {
  @Query(() => Tag)
  tag(@Arg('id') id: string) {
    return Tag.findOne({
      where: { id },
      relations: tagRelationsForFind,
    });
  }

  // tagsToEntity fetches all Tags that have the given entity as object. For
  // example, if the entity is Tommy Peoples, this would return all Tags
  // connecting other entities to Tommy Peoples.
  @Query(() => [Tag])
  async tagsToEntity(@Arg('input') input: TagsToEntityInput) {
    const { entityType, entityId } = input;

    const tagsQuery = await getManager()
      .createQueryBuilder(Tag, 'tag')
      .where(`tag.object${entityType}Id = :entityId`, {
        entityId,
      });
    const tagsQueryWithRelations = addTagRelationsToQueryBuilder(tagsQuery);
    const tags = tagsQueryWithRelations
      .orderBy('tag.createdAt', 'DESC')
      .getMany();
    return tags;
  }

  @Mutation(() => Tag)
  async createTag(
    @Arg('input') input: CreateTagInput,
    @Ctx() ctx: CustomContext
  ) {
    const {
      relationshipId,
      subjectEntityType,
      subjectEntityId,
      objectEntityType,
      objectEntityId,
    } = input;

    const user = await User.findOne({ where: { id: ctx.userId } });
    if (!user) {
      throw new Error('Must be logged in to create a Tag');
    }

    // Check to make sure the Tag doesn't already exist
    const entityManager = getManager();
    const existingTag = await entityManager
      .createQueryBuilder(Tag, 'tag')
      .where(`tag.subject${subjectEntityType}Id = :subjectEntityId`, {
        subjectEntityId,
      })
      .andWhere(`tag.object${objectEntityType}Id = :objectEntityId`, {
        objectEntityId,
      })
      .andWhere('tag.relationshipId = :relationshipId', { relationshipId })
      .getOne();
    if (existingTag) {
      throw new Error('This Tag has already been added');
    }

    const relationship = await Relationship.findOne({
      where: { id: relationshipId },
    });
    if (!relationship) {
      throw new Error('Could not find a Relationship with that ID');
    }

    const tag = Tag.create({ relationship, createdByUser: user });

    switch (subjectEntityType) {
      case EntityType.AudioItem:
        const audioItem = await AudioItem.findOne({
          where: { id: subjectEntityId },
        });
        if (audioItem) {
          tag.subjectAudioItem = audioItem;
          break;
        }
      case EntityType.Person:
        const person = await Person.findOne({ where: { id: subjectEntityId } });
        if (person) {
          tag.subjectPerson = person;
          break;
        }
      case EntityType.Instrument:
        const instrument = await Instrument.findOne({
          where: { id: subjectEntityId },
        });
        if (instrument) {
          tag.subjectInstrument = instrument;
          break;
        }
      case EntityType.Place:
        const place = await Place.findOne({ where: { id: subjectEntityId } });
        if (place) {
          tag.subjectPlace = place;
          break;
        }
      // If the entity isn't found and break isn't called, the switch statement
      // will continue on to the default case and throw an error.
      default:
        throw new Error('Must provide a valid subject entity type and ID');
    }

    switch (objectEntityType) {
      case EntityType.AudioItem:
        const audioItem = await AudioItem.findOne({
          where: { id: objectEntityId },
        });
        if (audioItem) {
          tag.objectAudioItem = audioItem;
          break;
        }
      case EntityType.Person:
        const person = await Person.findOne({ where: { id: objectEntityId } });
        if (person) {
          tag.objectPerson = person;
          break;
        }
      case EntityType.Instrument:
        const instrument = await Instrument.findOne({
          where: { id: objectEntityId },
        });
        if (instrument) {
          tag.objectInstrument = instrument;
          break;
        }
      case EntityType.Place:
        const place = await Place.findOne({ where: { id: objectEntityId } });
        if (place) {
          tag.objectPlace = place;
          break;
        }
      // If the entity isn't found and break isn't called, the switch statement
      // will continue on to the default case and throw an error.
      default:
        throw new Error('Must provide a valid object entity type and ID');
    }

    await tag.save();
    return tag;
  }

  @Mutation(() => Boolean)
  async deleteTag(@Arg('id') id: string, @Ctx() ctx: CustomContext) {
    const user = await User.findOne({ where: { id: ctx.userId } });
    if (!user) {
      throw new Error('Must be logged in to delete a Tag');
    }

    await Tag.delete(id);
    return true;
  }
}
