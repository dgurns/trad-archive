import {
	Resolver,
	Query,
	Mutation,
	Ctx,
	Arg,
	FieldResolver,
	Root,
} from "type-graphql";
import { In } from "typeorm";
import { CustomContext } from "middleware/context";
import { Instrument } from "models/entities/Instrument";
import { User } from "models/User";
import { Tag } from "models/Tag";
import {
	CreateInstrumentInput,
	UpdateInstrumentInput,
} from "resolvers/InstrumentResolverTypes";
import EntityService from "services/Entity";

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
	instruments(
		@Arg("take", { defaultValue: 20 }) take?: number,
		@Arg("skip", { defaultValue: 0 }) skip?: number
	) {
		return Instrument.find({
			take,
			skip,
			order: { createdAt: "DESC" },
		});
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
