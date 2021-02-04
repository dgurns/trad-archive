import { Resolver, Query, Mutation, Ctx, Arg, Authorized } from 'type-graphql';

import { CustomContext } from 'middleware/context';
import { AudioItem } from 'entities/AudioItem';
import { User, UserPermission } from 'entities/User';
import { CreateAudioItemInput } from 'resolvers/AudioItemResolverTypes';
import EntityService from 'services/Entity';

@Resolver()
export class AudioItemResolver {
  @Query(() => AudioItem, { nullable: true })
  audioItem(@Arg('id') id: string, @Arg('slug') slug: string) {
    if (!id && !slug) {
      throw new Error('Must search by an ID or slug');
    }

    const whereOptions = id ? { id } : { slug };
    return AudioItem.findOne({
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

  @Query(() => [AudioItem])
  async audioItems(
    @Arg('take', { nullable: true, defaultValue: 20 }) take: number,
    @Arg('skip', { nullable: true, defaultValue: 0 }) skip: number
  ) {
    return AudioItem.find({
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

  @Mutation(() => AudioItem)
  @Authorized(UserPermission.Admin)
  async createAudioItem(
    @Arg('input') input: CreateAudioItemInput,
    @Ctx() ctx: CustomContext
  ) {
    const { name, slug, aliases, description, urlSource } = input;

    if (!name || !slug || !urlSource) {
      throw new Error(
        'A new Audio Item must have at least a name, slug, and URL source'
      );
    }
    if (!urlSource.includes('http')) {
      throw new Error('The source URL is invalid');
    }
    const createdByUser = await User.findOne(ctx.userId);
    if (!createdByUser) {
      throw new Error('Error fetching the user who is adding the AudioItem');
    }

    const cleanedSlug = EntityService.cleanSlug(slug);
    const existingSlug = await AudioItem.findOne({
      where: { slug: cleanedSlug },
    });
    if (existingSlug) {
      throw new Error(
        'This URL slug has already been taken. Please pick another one.'
      );
    }

    const audioItem = AudioItem.create({
      name,
      slug: cleanedSlug,
      aliases,
      description,
      urlSource,
      createdByUser,
    });
    await audioItem.save();
    return audioItem;
  }
}
