import { Resolver, Mutation, Ctx, Arg, Query, Authorized } from "type-graphql";
import { FindManyOptions, getManager } from "typeorm";
import { CustomContext } from "middleware/context";
import {
	UserVerificationRequestsInput,
	CreateUserVerificationRequestInput,
	UpdateUserVerificationRequestStatusInput,
} from "resolvers/UserVerificationRequestResolverTypes";
import {
	UserVerificationRequest,
	UserVerificationRequestStatus,
} from "models/UserVerificationRequest";
import { User, UserPermission } from "models/User";
import { EntityStatus, EntityType } from "models/entities/base";
import { AudioItem } from "models/entities/AudioItem";
import { Person } from "models/entities/Person";

@Resolver(() => UserVerificationRequest)
export class UserVerificationRequestResolver {
	@Query(() => [UserVerificationRequest])
	userVerificationRequests(@Arg("input") input: UserVerificationRequestsInput) {
		const { take, skip, status } = input;
		const findOptions: FindManyOptions<UserVerificationRequest> = {
			take,
			skip,
			order: { createdAt: "DESC" },
		};
		if (status) {
			findOptions.where = { status };
		}
		return UserVerificationRequest.find(findOptions);
	}

	@Mutation(() => UserVerificationRequest)
	async createUserVerificationRequest(
		@Arg("input") input: CreateUserVerificationRequestInput,
		@Ctx() ctx: CustomContext
	) {
		const { personId, copyrightPermissionStatus, imageS3Key } = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error(
				"You must be logged in to create a UserVerificationRequest"
			);
		}
		const person = await Person.findOne({ where: { id: personId } });
		if (!person) {
			throw new Error("Could not find a Person with that ID");
		}

		const userVerificationRequest = UserVerificationRequest.create({
			user,
			person,
			imageS3Key,
			copyrightPermissionStatus,
			status: UserVerificationRequestStatus.Pending,
			createdByUser: user,
			updatedByUser: user,
		});
		await userVerificationRequest.save();

		// Update the User with the copyright permission status contained in the
		// UserVerificationRequest
		user.copyrightPermissionStatus = copyrightPermissionStatus;
		await user.save();

		return userVerificationRequest;
	}

	@Mutation(() => UserVerificationRequest)
	@Authorized(UserPermission.Admin)
	async updateUserVerificationRequestStatus(
		@Arg("input") input: UpdateUserVerificationRequestStatusInput,
		@Ctx() ctx: CustomContext
	) {
		const { id, status } = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error(
				"You must be logged in to update a UserVerificationRequest"
			);
		}
		const userVerificationRequest = await UserVerificationRequest.findOne({
			where: { id },
		});
		if (typeof userVerificationRequest === "undefined") {
			throw new Error("Could not find a UserVerificationRequest with that ID");
		}

		userVerificationRequest.status = status;
		userVerificationRequest.updatedByUser = user;
		await userVerificationRequest.save();

		// If approved, update the User and Person records with the new linkage
		const shouldAddLinkage =
			userVerificationRequest.status === UserVerificationRequestStatus.Approved;
		const person = await Person.findOne({
			where: { id: userVerificationRequest.person.id },
		});
		if (shouldAddLinkage && person) {
			user.verifiedPerson = person;
			person.verifiedUser = user;
			await user.save();
			await person.save();
		}

		return userVerificationRequest;
	}
}
