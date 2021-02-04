import { Resolver, Mutation, Ctx, Arg, Query } from 'type-graphql';
import { CustomContext } from 'middleware/context';
import { Tag } from 'entities/Tag';
import { User, UserPermission } from 'entities/User';
import { CreateRelationshipInput } from 'resolvers/RelationshipResolverTypes';
import { EntityType } from 'entities/entityHelpers';
import { Relationship, RelationshipType } from 'entities/Relationship';

@Resolver()
export class RelationshipResolver {
  @Query(() => Tag)
  relationship(@Arg('id') id: string) {
    return Relationship.findOne(id, { relations: ['createdByUser'] });
  }

  @Mutation(() => Relationship)
  async createRelationship(
    @Arg('input') input: CreateRelationshipInput,
    @Ctx() ctx: CustomContext
  ) {
    const { type, typeReversed, subjectEntityType, objectEntityType } = input;

    if (!type || !typeReversed || !subjectEntityType || !objectEntityType) {
      throw new Error(
        'Must provide a Relationship type, reverse type, subject entity type, and object entity type'
      );
    }
    const user = await User.findOne(ctx.userId);
    if (!user) {
      throw new Error('Must be logged in to create a Relationship');
    }

    const existingRelationship = await Relationship.find({
      where: { ...input },
    });
    if (existingRelationship) {
      throw new Error('This Relationship has already been created');
    }

    const relationship = Relationship.create({
      type,
      typeReversed,
      subjectEntityType,
      objectEntityType,
    });

    await relationship.save();
    return relationship;
  }
}
