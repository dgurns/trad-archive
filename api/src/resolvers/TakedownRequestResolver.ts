import { Resolver, Mutation, Ctx, Arg, Query, Authorized } from "type-graphql";
import { getManager } from "typeorm";
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

@Resolver()
export class TakedownRequestResolver {
	@Query(() => [TakedownRequest])
	takedownRequests(@Arg("input") input: TakedownRequestsInput) {
		const { take, skip } = input;
		return TakedownRequest.find({ take, skip, order: { createdAt: "DESC" } });
	}

	@Query(() => TakedownRequest)
	async takedownRequestsForEntity(
		@Arg("input") input: TakedownRequestsForEntityInput
	) {
		const { entityId, entityType } = input;

		const takedownRequestsForEntity = await getManager()
			.createQueryBuilder(TakedownRequest, "takedownRequest")
			.where(`takedownRequest.${entityType}Id = :entityId`, {
				entityId,
			})
			.leftJoinAndSelect("takedownRequest.audioItem", "audioItem")
			.leftJoinAndSelect("takedownRequest.createdByUser", "createdByUser")
			.leftJoinAndSelect("takedownRequest.updatedByUser", "updatedByUser")
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
			audioItem = await AudioItem.findOne({ where: { id: entityId } });
		}

		const takedownRequest = TakedownRequest.create({
			audioItem,
			type,
			message,
			createdByUser: user,
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
		const takedownRequest = await TakedownRequest.findOne({ where: { id } });
		if (!takedownRequest) {
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
