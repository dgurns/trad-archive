import { Resolver, Mutation, Ctx, Arg, Query } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { User } from 'entities/User';
import { CreateRelationshipInput } from 'resolvers/RelationshipResolverTypes';
import { Relationship } from 'entities/Relationship';
import { EntityType } from 'entities/entityHelpers';
import RelationshipService from 'services/Relationship';

@Resolver()
export class RelationshipResolver {
  @Query(() => Relationship)
  relationship(@Arg('id') id: string) {
    return Relationship.findOne(id, { relations: ['createdByUser'] });
  }

  @Query(() => [Relationship])
  searchRelationships(@Arg('subjectEntityType') subjectEntityType: EntityType) {
    return Relationship.find({ where: { subjectEntityType } });
  }

  // CreateRelationship creates a relationship between two entity types, and
  // also its reversed version if `typeReversed` is specified
  @Mutation(() => Relationship)
  async createRelationship(
    @Arg('input') input: CreateRelationshipInput,
    @Ctx() ctx: CustomContext
  ) {
    const { name, nameReversed, subjectEntityType, objectEntityType } = input;

    if (!name || !subjectEntityType || !objectEntityType) {
      throw new Error(
        'Must provide a Relationship name, subject entity name, and object entity name'
      );
    }
    const user = await User.findOne(ctx.userId);
    if (!user) {
      throw new Error('Must be logged in to create a Relationship');
    }

    const cleanedName = RelationshipService.cleanName(name);

    const existingRelationship = await Relationship.findOne({
      where: { name: cleanedName, subjectEntityType, objectEntityType },
    });
    if (existingRelationship) {
      throw new Error('This Relationship has already been created');
    }

    const relationship = Relationship.create({
      name: cleanedName,
      subjectEntityType,
      objectEntityType,
      createdByUser: user,
    });
    await relationship.save();

    if (nameReversed) {
      // Check to see if reverse relationship already exists
      const cleanedNameReversed = RelationshipService.cleanName(nameReversed);
      const existingReverseRelationship = await Relationship.findOne({
        where: {
          name: cleanedNameReversed,
          subjectEntityType: objectEntityType,
          objectEntityType: subjectEntityType,
        },
      });
      // If the reverse relationship doesn't already exist, create it
      if (!existingReverseRelationship) {
        const reverseRelationship = Relationship.create({
          name: cleanedNameReversed,
          subjectEntityType: objectEntityType,
          objectEntityType: subjectEntityType,
          createdByUser: user,
        });
        await reverseRelationship.save();
      }
    }

    return relationship;
  }
}
