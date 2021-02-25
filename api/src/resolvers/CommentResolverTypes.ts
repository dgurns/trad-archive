import { InputType, Field } from 'type-graphql';
import { EntityType } from 'models/entities/base';
@InputType()
export class CommentsForParentEntityInput {
  @Field(() => EntityType)
  parentEntityType!: EntityType;

  @Field(() => String)
  parentEntityId!: string;
}

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  parentAudioItemId!: string;

  @Field(() => String)
  text!: string;
}