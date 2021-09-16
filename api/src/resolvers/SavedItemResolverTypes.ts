import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CreateSavedItemInput {
	@Field(() => String)
	audioItemId!: string;
}

@InputType()
export class DeleteSavedItemInput {
	@Field(() => String, { nullable: true })
	id?: string;

	@Field(() => String, { nullable: true })
	audioItemId?: string;
}
