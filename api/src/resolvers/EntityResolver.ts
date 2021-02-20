import { Resolver, Query, Arg, createUnionType } from 'type-graphql';
import { getManager } from 'typeorm';

import { EntityType } from 'entities/entityHelpers';
import { AudioItem } from 'entities/AudioItem';
import { Person } from 'entities/Person';
import { Instrument } from 'entities/Instrument';
import { SearchEntitiesInput } from 'resolvers/EntityResolverTypes';

// Entity is a GraphQL union type returned by resolvers. It contains logic for
// GraphQL clients to distinguish the entity type represented by a value.
export const Entity = createUnionType({
  name: 'Entity',
  types: () => [AudioItem, Person, Instrument],
  resolveType: (value) => {
    switch (value.entityType) {
      case EntityType.AudioItem:
        return AudioItem;
      case EntityType.Person:
        return Person;
      case EntityType.Instrument:
        return Instrument;
      default:
        return undefined;
    }
  },
});

// EntityResolver contains resolvers for querying across all entity types
@Resolver()
export class EntityResolver {
  @Query(() => Entity, { nullable: true })
  async entity(
    @Arg('id', { nullable: true }) id?: string,
    @Arg('slug', { nullable: true }) slug?: string
  ) {
    if (!id && !slug) {
      throw new Error('Must provide an ID or slug');
    }
    const results = await Promise.all([
      AudioItem.findOne({
        where: [{ id }, { slug }],
        relations: [
          'tags',
          'tags.objectAudioItem',
          'tags.objectPerson',
          'tags.objectInstrument',
        ],
      }),
      Person.findOne({
        where: [{ id }, { slug }],
        relations: [
          'tags',
          'tags.objectAudioItem',
          'tags.objectPerson',
          'tags.objectInstrument',
        ],
      }),
      Instrument.findOne({
        where: [{ id }, { slug }],
        relations: [
          'tags',
          'tags.objectAudioItem',
          'tags.objectPerson',
          'tags.objectInstrument',
        ],
      }),
    ]);
    let entity;
    results.forEach((result) => {
      if (result) {
        entity = result;
      }
    });
    return entity;
  }

  @Query(() => [Entity])
  async searchEntities(@Arg('input') input: SearchEntitiesInput) {
    const { searchTerm, take } = input;

    if (searchTerm.length < 3) {
      throw new Error('Must include a search term of at least 3 letters');
    }
    const searchTermLowercased = searchTerm.toLowerCase();
    const takeFromEach = Math.round(take / 3);
    const entityManager = getManager();
    const results = await Promise.all([
      entityManager
        .createQueryBuilder(Person, 'person')
        .leftJoinAndSelect('person.createdByUser', 'createdByUser')
        .where('unaccent(LOWER(person.name)) LIKE unaccent(:name)', {
          name: `%${searchTermLowercased}%`,
        })
        .orWhere('unaccent(LOWER(person.aliases)) LIKE unaccent(:aliases)', {
          aliases: `%${searchTermLowercased}%`,
        })
        .take(takeFromEach)
        .getMany(),
      entityManager
        .createQueryBuilder(Instrument, 'instrument')
        .leftJoinAndSelect('instrument.createdByUser', 'createdByUser')
        .where('unaccent(LOWER(instrument.name)) LIKE unaccent(:name)', {
          name: `%${searchTermLowercased}%`,
        })
        .orWhere(
          'unaccent(LOWER(instrument.aliases)) LIKE unaccent(:aliases)',
          { aliases: `%${searchTermLowercased}%` }
        )
        .take(takeFromEach)
        .getMany(),
      entityManager
        .createQueryBuilder(AudioItem, 'audioItem')
        .leftJoinAndSelect('audioItem.createdByUser', 'createdByUser')
        .where('unaccent(LOWER(audioItem.name)) LIKE unaccent(:name)', {
          name: `%${searchTermLowercased}%`,
        })
        .orWhere('unaccent(LOWER(audioItem.aliases)) LIKE unaccent(:aliases)', {
          aliases: `%${searchTermLowercased}%`,
        })
        .take(takeFromEach)
        .getMany(),
    ]);
    const output: Array<typeof Entity> = [];
    results.forEach((resultArray) => output.push(...resultArray));
    return output;
  }
}
