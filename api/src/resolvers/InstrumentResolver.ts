import {
	Resolver,
	Query,
	Mutation,
	Ctx,
	Arg,
	FieldResolver,
	Root,
} from "type-graphql";
import { FindManyOptions, In } from "typeorm";

import { CustomContext } from "../middleware/context";
import { Instrument } from "../models/entities/Instrument";
import { User } from "../models/User";
import { Tag } from "../models/Tag";
import {
	CreateInstrumentInput,
	InstrumentsInput,
	UpdateInstrumentInput,
} from "./InstrumentResolverTypes";
import { SortBy } from "./commonTypes";
import EntityService from "../services/Entity";

@Resolver(() => Instrument)
export class InstrumentResolver {
	@Query(() => Instrument, { nullable: true })
	instrument(
		@Arg("id", { nullable: true }) id: string,
		@Arg("slug", { nullable: true }) slug: string
	) {
		if (!id && !slug) {
			throw new Error("Must provide an ID or slug");
		}
		const whereOptions = id ? { id } : { slug };
		return Instrument.findOne({
			where: whereOptions,
		});
	}

	@Query(() => [Instrument])
	instruments(@Arg("input") input: InstrumentsInput) {
		const { take, skip, sortBy } = input;
		const options: FindManyOptions<Instrument> = {
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
		return Instrument.find(options);
	}

	@Mutation(() => Instrument)
	async createInstrument(
		@Arg("input") input: CreateInstrumentInput,
		@Ctx() ctx: CustomContext
	) {
		const { name, slug, aliases, description } = input;

		if (!name || !slug) {
			throw new Error("A new Instrument must have at least a name and slug");
		}
		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to create an Instrument");
		}

		const cleanedSlug = EntityService.cleanSlug(slug);
		const existingSlug = await Instrument.findOne({
			where: { slug: cleanedSlug },
		});
		if (existingSlug) {
			throw new Error(
				"This URL slug has already been taken. Please pick another one."
			);
		}

		const instrumentEntity = Instrument.create({
			name,
			slug: cleanedSlug,
			aliases,
			description,
			createdByUser: user,
			updatedByUser: user,
		});
		await instrumentEntity.save();
		return instrumentEntity;
	}

	@Mutation(() => Instrument)
	async updateInstrument(
		@Arg("slug") slug: string,
		@Arg("input") input: UpdateInstrumentInput,
		@Ctx() ctx: CustomContext
	) {
		const { name, aliases, description } = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to update an Instrument");
		}

		const instrument = await Instrument.findOne({ slug });
		if (!instrument) {
			throw new Error("Could not find an Instrument with that slug");
		}

		if (name) instrument.name = name;
		if (aliases) instrument.aliases = aliases;
		if (description) instrument.description = description;

		instrument.updatedByUser = user;
		await instrument.save();
		return instrument;
	}

	@FieldResolver(() => [Tag])
	tags(@Root() instrument: Instrument) {
		return Tag.find({
			where: {
				subjectInstrumentId: In([instrument.id]),
				// Don't return AudioItem tags here for efficiency reasons. Instead use
				// audioItemsTaggedWithEntity query.
				objectAudioItemId: null,
			},
		});
	}
}
