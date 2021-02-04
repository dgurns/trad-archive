import { InputType, Field } from 'type-graphql';
import { EntityType } from 'entities/entityHelpers';
import { RelationshipType } from 'entities/Relationship';

@InputType()
export class CreateRelationshipInput {
  @Field(() => RelationshipType)
  type!: RelationshipType;

  @Field(() => RelationshipType, { nullable: true })
  typeReversed!: RelationshipType;

  @Field(() => EntityType)
  subjectEntityType!: EntityType;

  @Field(() => EntityType)
  objectEntityType!: EntityType;
}
