import { InputType, Field, Int } from "type-graphql";
import { EntityType } from "models/entities/base";
import {
	TakedownRequestStatus,
	TakedownRequestType,
} from "models/TakedownRequest";

@InputType()
export class TakedownRequestsInput {
	@Field(() => Int, { nullable: true, defaultValue: 40 })
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	skip?: number;
}

@InputType()
export class TakedownRequestsForEntityInput {
	@Field(() => String)
	entityId!: string;

	@Field(() => EntityType)
	entityType!: EntityType;
}

@InputType()
export class CreateTakedownRequestInput {
	@Field(() => String)
	audioItemId!: string;

	@Field(() => TakedownRequestType)
	type!: TakedownRequestType;

	@Field(() => String)
	message!: string;
}

@InputType()
export class UpdateTakedownRequestStatusInput {
	@Field(() => String)
	id!: string;

	@Field(() => TakedownRequestStatus)
	status!: TakedownRequestStatus;
}
