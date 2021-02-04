import { InputType, Field } from 'type-graphql';

@InputType()
export class CreatePersonInput {
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
