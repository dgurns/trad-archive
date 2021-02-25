import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CreateCollectionEntryInput {
  @Field(() => String)
  audioItemId!: string;
}

@InputType()
export class DeleteCollectionEntryInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  audioItemId?: string;
}
