import { InputType, Field, Int, ObjectType } from "type-graphql";
import { EntityStatus, EntityType } from "../models/entities/base";
import { AudioItem } from "../models/entities/AudioItem";
import { SortBy } from "./commonTypes";

@InputType()
export class AudioItemsInput {
	@Field(() => Int, { nullable: true, defaultValue: 10 })
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	skip?: number;

	@Field(() => EntityStatus, { nullable: true })
	status?: EntityStatus;

	@Field(() => SortBy, {
		nullable: true,
		defaultValue: SortBy.RecentlyTagged,
	})
	sortBy?: SortBy;
}

@InputType()
export class AudioItemsTaggedWithEntityInput {
	@Field(() => EntityType)
	entityType!: EntityType;

	@Field(() => String)
	entityId!: string;

	@Field(() => Int, { nullable: true, defaultValue: 10 })
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	skip?: number;

	@Field(() => SortBy, {
		nullable: true,
		defaultValue: SortBy.RecentlyTagged,
	})
	sortBy?: SortBy;
}

@ObjectType()
export class AudioItemsTaggedWithEntityResponse {
	@Field(() => [AudioItem])
	audioItems!: AudioItem[];

	@Field(() => Int)
	total!: number;
}

@InputType()
export class AudioItemsCreatedByUserInput {
	@Field(() => String)
	userId!: string;

	@Field(() => Int, { nullable: true, defaultValue: 10 })
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	skip?: number;
}

@InputType()
export class CreateAudioItemInput {
	@Field(() => String)
	name!: string;

	@Field(() => String)
	slug!: string;

	@Field(() => String, { nullable: true })
	aliases?: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => String)
	urlSource!: string;
}

@InputType()
export class UpdateAudioItemInput {
	@Field(() => String, { nullable: true })
	name?: string;

	@Field(() => String, { nullable: true })
	aliases?: string;

	@Field(() => String, { nullable: true })
	description?: string;
}
