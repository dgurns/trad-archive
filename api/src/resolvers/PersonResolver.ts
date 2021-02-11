import { Resolver, Query, Mutation, Ctx, Arg } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { Person } from 'entities/Person';
import { User } from 'entities/User';
import {
  CreatePersonInput,
  UpdatePersonInput,
} from 'resolvers/PersonResolverTypes';
import EntityService from 'services/Entity';

@Resolver()
export class PersonResolver {
  @Query(() => Person, { nullable: true })
  person(
    @Arg('id', { nullable: true }) id: string,
    @Arg('slug', { nullable: true }) slug: string
  ) {
    if (!id && !slug) {
      throw new Error('Must provide an ID or slug');
    }
    const whereOptions = id ? { id } : { slug };
    return Person.findOne({
      where: whereOptions,
      relations: [
        'createdByUser',
        'updatedByUser',
        'tags',
        'tags.relationship',
        'tags.objectAudioItem',
        'tags.objectPerson',
        'tags.objectInstrument',
      ],
    });
  }

  @Query(() => [Person])
  people(
    @Arg('take', { defaultValue: 20 }) take?: number,
    @Arg('skip', { defaultValue: 0 }) skip?: number
  ) {
    return Person.find({
      take,
      skip,
      order: { createdAt: 'DESC' },
      relations: [
        'createdByUser',
        'updatedByUser',
        'tags',
        'tags.relationship',
        'tags.objectAudioItem',
        'tags.objectPerson',
        'tags.objectInstrument',
      ],
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

    const person = Person.create({
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
    await person.save();
    return person;
  }

  @Mutation(() => Person)
  async updatePerson(
    @Arg('slug') slug: string,
    @Arg('input') input: UpdatePersonInput,
    @Ctx() ctx: CustomContext
  ) {
    const { aliases, description, firstName, middleName, lastName } = input;

    if (!firstName || !lastName) {
      throw new Error('A Person must always have a firstName and lastName');
    }
    const user = await User.findOne(ctx.userId);
    if (!user) {
      throw new Error('You must be logged in to update a Person');
    }

    const person = await Person.findOne(
      { slug },
      { relations: ['createdByUser'] }
    );
    if (!person) {
      throw new Error('Could not find a Person with that slug');
    }

    if (aliases) person.aliases = aliases;
    if (description) person.description = description;
    if (firstName) person.firstName = firstName;
    if (middleName) person.middleName = middleName;
    if (lastName) person.lastName = lastName;

    const name = middleName
      ? `${firstName} ${middleName} ${lastName}`
      : `${firstName} ${lastName}`;
    person.name = name;

    person.updatedByUser = user;
    await person.save();
    return person;
  }
}
