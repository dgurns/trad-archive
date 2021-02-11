import { ArgsType, InputType, Field } from 'type-graphql';
import { EntityType } from 'entities/entityHelpers';

@ArgsType()
export class TagsForEntityArgs {
  @Field(() => EntityType)
  entityType!: EntityType;

  @Field(() => String)
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
