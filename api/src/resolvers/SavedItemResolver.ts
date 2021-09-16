import { Resolver, Mutation, Ctx, Arg, Query } from "type-graphql";
import { CustomContext } from "middleware/context";
import { User } from "models/User";
import {
	CreateSavedItemInput,
	DeleteSavedItemInput,
} from "resolvers/SavedItemResolverTypes";
import { SavedItem } from "models/SavedItem";
import { AudioItem } from "models/entities/AudioItem";

@Resolver(() => SavedItem)
export class SavedItemResolver {
	@Query(() => [SavedItem])
	savedItemsForUser(@Ctx() ctx: CustomContext) {
		if (!ctx.userId) {
			throw new Error("Must be logged in to get saved items");
		}
		return SavedItem.find({
			where: { userId: ctx.userId },
			order: { createdAt: "DESC" },
		});
	}

	@Mutation(() => SavedItem)
	async createSavedItem(
		@Arg("input") input: CreateSavedItemInput,
		@Ctx() ctx: CustomContext
	) {
		const { audioItemId } = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("Must be logged in to create a saved item");
		}
		const audioItem = await AudioItem.findOne({ where: { id: audioItemId } });
		if (!audioItem) {
			throw new Error("Could not find an AudioItem with that ID");
		}

		const savedItem = SavedItem.create({
			audioItem,
			user,
		});
		await savedItem.save();
		return savedItem;
	}

	@Mutation(() => Boolean)
	async deleteSavedItem(
		@Arg("input") input: DeleteSavedItemInput,
		@Ctx() ctx: CustomContext
	) {
		const { id, audioItemId } = input;

		if (!id && !audioItemId) {
			throw new Error(
				"Must provide either a SavedItem ID or the associated AudioItem ID"
			);
		}
		if (!ctx.userId) {
			throw new Error("Must be logged in to delete a saved item");
		}
		let savedItem: SavedItem | undefined;
		if (id) {
			savedItem = await SavedItem.findOne({
				where: { id },
				relations: ["user"],
			});
		} else if (audioItemId) {
			savedItem = await SavedItem.findOne({
				where: { audioItemId, userId: ctx.userId },
			});
		}
		if (!savedItem) {
			throw new Error("Could not find SavedItem");
		}

		await savedItem.remove();
		return true;
	}
}
