import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateCollectionEntryInput {
  @Field(() => String)
  audioItemId!: string;
}
