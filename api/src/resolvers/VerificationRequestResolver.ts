import { Resolver, Mutation, Ctx, Arg, Query, Authorized } from "type-graphql";
import { FindManyOptions } from "typeorm";
import { CustomContext } from "middleware/context";
import {
	VerificationRequestsInput,
	CreateVerificationRequestInput,
	UpdateVerificationRequestStatusInput,
} from "resolvers/VerificationRequestResolverTypes";
import {
	VerificationRequest,
	VerificationRequestStatus,
} from "models/VerificationRequest";
import { User, UserPermission } from "models/User";
import { Person } from "models/entities/Person";

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

		verificationRequest.status = status;
		verificationRequest.updatedByUser = user;
		await verificationRequest.save();

		return verificationRequest;
	}
}