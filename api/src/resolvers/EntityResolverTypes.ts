import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class SearchEntitiesInput {
  @Field(() => String)
  searchTerm!: string;

  @Field(() => Int, { nullable: true, defaultValue: 20 })
  take!: number;
}
