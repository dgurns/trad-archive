import { InputType, Field, Float, Int } from "type-graphql";
import { SortBy } from "./commonTypes";

@InputType()
export class PlacesInput {
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
export class CreatePlaceInput {
	@Field(() => String)
	name!: string;

	@Field(() => String)
	slug!: string;

	@Field(() => String, { nullable: true })
	aliases?: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => Float)
	latitude!: number;

	@Field(() => Float)
	longitude!: number;
}

@InputType()
export class UpdatePlaceInput {
	@Field(() => String, { nullable: true })
	name?: string;

	@Field(() => String, { nullable: true })
	aliases?: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => Float, { nullable: true })
	latitude?: number;

	@Field(() => Float, { nullable: true })
	longitude?: number;
}
