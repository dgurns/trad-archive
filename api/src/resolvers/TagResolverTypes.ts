import { InputType, Field } from 'type-graphql';
import { EntityType } from 'entities/entityHelpers';

@InputType()
export class CreateTagInput {
  @Field(() => EntityType)
  subjectEntityType!: EntityType;

  @Field()
  subjectEntityId!: string;

  @Field(() => EntityType)
  objectEntityType!: EntityType;

  @Field()
  objectEntityId!: string;
}
