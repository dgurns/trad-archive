import { InputType, Field, Int } from "type-graphql";
import { SortBy } from "./commonTypes";

@InputType()
export class PeopleInput {
	@Field(() => Int, { nullable: true, defaultValue: 20 })
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	skip?: number;

	@Field(() => SortBy, {
		nullable: true,
		defaultValue: SortBy.AToZ,
	})
	sortBy?: SortBy;
}

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

@InputType()
export class UpdatePersonInput {
	@Field(() => String, { nullable: true })
	aliases?: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => String, { nullable: true })
	firstName?: string;

	@Field(() => String, { nullable: true })
	middleName?: string;

	@Field(() => String, { nullable: true })
	lastName?: string;
}
