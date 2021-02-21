import { Resolver, Query, Mutation, Ctx, Arg } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { Place } from 'entities/Place';
import { User } from 'entities/User';
import {
  CreatePlaceInput,
  UpdatePlaceInput,
} from 'resolvers/PlaceResolverTypes';
import EntityService from 'services/Entity';

@Resolver()
export class PlaceResolver {
  @Query(() => Place, { nullable: true })
  place(
    @Arg('id', { nullable: true }) id: string,
    @Arg('slug', { nullable: true }) slug: string
  ) {
    if (!id && !slug) {
      throw new Error('Must provide an ID or slug');
    }
    const whereOptions = id ? { id } : { slug };
    return Place.findOne({
      where: whereOptions,
      relations: [
        'tags',
        'tags.objectAudioItem',
        'tags.objectPerson',
        'tags.objectInstrument',
        'tags.objectPlace',
      ],
    });
  }

  @Query(() => [Place])
  places(
    @Arg('take', { defaultValue: 20 }) take?: number,
    @Arg('skip', { defaultValue: 0 }) skip?: number
  ) {
    return Place.find({
      take,
      skip,
      order: { createdAt: 'DESC' },
      relations: [
        'tags',
        'tags.objectAudioItem',
        'tags.objectPerson',
        'tags.objectInstrument',
        'tags.objectPlace',
      ],
    });
  }

  @Mutation(() => Place)
  async createPlace(
    @Arg('input') input: CreatePlaceInput,
    @Ctx() ctx: CustomContext
  ) {
    const { name, slug, aliases, description, latitude, longitude } = input;

    if (!name || !slug || !latitude || !longitude) {
      throw new Error(
        'A new Place must have at least a name, slug, latitude, and longitude'
      );
    }
    const user = await User.findOne(ctx.userId);
    if (!user) {
      throw new Error('You must be logged in to create a Place');
    }

    const cleanedSlug = EntityService.cleanSlug(slug);
    const existingSlug = await Place.findOne({
      where: { slug: cleanedSlug },
    });
    if (existingSlug) {
      throw new Error(
        'This URL slug has already been taken. Please pick another one.'
      );
    }

    const placeEntity = Place.create({
      name,
      slug: cleanedSlug,
      aliases,
      description,
      latitude,
      longitude,
      createdByUser: user,
      updatedByUser: user,
    });
    await placeEntity.save();
    return placeEntity;
  }

  @Mutation(() => Place)
  async updatePlace(
    @Arg('slug') slug: string,
    @Arg('input') input: UpdatePlaceInput,
    @Ctx() ctx: CustomContext
  ) {
    const { name, aliases, description, latitude, longitude } = input;

    const user = await User.findOne(ctx.userId);
    if (!user) {
      throw new Error('You must be logged in to update a Place');
    }

    const place = await Place.findOne(
      { slug },
      {
        relations: [
          'tags',
          'tags.objectAudioItem',
          'tags.objectPerson',
          'tags.objectInstrument',
          'tags.objectPlace',
        ],
      }
    );
    if (!place) {
      throw new Error('Could not find a Place with that slug');
    }

    if (name) place.name = name;
    if (aliases) place.aliases = aliases;
    if (description) place.description = description;
    if (latitude) place.latitude = latitude;
    if (longitude) place.longitude = longitude;

    place.updatedByUser = user;
    await place.save();
    return place;
  }
}
