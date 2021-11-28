import { InputType, Field, Int } from "type-graphql";
import { SortBy } from "./commonTypes";

@InputType()
export class TunesInput {
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
