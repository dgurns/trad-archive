import { InputType, Field, Int } from "type-graphql";
import { SortBy } from "resolvers/commonTypes";

@InputType()
export class InstrumentsInput {
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

@InputType()
export class UpdateInstrumentInput {
	@Field(() => String, { nullable: true })
	name?: string;

	@Field(() => String, { nullable: true })
	aliases?: string;

	@Field(() => String, { nullable: true })
	description?: string;
}
