import { InputType, ObjectType, Field, Int } from "type-graphql";

import {
	Submission,
	SubmissionStatus,
	SubmissionMaterialType,
} from "../models/Submission";

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

@InputType()
export class CreatePresignedFileUploadUrlsInput {
	@Field(() => String)
	submissionId!: string;

	@Field(() => [String])
	filenames!: string[];
}

@ObjectType()
export class PresignedFileUploadUrl {
	@Field(() => String)
	filename!: string;

	@Field(() => String)
	presignedUploadUrl!: string;
}

@ObjectType()
export class FileWithPresignedDownloadUrl {
	@Field(() => String)
	filename!: string;

	@Field(() => String)
	presignedDownloadUrl!: string;
}

@ObjectType()
export class SubmissionWithFiles {
	@Field(() => Submission)
	submission!: Submission;

	@Field(() => [FileWithPresignedDownloadUrl])
	files!: FileWithPresignedDownloadUrl[];
}
