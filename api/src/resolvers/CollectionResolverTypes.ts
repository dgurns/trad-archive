import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CollectionsInput {
	@Field(() => Int, { nullable: true, defaultValue: 10 })
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	skip?: number;
}

@InputType()
export class CreateCollectionInput {
	@Field(() => String)
	name!: string;

	@Field(() => String)
	slug!: string;

	@Field(() => String, { nullable: true })
	aliases?: string;

	@Field(() => String, { nullable: true })
	description?: string;
}

@InputType()
export class UpdateCollectionInput {
	@Field(() => String, { nullable: true })
	name?: string;

	@Field(() => String, { nullable: true })
	aliases?: string;

	@Field(() => String, { nullable: true })
	description?: string;
}
