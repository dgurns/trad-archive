import { Resolver, Mutation, Ctx, Arg, Args, Query } from 'type-graphql';
import { getManager } from 'typeorm';
import { CustomContext } from 'middleware/context';
import { Tag } from 'entities/Tag';
import { User } from 'entities/User';
import { TagsForEntityArgs, CreateTagInput } from 'resolvers/TagResolverTypes';
import { EntityType } from 'entities/entityHelpers';
import { AudioItem } from 'entities/AudioItem';
import { Person } from 'entities/Person';
import { Instrument } from 'entities/Instrument';
import { Relationship } from 'entities/Relationship';

@Resolver()
export class TagResolver {
  @Query(() => Tag)
  tag(@Arg('id') id: string) {
    return Tag.findOne(id, {
      relations: ['audioItem', 'person', 'instrument'],
    });
  }

  // Get all Tags that target a particular entity, for example Tommy Peoples
  @Query(() => [Tag])
  async tagsForEntity(@Args() { entityType, entityId }: TagsForEntityArgs) {
    const tags = await getManager()
      .createQueryBuilder(Tag, 'tag')
      .where(`tag.object${entityType}Id = :entityId`, {
        entityId,
      })
      .leftJoinAndSelect('tag.relationship', 'relationship')
      .leftJoinAndSelect('tag.subjectAudioItem', 'subjectAudioItem')
      .leftJoinAndSelect('tag.subjectPerson', 'subjectPerson')
      .leftJoinAndSelect('tag.subjectInstrument', 'subjectInstrument')

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

    const user = await User.findOne(ctx.userId);
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

    const relationship = await Relationship.findOne(relationshipId);
    if (!relationship) {
      throw new Error('Could not find a Relationship with that ID');
    }

    const tag = Tag.create({ relationship, createdByUser: user });

    switch (subjectEntityType) {
      case EntityType.AudioItem:
        const audioItem = await AudioItem.findOne(subjectEntityId);
        if (audioItem) {
          tag.subjectAudioItem = audioItem;
          break;
        }
      case EntityType.Person:
        const person = await Person.findOne(subjectEntityId);
        if (person) {
          tag.subjectPerson = person;
          break;
        }
      case EntityType.Instrument:
        const instrument = await Instrument.findOne(subjectEntityId);
        if (instrument) {
          tag.subjectInstrument = instrument;
          break;
        }
      // If the entity isn't found and break isn't called, the switch statement
      // will continue on to the default case and throw an error.
      default:
        throw new Error('Must provide a valid subject entity type and ID');
    }

    switch (objectEntityType) {
      case EntityType.AudioItem:
        const audioItem = await AudioItem.findOne(objectEntityId);
        if (audioItem) {
          tag.objectAudioItem = audioItem;
          break;
        }
      case EntityType.Person:
        const person = await Person.findOne(objectEntityId);
        if (person) {
          tag.objectPerson = person;
          break;
        }
      case EntityType.Instrument:
        const instrument = await Instrument.findOne(objectEntityId);
        if (instrument) {
          tag.objectInstrument = instrument;
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
}
