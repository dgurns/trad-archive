import { Resolver, Mutation, Ctx, Arg, Args, Query } from 'type-graphql';
import { ObjectLiteral } from 'typeorm';
import { CustomContext } from 'middleware/context';
import { User } from 'models/User';
import {
  CreateRelationshipInput,
  SearchRelationshipsArgs,
} from 'resolvers/RelationshipResolverTypes';
import { Relationship } from 'models/Relationship';
import { EntityType } from 'models/entities/base';
import RelationshipService from 'services/Relationship';

@Resolver()
export class RelationshipResolver {
  @Query(() => Relationship)
  relationship(@Arg('id') id: string) {
    return Relationship.findOne(id, { relations: ['createdByUser'] });
  }

  @Query(() => [Relationship])
  searchRelationships(
    @Args() { subjectEntityType, objectEntityType }: SearchRelationshipsArgs
  ) {
    const whereOptions: ObjectLiteral = { subjectEntityType };
    if (objectEntityType) {
      whereOptions.objectEntityType = objectEntityType;
    }
    return Relationship.find({
      where: { subjectEntityType, objectEntityType },
    });
  }

  // CreateRelationship creates a relationship between two entity types. It also
  // creates the reversed version if `nameReversed` is specified.
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
