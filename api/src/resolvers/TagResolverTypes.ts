import { InputType, Field, Int } from "type-graphql";
import { EntityType } from "models/entities/base";

@InputType()
export class TagsInput {
	@Field(() => Int, { nullable: true, defaultValue: 10 })
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	skip?: number;
}

@InputType()
export class TagsToEntityInput {
	@Field(() => EntityType)
	entityType!: EntityType;

	@Field()
	entityId!: string;

	@Field(() => Int, { nullable: true })
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	skip?: number;
}

@InputType()
export class CreateTagInput {
	@Field(() => String)
	relationshipId!: string;

	@Field(() => EntityType)
	subjectEntityType!: EntityType;

	@Field()
	subjectEntityId!: string;

	@Field(() => EntityType)
	objectEntityType!: EntityType;

	@Field()
	objectEntityId!: string;

	@Field(() => Int, { nullable: true })
	subjectTimeMarkerSeconds!: number;
}
