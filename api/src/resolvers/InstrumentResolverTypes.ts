import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateInstrumentInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  slug!: string;

  @Field(() => String, { nullable: true })
  aliases?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
