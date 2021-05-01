import { InputType, Field, Float } from "type-graphql";

@InputType()
export class UpdateTuneInput {
	@Field(() => String, { nullable: true })
	description?: string;
}
