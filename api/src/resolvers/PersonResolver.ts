import { Resolver, Query, Mutation, Ctx, Arg } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { Person } from 'entities/Person';
import { User } from 'entities/User';
import { CreatePersonInput } from 'resolvers/PersonResolverTypes';
import EntityService from 'services/Entity';

@Resolver()
export class EntityResolver {
  @Query(() => Person, { nullable: true })
  personEntity(
    @Arg('id', { nullable: true }) id: string,
    @Arg('slug', { nullable: true }) slug: string
  ) {
    if (!id && !slug) {
      throw new Error('Must provide an ID or slug');
    }
    const whereOptions = id ? { id } : { slug };
    return Person.findOne({
      where: whereOptions,
      relations: ['createdByUser', 'updatedByUser'],
    });
  }

  @Query(() => [Person])
  personEntities(
    @Arg('take', { defaultValue: 20 }) take?: number,
    @Arg('skip', { defaultValue: 0 }) skip?: number
  ) {
    return Person.find({
      take,
      skip,
      order: { createdAt: 'DESC' },
      relations: ['createdByUser', 'updatedByUser'],
    });
  }

  @Mutation(() => Person)
  async createPerson(
    @Arg('input') input: CreatePersonInput,
    @Ctx() ctx: CustomContext
  ) {
    const {
      slug,
      aliases,
      description,
      firstName,
      middleName,
      lastName,
    } = input;

    if (!firstName || !lastName || !slug) {
      throw new Error(
        'A new Person must have at least a firstName, lastName, and slug'
      );
    }
    const user = await User.findOne(ctx.userId);
    if (!user) {
      throw new Error('You must be logged in to create a Person');
    }

    const name = middleName
      ? `${firstName} ${middleName} ${lastName}`
      : `${firstName} ${lastName}`;
    const cleanedSlug = EntityService.cleanSlug(slug);
    const existingSlug = await Person.findOne({
      where: { slug: cleanedSlug },
    });
    if (existingSlug) {
      throw new Error(
        'This URL slug has already been taken. Please pick another one.'
      );
    }

    const personEntity = Person.create({
      name,
      slug: cleanedSlug,
      aliases,
      description,
      firstName,
      middleName,
      lastName,
      createdByUser: user,
      updatedByUser: user,
    });
    await personEntity.save();
    return personEntity;
  }
}
