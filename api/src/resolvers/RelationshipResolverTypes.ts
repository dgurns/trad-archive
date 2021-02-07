import { InputType, Field, ArgsType } from 'type-graphql';
import { EntityType } from 'entities/entityHelpers';

@ArgsType()
export class SearchRelationshipsArgs {
  @Field(() => String)
  subjectEntityType!: EntityType;

  @Field(() => String, { nullable: true })
  objectEntityType!: EntityType;
}

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
