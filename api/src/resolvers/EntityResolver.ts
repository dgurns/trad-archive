import { Resolver, Query, Mutation, Ctx, Arg, Authorized } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { PersonEntity } from 'entities/Entity';
import { User } from 'entities/User';

@Resolver()
export class EntityResolver {
  @Query(() => PersonEntity, { nullable: true })
  personEntity(@Arg('id') id: string) {
    return PersonEntity.findOne(id, {
      relations: ['createdByUser', 'lastUpdatedByUser'],
    });
  }

  @Query(() => [PersonEntity])
  async personEntities(
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
        'This custom identifier slug has already been taken. Please pick another one.'
      );
    }
    let cleanedAliases: string[] = [];
    if (aliases) {
      cleanedAliases = aliases.split(',');
    }

    const personEntity = PersonEntity.create({
      name,
      slug: cleanedSlug,
      aliases: cleanedAliases,
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
