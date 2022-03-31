import { Resolver, Mutation, Ctx, Arg, Query, Authorized } from "type-graphql";
import { FindManyOptions } from "typeorm";

import { CustomContext } from "../middleware/context";
import {
	SubmissionInput,
	SubmissionsInput,
	CreateSubmissionInput,
	UpdateSubmissionStatusInput,
} from "./SubmissionResolverTypes";
import { Submission, SubmissionStatus } from "../models/Submission";
import { User, UserRole, CopyrightPermissionStatus } from "../models/User";

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

	@Query(() => [Submission])
	@Authorized(UserRole.Admin)
	submissions(@Arg("input") input: SubmissionsInput) {
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
				createdAt: "ASC",
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
}
