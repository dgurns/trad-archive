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
import { getManager, getRepository } from "typeorm";

import { CustomContext } from "middleware/context";
import { AudioItem } from "models/entities/AudioItem";
import { Comment } from "models/Comment";
import { CollectionEntry } from "models/CollectionEntry";
import { User, UserPermission } from "models/User";
import {
	AudioItemsInput,
	AudioItemsTaggedWithEntityInput,
	AudioItemsCreatedByUserInput,
	CreateAudioItemInput,
	UpdateAudioItemInput,
} from "resolvers/AudioItemResolverTypes";
import { entityRelationsForFind } from "resolvers/EntityResolver";
import EntityService from "services/Entity";
import { EntityStatus } from "models/entities/base";

@Resolver(() => AudioItem)
export class AudioItemResolver {
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
	async isAddedToCollection(
		@Root() audioItem: AudioItem,
		@Ctx() ctx: CustomContext
	) {
		if (!ctx.userId) {
			return false;
		}
		const existingCollectionEntry = await getManager()
			.createQueryBuilder(CollectionEntry, "collectionEntry")
			.where("collectionEntry.userId = :userId", { userId: ctx.userId })
			.andWhere("collectionEntry.audioItemId = :audioItemId", {
				audioItemId: audioItem.id,
			})
			.getRawOne();
		return Boolean(existingCollectionEntry);
	}

	@Query(() => AudioItem, { nullable: true })
	audioItem(
		@Arg("id", { nullable: true }) id: string,
		@Arg("slug", { nullable: true }) slug: string
	) {
		if (!id && !slug) {
			throw new Error("Must search by an ID or slug");
		}

		const whereOptions = id ? { id } : { slug };
		return AudioItem.findOne({
			where: whereOptions,
			relations: entityRelationsForFind,
		});
	}

	@Query(() => [AudioItem])
	async audioItems(@Arg("input") input: AudioItemsInput) {
		const { take, skip, status } = input;

		type AudioItemsWhereOptions = {
			status?: EntityStatus;
		};
		const whereOptions: AudioItemsWhereOptions = {};
		if (status) {
			whereOptions.status = status;
		}
		const audioItems = await AudioItem.find({
			where: whereOptions,
			take,
			skip,
			order: { createdAt: "DESC" },
			relations: entityRelationsForFind,
		});
		return audioItems;
	}

	@Query(() => [AudioItem])
	async audioItemsTaggedWithEntity(
		@Arg("input") input: AudioItemsTaggedWithEntityInput
	) {
		const { entityType, entityId, take, skip } = input;

		const query = getManager()
			.createQueryBuilder(AudioItem, "audioItem")
			.leftJoinAndSelect("audioItem.createdByUser", "createdByUser")
			.leftJoinAndSelect("audioItem.updatedByUser", "updatedByUser")
			.innerJoinAndSelect(
				"audioItem.tags",
				"relevantTag",
				`relevantTag.object${entityType}Id = :entityId`,
				{ entityId }
			)
			.leftJoinAndSelect("audioItem.tags", "tag")
			.leftJoinAndSelect("tag.relationship", "tagRelationship")
			.leftJoinAndSelect("tag.subjectAudioItem", "tagAudioItem")
			.leftJoinAndSelect("tag.objectPerson", "tagObjectPerson")
			.leftJoinAndSelect("tag.objectInstrument", "tagObjectInstrument")
			.leftJoinAndSelect("tag.objectPlace", "tagObjectPlace")
			.leftJoinAndSelect("tag.objectAudioItem", "tagObjectAudioItem")
			.orderBy("relevantTag.createdAt", "DESC");
		if (take) {
			query.take(take);
		}
		if (skip) {
			query.skip(skip);
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
			.leftJoinAndSelect("audioItem.tags", "tag")
			.leftJoinAndSelect("tag.relationship", "tagRelationship")
			.leftJoinAndSelect("tag.objectPerson", "tagObjectPerson")
			.leftJoinAndSelect("tag.objectInstrument", "tagObjectInstrument")
			.leftJoinAndSelect("tag.objectPlace", "tagObjectPlace")
			.leftJoinAndSelect("tag.objectAudioItem", "tagObjectAudioItem")
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

		const audioItem = await AudioItem.findOne(
			{ slug },
			{ relations: entityRelationsForFind }
		);
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
}
