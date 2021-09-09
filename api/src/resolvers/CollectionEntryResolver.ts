import { Resolver, Mutation, Ctx, Arg, Query } from "type-graphql";
import { CustomContext } from "middleware/context";
import { User } from "models/User";
import {
	CreateCollectionEntryInput,
	DeleteCollectionEntryInput,
} from "resolvers/CollectionEntryResolverTypes";
import { CollectionEntry } from "models/CollectionEntry";
import { AudioItem } from "models/entities/AudioItem";

@Resolver(() => CollectionEntry)
export class CollectionEntryResolver {
	@Query(() => [CollectionEntry])
	collectionEntriesForUser(@Ctx() ctx: CustomContext) {
		if (!ctx.userId) {
			throw new Error("Must be logged in to get CollectionEntries");
		}
		return CollectionEntry.find({
			where: { userId: ctx.userId },
			order: { createdAt: "DESC" },
		});
	}

	@Mutation(() => CollectionEntry)
	async createCollectionEntry(
		@Arg("input") input: CreateCollectionEntryInput,
		@Ctx() ctx: CustomContext
	) {
		const { audioItemId } = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("Must be logged in to create a CollectionEntry");
		}
		const audioItem = await AudioItem.findOne({ where: { id: audioItemId } });
		if (!audioItem) {
			throw new Error("Could not find an AudioItem with that ID");
		}

		const collectionEntry = CollectionEntry.create({
			audioItem,
			user,
		});
		await collectionEntry.save();
		return collectionEntry;
	}

	@Mutation(() => Boolean)
	async deleteCollectionEntry(
		@Arg("input") input: DeleteCollectionEntryInput,
		@Ctx() ctx: CustomContext
	) {
		const { id, audioItemId } = input;

		if (!id && !audioItemId) {
			throw new Error(
				"Must provide either a CollectionEntry ID or the associated AudioItem ID"
			);
		}
		if (!ctx.userId) {
			throw new Error("Must be logged in to delete a CollectionEntry");
		}
		let collectionEntry: CollectionEntry | undefined;
		if (id) {
			collectionEntry = await CollectionEntry.findOne({
				where: { id },
				relations: ["user"],
			});
		} else if (audioItemId) {
			collectionEntry = await CollectionEntry.findOne({
				where: { audioItemId, userId: ctx.userId },
			});
		}
		if (!collectionEntry) {
			throw new Error("Could not find CollectionEntry");
		}

		await collectionEntry.remove();
		return true;
	}
}
