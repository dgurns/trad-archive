import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateTuneInput {
	@Field(() => String, { nullable: true })
	description?: string;
}
