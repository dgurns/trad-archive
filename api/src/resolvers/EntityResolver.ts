import { Resolver, Query, Mutation, Ctx, Arg } from 'type-graphql';
import { getManager, Like } from 'typeorm';
import { CustomContext } from 'middleware/context';
import {
  Entity,
  PersonEntity,
  PlaceEntity,
  InstrumentEntity,
  TuneEntity,
} from 'entities/Entity';
import { User } from 'entities/User';

@Resolver()
export class EntityResolver {
  @Query(() => PersonEntity, { nullable: true })
  personEntity(
    @Arg('id', { nullable: true }) id: string,
    @Arg('slug', { nullable: true }) slug: string
  ) {
    if (!id && !slug) {
      throw new Error('Must provide an ID or slug');
    }
    const whereOptions = id ? { id } : { slug };
    return PersonEntity.findOne({
      where: whereOptions,
      relations: ['createdByUser', 'lastUpdatedByUser'],
    });
  }

  @Query(() => [PersonEntity])
  personEntities(
    @Arg('take', { defaultValue: 20 }) take?: number,
    @Arg('skip', { defaultValue: 0 }) skip?: number
  ) {
    return PersonEntity.find({
      take,
      skip,
      order: { createdAt: 'DESC' },
      relations: ['createdByUser', 'lastUpdatedByUser'],
    });
  }

  @Query(() => [Entity])
  async searchEntities(
    @Arg('searchTerm') searchTerm: string,
    @Arg('take', { nullable: true, defaultValue: 20 }) take: number
  ) {
    if (searchTerm.length < 3) {
      throw new Error('Must include a search term of at least 3 letters');
    }
    const takeFromEach = Math.round(take / 4);
    const entityManager = getManager();
    const results = await Promise.all([
      entityManager
        .createQueryBuilder(PersonEntity, 'personEntity')
        .leftJoinAndSelect('personEntity.createdByUser', 'user')
        .where('LOWER(personEntity.name) LIKE :name', {
          name: `%${searchTerm.toLowerCase()}%`,
        })
        .orWhere('LOWER(personEntity.aliases) LIKE :aliases', {
          aliases: `%${searchTerm.toLowerCase()}%`,
        })
        .take(takeFromEach)
        .getMany(),
      entityManager
        .createQueryBuilder(PlaceEntity, 'placeEntity')
        .leftJoinAndSelect('placeEntity.createdByUser', 'user')
        .where('LOWER(placeEntity.name) LIKE :name', {
          name: `%${searchTerm.toLowerCase()}%`,
        })
        .orWhere('LOWER(placeEntity.aliases) LIKE :aliases', {
          aliases: `%${searchTerm.toLowerCase()}%`,
        })
        .take(takeFromEach)
        .getMany(),
      entityManager
        .createQueryBuilder(InstrumentEntity, 'instrumentEntity')
        .leftJoinAndSelect('instrumentEntity.createdByUser', 'user')
        .where('LOWER(instrumentEntity.name) LIKE :name', {
          name: `%${searchTerm.toLowerCase()}%`,
        })
        .orWhere('LOWER(instrumentEntity.aliases) LIKE :aliases', {
          aliases: `%${searchTerm.toLowerCase()}%`,
        })
        .take(takeFromEach)
        .getMany(),
      entityManager
        .createQueryBuilder(TuneEntity, 'tuneEntity')
        .leftJoinAndSelect('tuneEntity.createdByUser', 'user')
        .where('LOWER(tuneEntity.name) LIKE :name', {
          name: `%${searchTerm.toLowerCase()}%`,
        })
        .orWhere('LOWER(tuneEntity.aliases) LIKE :aliases', {
          aliases: `%${searchTerm.toLowerCase()}%`,
        })
        .orWhere('LOWER(tuneEntity.composer) LIKE :composer', {
          composer: `%${searchTerm.toLowerCase()}%`,
        })
        .take(takeFromEach)
        .getMany(),
    ]);
    const output: Array<
      PersonEntity | PlaceEntity | InstrumentEntity | TuneEntity
    > = [];
    results.forEach((resultArray) => output.push(...resultArray));
    return output;
  }

  @Mutation(() => PersonEntity)
  async createPersonEntity(
    @Arg('slug') slug: string,
    @Arg('aliases', { nullable: true }) aliases: string,
    @Arg('description', { nullable: true }) description: string,
    @Arg('firstName') firstName: string,
    @Arg('middleName', { nullable: true }) middleName: string,
    @Arg('lastName') lastName: string,
    @Ctx() ctx: CustomContext
  ) {
    if (!firstName || !lastName || !slug) {
      throw new Error(
        'A new PersonEntity must have at least a firstName, lastName, and slug'
      );
    }
    const user = await User.findOne(ctx.userId);
    if (!user) {
      throw new Error('You must be logged in to create a PersonEntity');
    }

    const name = middleName
      ? `${firstName} ${middleName} ${lastName}`
      : `${firstName} ${lastName}`;
    const cleanedSlug = slug.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
    const existingSlug = await PersonEntity.findOne({
      where: { slug: cleanedSlug },
    });
    if (existingSlug) {
      throw new Error(
        'This URL slug has already been taken. Please pick another one.'
      );
    }

    const personEntity = PersonEntity.create({
      name,
      slug: cleanedSlug,
      aliases,
      description,
      firstName,
      middleName,
      lastName,
      createdByUser: user,
      lastUpdatedByUser: user,
    });
    await personEntity.save();
    return personEntity;
  }
}
