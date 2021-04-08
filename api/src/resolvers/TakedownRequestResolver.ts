import { Resolver, Mutation, Ctx, Arg, Query, Authorized } from "type-graphql";
import { getManager } from "typeorm";
import { CustomContext } from "middleware/context";
import {
	TakedownRequestsInput,
	TakedownRequestsForEntityInput,
	CreateTakedownRequestInput,
	UpdateTakedownRequestStatusInput,
} from "resolvers/TakedownRequestResolverTypes";
import { TakedownRequest } from "models/TakedownRequest";
import { User, UserPermission } from "models/User";
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

		const tagsQuery = await getManager()
			.createQueryBuilder(TakedownRequest, "takedownRequest")
			.where(`takedownRequest.${entityType}Id = :entityId`, {
				entityId,
			})
			.leftJoinAndSelect("takedownRequest.audioItem", "audioItem")
			.leftJoinAndSelect("takedownRequest.createdByUser", "createdByUser")
			.leftJoinAndSelect("takedownRequest.updatedByUser", "updatedByUser")
			.orderBy("takedownRequest.createdAt", "ASC");
	}

	@Mutation(() => TakedownRequest)
	async createTakedownRequest(
		@Arg("input") input: CreateTakedownRequestInput,
		@Ctx() ctx: CustomContext
	) {
		const { audioItemId, type, message } = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to create a TakedownRequest");
		}
		const audioItem = await AudioItem.findOne({ where: { id: audioItemId } });
		if (!audioItem) {
			throw new Error("Could not find an AudioItem with that ID");
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
		return takedownRequest;
	}
}
