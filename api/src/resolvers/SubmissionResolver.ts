import { Resolver, Mutation, Ctx, Arg, Query, Authorized } from "type-graphql";
import { FindManyOptions } from "typeorm";

import { CustomContext } from "../middleware/context";
import {
	SubmissionInput,
	SubmissionsInput,
	CreateSubmissionInput,
	UpdateSubmissionStatusInput,
	CreatePresignedFileUploadUrlsInput,
	PresignedFileUploadUrl,
	SubmissionWithFiles,
	FileWithPresignedDownloadUrl,
} from "./SubmissionResolverTypes";
import { Submission, SubmissionStatus } from "../models/Submission";
import { User, UserRole, CopyrightPermissionStatus } from "../models/User";
import S3Service from "../services/S3";

@Resolver(() => Submission)
export class SubmissionResolver {
	@Query(() => Submission)
	async submission(
		@Arg("input") input: SubmissionInput,
		@Ctx() ctx: CustomContext
	) {
		if (!ctx.userId) {
			throw new Error("Must be logged in to fetch a Submission");
		}
		const user = await User.findOne({ where: { id: ctx.userId } });

		const { id } = input;
		if (!id) {
			throw new Error("Must provide an ID");
		}
		const result = await Submission.findOne({ where: { id } });
		if (!result) {
			throw new Error("Could not find a Submission with that ID");
		}

		const isAdmin = user?.role === UserRole.Admin;
		const isAssociatedUser = result.createdByUser.id === user?.id;
		if (!isAdmin && !isAssociatedUser) {
			throw new Error(
				"To fetch a Submission you must be the associated User or an admin"
			);
		}
		return result;
	}

	@Query(() => SubmissionWithFiles)
	@Authorized(UserRole.Admin)
	async submissionWithFiles(
		@Arg("id") id: String,
		@Ctx() ctx: CustomContext
	): Promise<SubmissionWithFiles> {
		const submission = await Submission.findOne({
			where: { id },
		});
		if (!submission || !submission.s3DirectoryKey) {
			throw new Error("Could not find a valid Submission with that ID");
		}
		// Get all objects for this Submission and make a presigned download URL for
		// each
		const s3Objects = await S3Service.listObjects(submission.s3DirectoryKey);
		const filesWithPresignedUrls: FileWithPresignedDownloadUrl[] = [];
		for (const o of s3Objects.Contents ?? []) {
			if (!o.Key) {
				continue;
			}
			const url = await S3Service.makePresignedGetUrl(o.Key);
			filesWithPresignedUrls.push({
				filename: o.Key.split(submission.s3DirectoryKey + "/")[1],
				presignedDownloadUrl: url,
			});
		}
		return {
			submission,
			files: filesWithPresignedUrls,
		};
	}

	@Query(() => [Submission])
	@Authorized(UserRole.Admin)
	submissions(@Arg("input") input: SubmissionsInput): Promise<Submission[]> {
		const { take, skip, status } = input;
		const findOptions: FindManyOptions<Submission> = {
			take,
			skip,
			order: { createdAt: "DESC" },
		};
		if (status) {
			findOptions.where = { status };
		}
		return Submission.find(findOptions);
	}

	@Query(() => [Submission])
	submissionsForCurrentUser(@Ctx() ctx: CustomContext) {
		if (!ctx.userId) {
			throw new Error(
				"Must be logged in to fetch Submissions for current user"
			);
		}
		return Submission.find({
			where: { createdByUserId: ctx.userId },
			order: {
				createdAt: "DESC",
			},
		});
	}

	@Mutation(() => Submission)
	async createSubmission(
		@Arg("input") input: CreateSubmissionInput,
		@Ctx() ctx: CustomContext
	) {
		const {
			materialTypes,
			userControlsCopyright,
			copyrightDetails,
			description,
		} = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to create a Submission");
		}

		const submission = Submission.create({
			status: SubmissionStatus.Pending,
			materialTypes,
			userControlsCopyright,
			copyrightDetails,
			description,
			createdByUser: user,
			updatedByUser: user,
		});
		await submission.save();

		// Set the s3DirectoryKey based on the Submission's ID
		submission.s3DirectoryKey = `submissions/${submission.id}`;
		await submission.save();

		// Since the User can only create a Submission after granting full
		// non-commercial copyright to ITMA, confirm that the User field is updated
		if (
			user.copyrightPermissionStatus !==
			CopyrightPermissionStatus.FullNonCommercialGranted
		) {
			user.copyrightPermissionStatus =
				CopyrightPermissionStatus.FullNonCommercialGranted;
			await user.save();
		}

		return submission;
	}

	@Mutation(() => Submission)
	@Authorized(UserRole.Admin)
	async updateSubmissionStatus(
		@Arg("input") input: UpdateSubmissionStatusInput,
		@Ctx() ctx: CustomContext
	) {
		const { id, status } = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to update a Submission");
		}
		const submission = await Submission.findOne({
			where: { id },
		});
		if (typeof submission === "undefined") {
			throw new Error("Could not find a Submission with that ID");
		}

		// Update the status
		submission.status = status;
		submission.updatedByUser = user;

		await submission.save();
		return submission;
	}

	// Any logged-in user can upload files to their own Submissions
	@Mutation(() => [PresignedFileUploadUrl])
	async createPresignedFileUploadUrls(
		@Arg("input") input: CreatePresignedFileUploadUrlsInput,
		@Ctx() ctx: CustomContext
	) {
		if (!ctx.userId) {
			throw new Error(
				"You must be logged in to create presigned URLs for file uploads"
			);
		}
		const { submissionId, filenames } = input;
		if (filenames.length === 0) {
			throw new Error("You must provide filenames to upload");
		}

		const submission = await Submission.findOne({
			where: { id: submissionId },
		});
		if (!submission) {
			throw new Error("Could not find a Submission with that ID");
		} else if (submission?.createdByUser.id !== ctx.userId) {
			throw new Error(
				"Only the User who created the Submission can upload files to it"
			);
		}

		const urls: Array<{ filename: string; presignedUploadUrl: string }> = [];
		for (const filename of filenames) {
			const cleanedFilename = filename
				.replace(" ", "_")
				.replace(/[^a-zA-Z0-9-_.]/g, "");
			const presignedUploadUrl = await S3Service.makePresignedPutUrl(
				`${submission.s3DirectoryKey}/${cleanedFilename}`
			);
			urls.push({ filename, presignedUploadUrl });
		}
		return urls;
	}
}
