import { InputType, Field, Int } from "type-graphql";
import { EntityType } from "../models/entities/base";

@InputType()
export class SearchEntitiesInput {
	@Field(() => String)
	searchTerm!: string;

	@Field(() => [EntityType], { nullable: true })
	entityTypes?: EntityType[];

	@Field(() => Int, { nullable: true, defaultValue: 24 })
	take!: number;
}
