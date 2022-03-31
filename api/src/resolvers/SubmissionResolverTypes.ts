import { InputType, Field, Int } from "type-graphql";

import { SubmissionStatus, SubmissionMaterialType } from "../models/Submission";

@InputType()
export class SubmissionInput {
	@Field(() => String)
	id!: string;
}

@InputType()
export class SubmissionsInput {
	@Field(() => Int, { nullable: true, defaultValue: 40 })
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	skip?: number;

	@Field(() => SubmissionStatus, { nullable: true })
	status?: SubmissionStatus;
}

@InputType()
export class CreateSubmissionInput {
	@Field(() => [SubmissionMaterialType])
	materialTypes!: SubmissionMaterialType[];

	@Field(() => Boolean)
	userControlsCopyright!: boolean;

	@Field(() => String, { nullable: true })
	copyrightDetails?: string;

	@Field(() => String, { nullable: true })
	description?: string;
}

@InputType()
export class UpdateSubmissionStatusInput {
	@Field(() => String)
	id!: string;

	@Field(() => SubmissionStatus)
	status!: SubmissionStatus;
}
