import { Resolver, Mutation, Ctx, Arg, Query, Authorized } from "type-graphql";
import { getManager, SelectQueryBuilder } from "typeorm";
import { CustomContext } from "middleware/context";
import {
	TakedownRequestsInput,
	TakedownRequestsForEntityInput,
	CreateTakedownRequestInput,
	UpdateTakedownRequestStatusInput,
} from "resolvers/TakedownRequestResolverTypes";
import { TakedownRequest, TakedownRequestStatus } from "models/TakedownRequest";
import { User, UserPermission } from "models/User";
import {
	VerificationRequest,
	VerificationRequestStatus,
} from "models/VerificationRequest";
import { EntityStatus, EntityType } from "models/entities/base";
import { AudioItem } from "models/entities/AudioItem";

const addRelationsToQueryBuilder = (
	query: SelectQueryBuilder<TakedownRequest>
): SelectQueryBuilder<TakedownRequest> => {
	return query
		.leftJoinAndSelect("takedownRequest.audioItem", "audioItem")
		.leftJoinAndSelect("audioItem.createdByUser", "audioItemCreatedByUser")
		.leftJoinAndSelect("takedownRequest.createdByUser", "createdByUser")
		.leftJoinAndSelect("takedownRequest.updatedByUser", "updatedByUser");
};

@Resolver(() => TakedownRequest)
export class TakedownRequestResolver {
	@Query(() => [TakedownRequest])
	async takedownRequests(@Arg("input") input: TakedownRequestsInput) {
		const { take, skip } = input;
		const query = await getManager().createQueryBuilder(
			TakedownRequest,
			"takedownRequest"
		);
		const queryWithRelations = addRelationsToQueryBuilder(query);
		const takedownRequests = await queryWithRelations
			.take(take)
			.skip(skip)
			.orderBy("takedownRequest.createdAt", "DESC")
			.getMany();
		return takedownRequests;
	}

	@Query(() => [TakedownRequest])
	async takedownRequestsForEntity(
		@Arg("input") input: TakedownRequestsForEntityInput
	) {
		const { entityId, entityType } = input;
		const lowercasedEntityType =
			entityType[0].toLowerCase() + entityType.slice(1);

		const query = await getManager()
			.createQueryBuilder(TakedownRequest, "takedownRequest")
			.where(`takedownRequest.${lowercasedEntityType}Id = :entityId`, {
				entityId,
			});
		const queryWithRelations = addRelationsToQueryBuilder(query);
		const takedownRequestsForEntity = await queryWithRelations
			.orderBy("takedownRequest.createdAt", "ASC")
			.getMany();
		return takedownRequestsForEntity;
	}

	@Mutation(() => TakedownRequest)
	async createTakedownRequest(
		@Arg("input") input: CreateTakedownRequestInput,
		@Ctx() ctx: CustomContext
	) {
		const { entityType, entityId, type, message } = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to create a TakedownRequest");
		}
		// For now we only support creating a TakedownRequest for an AudioItem
		let audioItem;
		if (entityType === EntityType.AudioItem) {
			audioItem = await AudioItem.findOne({
				where: { id: entityId },
				relations: ["tags", "tags.objectPerson"],
			});
		}
		if (!audioItem) {
			throw new Error("Could not find the AudioItem for this TakedownRequest");
		}

		// Auto-approve this TakedownRequest if User is verified as a Person and
		// that Person is tagged in the AudioItem
		let shouldAutoApproveTakedownRequest = false;
		const successfulVerificationRequest = await VerificationRequest.findOne({
			where: {
				createdByUserId: user.id,
				status: VerificationRequestStatus.Approved,
			},
		});
		if (successfulVerificationRequest) {
			const tags = audioItem.tags ?? [];
			for (const tag of tags) {
				if (tag.objectPerson?.id === successfulVerificationRequest.person.id) {
					shouldAutoApproveTakedownRequest = true;
					break;
				}
			}
		}

		const status = shouldAutoApproveTakedownRequest
			? TakedownRequestStatus.Approved
			: TakedownRequestStatus.Pending;
		const takedownRequest = TakedownRequest.create({
			audioItem,
			type,
			message,
			createdByUser: user,
			updatedByUser: user,
			status,
		});
		await takedownRequest.save();

		// If auto-approved, update the affected Entity's status
		if (status === TakedownRequestStatus.Approved) {
			audioItem.status = EntityStatus.TakenDown;
			await audioItem.save();
		}

		return takedownRequest;
	}

	@Mutation(() => TakedownRequest)
	@Authorized(UserPermission.Admin)
	async updateTakedownRequestStatus(
		@Arg("input") input: UpdateTakedownRequestStatusInput,
		@Ctx() ctx: CustomContext
	) {
		const { id, status } = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to update a TakedownRequest");
		}
		const query = await getManager()
			.createQueryBuilder(TakedownRequest, "takedownRequest")
			.where(`takedownRequest.id = :id`, { id });
		const queryWithRelations = addRelationsToQueryBuilder(query);
		const takedownRequest = await queryWithRelations.getOne();
		if (typeof takedownRequest === "undefined") {
			throw new Error("Could not find a TakedownRequest with that ID");
		}

		takedownRequest.status = status;
		takedownRequest.updatedByUser = user;
		await takedownRequest.save();

		// Get the affected Entity and update its status
		const entityIsTakenDown = status === TakedownRequestStatus.Approved;
		if (Boolean(takedownRequest.audioItem)) {
			const audioItem = await AudioItem.findOne({
				where: { id: takedownRequest.audioItem.id },
			});
			if (audioItem) {
				audioItem.status = entityIsTakenDown
					? EntityStatus.TakenDown
					: EntityStatus.Published;
				await audioItem.save();
			}
		}

		return takedownRequest;
	}
}
