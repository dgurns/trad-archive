import { InputType, Field } from 'type-graphql';
import { EntityType } from 'entities/entityHelpers';

@InputType()
export class CreateRelationshipInput {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  nameReversed!: string;

  @Field(() => EntityType)
  subjectEntityType!: EntityType;

  @Field(() => EntityType)
  objectEntityType!: EntityType;
}
