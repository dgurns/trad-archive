import {
	Resolver,
	Mutation,
	Ctx,
	Arg,
	Query,
	Authorized,
	Root,
	FieldResolver,
} from "type-graphql";
import { FindManyOptions } from "typeorm";

import S3Service from "../services/S3";
import { CustomContext } from "../middleware/context";
import {
	VerificationRequestsInput,
	CreatePresignedUploadUrlForVerificationImageResponse,
	CreateVerificationRequestInput,
	UpdateVerificationRequestStatusInput,
} from "./VerificationRequestResolverTypes";
import {
	VerificationRequest,
	VerificationRequestStatus,
} from "../models/VerificationRequest";
import { User, UserPermission } from "../models/User";
import { Person } from "../models/entities/Person";

@Resolver(() => VerificationRequest)
export class VerificationRequestResolver {
	@Query(() => [VerificationRequest])
	@Authorized(UserPermission.Admin)
	verificationRequests(@Arg("input") input: VerificationRequestsInput) {
		const { take, skip, status } = input;
		const findOptions: FindManyOptions<VerificationRequest> = {
			take,
			skip,
			order: { createdAt: "DESC" },
		};
		if (status) {
			findOptions.where = { status };
		}
		return VerificationRequest.find(findOptions);
	}

	@Query(() => [VerificationRequest])
	verificationRequestsForCurrentUser(@Ctx() ctx: CustomContext) {
		if (!ctx.userId) {
			throw new Error(
				"Must be logged in to fetch VerificationRequests for current user"
			);
		}
		return VerificationRequest.find({
			where: { createdByUserId: ctx.userId },
		});
	}

	// Any logged-in user can upload a verification image to their own account
	@Mutation(() => CreatePresignedUploadUrlForVerificationImageResponse)
	async createPresignedUploadUrlForVerificationImage(
		@Arg("filename") filename: string,
		@Ctx() ctx: CustomContext
	) {
		if (!ctx.userId) {
			throw new Error(
				"You must be logged in to create a presigned URL for verification image upload"
			);
		} else if (!filename) {
			throw new Error("You must provide a filename for the image");
		}
		const imageS3Key = `users/${ctx.userId}/verification/${filename}`;
		const presignedUploadUrl = await S3Service.makePresignedPutUrl(imageS3Key);
		return {
			imageS3Key,
			presignedUploadUrl,
		};
	}

	// Only admins can download verification images
	@Mutation(() => String)
	@Authorized(UserPermission.Admin)
	createPresignedDownloadUrlForVerificationImage(
		@Arg("s3Key") s3Key: string,
		@Ctx() ctx: CustomContext
	) {
		if (!s3Key) {
			throw new Error("You must provide the image's s3Key");
		}
		return S3Service.makePresignedGetUrl(s3Key);
	}

	@Mutation(() => VerificationRequest)
	async createVerificationRequest(
		@Arg("input") input: CreateVerificationRequestInput,
		@Ctx() ctx: CustomContext
	) {
		const { personId, copyrightPermissionStatus, imageS3Key } = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to create a VerificationRequest");
		}
		const person = await Person.findOne({ where: { id: personId } });
		if (!person) {
			throw new Error("Could not find a Person with that ID");
		}

		const verificationRequest = VerificationRequest.create({
			person,
			imageS3Key,
			copyrightPermissionStatus,
			status: VerificationRequestStatus.Pending,
			createdByUser: user,
			updatedByUser: user,
		});
		await verificationRequest.save();

		// Update the User with the copyright permission status contained in the
		// VerificationRequest
		user.copyrightPermissionStatus = copyrightPermissionStatus;
		await user.save();

		return verificationRequest;
	}

	@Mutation(() => VerificationRequest)
	@Authorized(UserPermission.Admin)
	async updateVerificationRequestStatus(
		@Arg("input") input: UpdateVerificationRequestStatusInput,
		@Ctx() ctx: CustomContext
	) {
		const { id, status } = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to update a VerificationRequest");
		}
		const verificationRequest = await VerificationRequest.findOne({
			where: { id },
		});
		if (typeof verificationRequest === "undefined") {
			throw new Error("Could not find a VerificationRequest with that ID");
		}

		// Update the status
		verificationRequest.status = status;
		verificationRequest.updatedByUser = user;

		// Now that the status is updated, delete the image for security reasons
		if (verificationRequest.imageS3Key) {
			await S3Service.deleteObject(verificationRequest.imageS3Key);
			verificationRequest.imageS3Key = null;
		}

		await verificationRequest.save();
		return verificationRequest;
	}

	@FieldResolver(() => String, { nullable: true })
	@Authorized(UserPermission.Admin)
	presignedImageDownloadUrl(@Root() verificationRequest: VerificationRequest) {
		if (!verificationRequest.imageS3Key) {
			return null;
		}
		return S3Service.makePresignedGetUrl(verificationRequest.imageS3Key);
	}
}
