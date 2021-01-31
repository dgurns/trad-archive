import { InputType, Field } from 'type-graphql';

@InputType()
export class CreatePersonEntityInput {
  @Field(() => String)
  slug!: string;

  @Field(() => String, { nullable: true })
  aliases?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  firstName!: string;

  @Field(() => String, { nullable: true })
  middleName?: string;

  @Field(() => String)
  lastName!: string;
}

@InputType()
export class CreateInstrumentEntityInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  slug!: string;

  @Field(() => String, { nullable: true })
  aliases?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
