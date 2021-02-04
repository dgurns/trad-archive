import { Resolver, Query, Mutation, Ctx, Arg } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { Instrument } from 'entities/Instrument';
import { User } from 'entities/User';
import { CreateInstrumentInput } from 'resolvers/InstrumentResolverTypes';
import EntityService from 'services/Entity';

@Resolver()
export class EntityResolver {
  @Query(() => Instrument, { nullable: true })
  instrumentEntity(
    @Arg('id', { nullable: true }) id: string,
    @Arg('slug', { nullable: true }) slug: string
  ) {
    if (!id && !slug) {
      throw new Error('Must provide an ID or slug');
    }
    const whereOptions = id ? { id } : { slug };
    return Instrument.findOne({
      where: whereOptions,
      relations: ['createdByUser', 'updatedByUser'],
    });
  }

  @Mutation(() => Instrument)
  async createInstrument(
    @Arg('input') input: CreateInstrumentInput,
    @Ctx() ctx: CustomContext
  ) {
    const { name, slug, aliases, description } = input;

    if (!name || !slug) {
      throw new Error('A new Instrument must have at least a name and slug');
    }
    const user = await User.findOne(ctx.userId);
    if (!user) {
      throw new Error('You must be logged in to create an Instrument');
    }

    const cleanedSlug = EntityService.cleanSlug(slug);
    const existingSlug = await Instrument.findOne({
      where: { slug: cleanedSlug },
    });
    if (existingSlug) {
      throw new Error(
        'This URL slug has already been taken. Please pick another one.'
      );
    }

    const instrumentEntity = Instrument.create({
      name,
      slug: cleanedSlug,
      aliases,
      description,
      createdByUser: user,
      updatedByUser: user,
    });
    await instrumentEntity.save();
    return instrumentEntity;
  }
}
