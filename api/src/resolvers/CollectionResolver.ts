import {
	Resolver,
	Query,
	Mutation,
	Ctx,
	Arg,
	Root,
	FieldResolver,
} from "type-graphql";
import { FindManyOptions, In } from "typeorm";

import { CustomContext } from "../middleware/context";
import { Collection } from "../models/entities/Collection";
import { User } from "../models/User";
import { Tag } from "../models/Tag";
import {
	CollectionsInput,
	CreateCollectionInput,
	UpdateCollectionInput,
} from "./CollectionResolverTypes";
import { SortBy } from "./commonTypes";
import EntityService from "../services/Entity";

@Resolver(() => Collection)
export class CollectionResolver {
	@Query(() => Collection, { nullable: true })
	collection(
		@Arg("id", { nullable: true }) id: string,
		@Arg("slug", { nullable: true }) slug: string
	) {
		if (!id && !slug) {
			throw new Error("Must provide an ID or slug");
		}
		const whereOptions = id ? { id } : { slug };
		return Collection.findOne({
			where: whereOptions,
		});
	}

	@Query(() => [Collection])
	collections(@Arg("input") input: CollectionsInput) {
		const { take, skip, sortBy } = input;
		const options: FindManyOptions<Collection> = {
			take,
			skip,
			order: {},
		};
		switch (sortBy) {
			case SortBy.AToZ:
				if (options.order) {
					options.order.name = "ASC";
				}
				break;
			default:
				if (options.order) {
					options.order.createdAt = "DESC";
				}
		}
		return Collection.find(options);
	}

	@Mutation(() => Collection)
	async createCollection(
		@Arg("input") input: CreateCollectionInput,
		@Ctx() ctx: CustomContext
	) {
		const { name, slug, aliases, description } = input;

		if (!name || !slug) {
			throw new Error("A new Collection must have a name and slug");
		}
		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to create a Collection");
		}

		const cleanedSlug = EntityService.cleanSlug(slug);
		const existingSlug = await Collection.findOne({
			where: { slug: cleanedSlug },
		});
		if (existingSlug) {
			throw new Error(
				"This URL slug has already been taken. Please pick another one."
			);
		}

		const collection = Collection.create({
			name,
			slug: cleanedSlug,
			aliases,
			description,
			createdByUser: user,
			updatedByUser: user,
		});
		await collection.save();
		return collection;
	}

	@Mutation(() => Collection)
	async updateCollection(
		@Arg("slug") slug: string,
		@Arg("input") input: UpdateCollectionInput,
		@Ctx() ctx: CustomContext
	) {
		const { name, aliases, description } = input;

		if (!name) {
			throw new Error("A Collection must always have a name");
		}
		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to update a Collection");
		}

		const collection = await Collection.findOne({ slug });
		if (!collection) {
			throw new Error("Could not find a Collection with that slug");
		}

		collection.name = name;
		if (aliases) {
			collection.aliases = aliases;
		}
		if (description) {
			collection.description = description;
		}
		collection.updatedByUser = user;

		await collection.save();
		return collection;
	}

	@FieldResolver(() => [Tag])
	tags(@Root() collection: Collection) {
		return Tag.find({
			where: {
				subjectCollectionId: In([collection.id]),
				// Don't return AudioItem tags here for efficiency reasons. Instead use
				// audioItemsTaggedWithEntity query.
				objectAudioItemId: null,
			},
		});
	}
}
