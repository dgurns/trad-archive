import { InputType, Field } from 'type-graphql';
import { EntityType } from 'models/entities/base';

@InputType()
export class TagsToEntityInput {
  @Field(() => EntityType)
  entityType!: EntityType;

  @Field()
  entityId!: string;
}

@InputType()
export class CreateTagInput {
  @Field(() => String)
  relationshipId!: string;

  @Field(() => EntityType)
  subjectEntityType!: EntityType;

  @Field()
  subjectEntityId!: string;

  @Field(() => EntityType)
  objectEntityType!: EntityType;

  @Field()
  objectEntityId!: string;
}
