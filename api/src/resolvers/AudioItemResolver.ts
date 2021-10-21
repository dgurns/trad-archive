import {
	Resolver,
	Query,
	Mutation,
	Ctx,
	Arg,
	Authorized,
	FieldResolver,
	Root,
	Int,
} from "type-graphql";
import { getManager, getRepository, In } from "typeorm";

import { CustomContext } from "middleware/context";
import { AudioItem } from "models/entities/AudioItem";
import { Comment } from "models/Comment";
import { SavedItem } from "models/SavedItem";
import { User, UserPermission } from "models/User";
import { Tag } from "models/Tag";
import {
	AudioItemsInput,
	AudioItemsTaggedWithEntityInput,
	AudioItemsCreatedByUserInput,
	CreateAudioItemInput,
	UpdateAudioItemInput,
} from "resolvers/AudioItemResolverTypes";
import EntityService from "services/Entity";
import { EntityStatus } from "models/entities/base";
import { SortBy } from "./commonTypes";

@Resolver(() => AudioItem)
export class AudioItemResolver {
	@Query(() => AudioItem, { nullable: true })
	async audioItem(
		@Arg("id", { nullable: true }) id: string,
		@Arg("slug", { nullable: true }) slug: string
	) {
		if (!id && !slug) {
			throw new Error("Must search by an ID or slug");
		}

		const whereOptions = id ? { id } : { slug };
		return AudioItem.findOne({
			where: whereOptions,
		});
	}

	@Query(() => AudioItem, { nullable: true })
	audioItemRandom() {
		return getManager()
			.createQueryBuilder(AudioItem, "a")
			.leftJoinAndSelect("a.createdByUser", "createdByUser")
			.leftJoinAndSelect("a.updatedByUser", "updatedByUser")
			.orderBy("RANDOM()")
			.getOne();
	}

	@Query(() => [AudioItem])
	async audioItems(@Arg("input") input: AudioItemsInput) {
		const { take, skip, status, sortBy } = input;

		type AudioItemsWhereOptions = {
			status?: EntityStatus;
		};
		const whereOptions: AudioItemsWhereOptions = {};
		if (status) {
			whereOptions.status = status;
		}

		let audioItems: AudioItem[] = [];
		switch (sortBy) {
			case SortBy.RecentlyTagged:
				const results = await getManager()
					.createQueryBuilder(AudioItem, "a")
					.leftJoinAndSelect("a.createdByUser", "u")
					.innerJoin(Tag, "t", "a.id = t.subjectAudioItemId")
					.addSelect("max(t.createdAt)", "tc")
					.groupBy("a.id, u.id")
					.orderBy("tc", "DESC")
					.skip(skip)
					.take(take)
					.getMany();
				audioItems = results as AudioItem[];
				break;
			case SortBy.RecentlyAdded:
				audioItems = await AudioItem.find({
					where: whereOptions,
					take,
					skip,
					order: { createdAt: "DESC" },
				});
				break;
			default:
				break;
		}
		return audioItems;
	}

	@Query(() => [AudioItem])
	async audioItemsTaggedWithEntity(
		@Arg("input") input: AudioItemsTaggedWithEntityInput
	) {
		const { entityType, entityId, take, skip, sortBy } = input;

		const query = getManager()
			.createQueryBuilder(AudioItem, "audioItem")
			.leftJoinAndSelect("audioItem.createdByUser", "createdByUser")
			.leftJoinAndSelect("audioItem.updatedByUser", "updatedByUser")
			.innerJoinAndSelect(
				"audioItem.tags",
				"relevantTag",
				`relevantTag.object${entityType}Id = :entityId`,
				{ entityId }
			);
		if (take) {
			query.take(take);
		}
		if (skip) {
			query.skip(skip);
		}
		switch (sortBy) {
			case SortBy.RecentlyTagged:
				query.orderBy("relevantTag.createdAt", "DESC");
				break;
			case SortBy.RecentlyAdded:
				query.orderBy("audioItem.createdAt", "DESC");
				break;
			default:
				break;
		}
		return query.getMany();
	}

	@Query(() => [AudioItem])
	async audioItemsCreatedByUser(
		@Arg("input") input: AudioItemsCreatedByUserInput
	) {
		const { userId, take, skip } = input;

		const query = getManager()
			.createQueryBuilder(AudioItem, "audioItem")
			.innerJoinAndSelect(
				"audioItem.createdByUser",
				"createdByUser",
				"createdByUser.id = :userId",
				{ userId }
			)
			.leftJoinAndSelect("audioItem.updatedByUser", "updatedByUser")
			.orderBy("audioItem.createdAt", "DESC");
		if (take) {
			query.take(take);
		}
		if (skip) {
			query.skip(skip);
		}
		return query.getMany();
	}

	@Mutation(() => AudioItem)
	@Authorized(UserPermission.Admin)
	async createAudioItem(
		@Arg("input") input: CreateAudioItemInput,
		@Ctx() ctx: CustomContext
	) {
		const { name, slug, aliases, description, urlSource } = input;

		if (!name || !slug || !urlSource) {
			throw new Error(
				"A new Audio Item must have at least a name, slug, and URL source"
			);
		}
		if (!urlSource.includes("http")) {
			throw new Error("The source URL is invalid");
		}
		const createdByUser = await User.findOne({ where: { id: ctx.userId } });
		if (!createdByUser) {
			throw new Error("Error fetching the user who is adding the AudioItem");
		}

		const cleanedSlug = EntityService.cleanSlug(slug);
		const existingSlug = await AudioItem.findOne({
			where: { slug: cleanedSlug },
		});
		if (existingSlug) {
			throw new Error(
				"This URL slug has already been taken. Please pick another one."
			);
		}

		const audioItem = AudioItem.create({
			name,
			slug: cleanedSlug,
			aliases,
			description,
			urlSource,
			createdByUser,
		});
		await audioItem.save();
		return audioItem;
	}

	@Mutation(() => AudioItem)
	async updateAudioItem(
		@Arg("slug") slug: string,
		@Arg("input") input: UpdateAudioItemInput,
		@Ctx() ctx: CustomContext
	) {
		const { name, aliases, description } = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to update an AudioItem");
		}

		const audioItem = await AudioItem.findOne({ slug });
		if (!audioItem) {
			throw new Error("Could not find an AudioItem with that slug");
		}

		if (name) audioItem.name = name;
		if (aliases) audioItem.aliases = aliases;
		if (description) audioItem.description = description;

		audioItem.updatedByUser = user;
		await audioItem.save();
		return audioItem;
	}

	@FieldResolver(() => [Tag])
	tags(@Root() audioItem: AudioItem) {
		return Tag.find({
			where: { subjectAudioItemId: In([audioItem.id]) },
			order: { createdAt: "ASC" },
		});
	}

	@FieldResolver(() => [Comment])
	comments(@Root() audioItem: AudioItem) {
		return Comment.find({
			where: { parentAudioItemId: In([audioItem.id]) },
			order: { createdAt: "ASC" },
		});
	}

	@FieldResolver(() => Int)
	async commentsCount(@Root() audioItem: AudioItem) {
		const { count } = await getRepository(Comment)
			.createQueryBuilder("comment")
			.select("COUNT(id)")
			.where("comment.parentAudioItemId = :id", { id: audioItem.id })
			.getRawOne();
		return parseInt(count);
	}

	@FieldResolver(() => Boolean)
	async isSavedByUser(@Root() audioItem: AudioItem, @Ctx() ctx: CustomContext) {
		if (!ctx.userId) {
			return false;
		}
		const existingSavedItem = await getManager()
			.createQueryBuilder(SavedItem, "savedItem")
			.where("savedItem.userId = :userId", { userId: ctx.userId })
			.andWhere("savedItem.audioItemId = :audioItemId", {
				audioItemId: audioItem.id,
			})
			.getRawOne();
		return Boolean(existingSavedItem);
	}
}
