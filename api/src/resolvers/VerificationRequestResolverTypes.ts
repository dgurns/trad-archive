import { InputType, Field, Int } from "type-graphql";
import { VerificationRequestStatus } from "models/VerificationRequest";
import { CopyrightPermissionStatus } from "models/User";

@InputType()
export class VerificationRequestsInput {
	@Field(() => Int, { nullable: true, defaultValue: 40 })
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	skip?: number;

	@Field(() => VerificationRequestStatus, { nullable: true })
	status?: VerificationRequestStatus;
}

@InputType()
export class CreateVerificationRequestInput {
	@Field(() => String)
	personId!: string;

	@Field(() => String)
	imageS3Key!: string;

	@Field(() => CopyrightPermissionStatus)
	copyrightPermissionStatus!: CopyrightPermissionStatus;
}

@InputType()
export class UpdateVerificationRequestStatusInput {
	@Field(() => String)
	id!: string;

	@Field(() => VerificationRequestStatus)
	status!: VerificationRequestStatus;
}
