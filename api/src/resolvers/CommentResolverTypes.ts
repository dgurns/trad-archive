import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  parentAudioItemId!: string;

  @Field(() => String)
  text!: string;
}
