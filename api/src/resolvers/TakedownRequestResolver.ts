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
import { EntityStatus, EntityType } from "models/entities/base";
import { AudioItem } from "models/entities/AudioItem";

const addRelationsToQueryBuilder = (
	query: SelectQueryBuilder<TakedownRequest>
): SelectQueryBuilder<TakedownRequest> => {
	return query
		.leftJoinAndSelect("takedownRequest.audioItem", "audioItem")
		.leftJoinAndSelect("audioItem.createdByUser", "audioItemCreatedByUser")
		.leftJoinAndSelect("audioItem.tags", "tag")
		.leftJoinAndSelect("tag.relationship", "tagRelationship")
		.leftJoinAndSelect("tag.subjectAudioItem", "tagAudioItem")
		.leftJoinAndSelect("tag.objectPerson", "tagObjectPerson")
		.leftJoinAndSelect("tag.objectInstrument", "tagObjectInstrument")
		.leftJoinAndSelect("tag.objectPlace", "tagObjectPlace")
		.leftJoinAndSelect("tag.objectAudioItem", "tagObjectAudioItem")
		.leftJoinAndSelect("tag.objectTune", "tagObjectTune")
		.leftJoinAndSelect("takedownRequest.createdByUser", "createdByUser")
		.leftJoinAndSelect("takedownRequest.updatedByUser", "updatedByUser");
};

@Resolver()
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
				relations: ["tags"],
			});
		}

		const takedownRequest = TakedownRequest.create({
			audioItem,
			type,
			message,
			createdByUser: user,
			updatedByUser: user,
		});
		await takedownRequest.save();
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
