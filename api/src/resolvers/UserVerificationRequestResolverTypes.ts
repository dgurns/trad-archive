import { InputType, Field, Int } from "type-graphql";
import { UserVerificationRequestStatus } from "models/UserVerificationRequest";
import { CopyrightPermissionStatus } from "models/User";

@InputType()
export class UserVerificationRequestsInput {
	@Field(() => Int, { nullable: true, defaultValue: 40 })
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	skip?: number;

	@Field(() => UserVerificationRequestStatus, { nullable: true })
	status?: UserVerificationRequestStatus;
}

@InputType()
export class CreateUserVerificationRequestInput {
	@Field(() => String)
	personId!: string;

	@Field(() => String)
	imageS3Key!: string;

	@Field(() => CopyrightPermissionStatus)
	copyrightPermissionStatus!: CopyrightPermissionStatus;
}

@InputType()
export class UpdateUserVerificationRequestStatusInput {
	@Field(() => String)
	id!: string;

	@Field(() => UserVerificationRequestStatus)
	status!: UserVerificationRequestStatus;
}
