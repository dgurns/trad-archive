import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";

import { CustomContext } from "middleware/context";
import { Tune } from "models/entities/Tune";
import { User } from "models/User";
import { UpdateTuneInput } from "resolvers/TuneResolverTypes";
import { entityRelationsForFind } from "resolvers/EntityResolver";
@Resolver()
export class TuneResolver {
	@Query(() => Tune, { nullable: true })
	tune(
		@Arg("id", { nullable: true }) id: string,
		@Arg("slug", { nullable: true }) slug: string
	) {
		if (!id && !slug) {
			throw new Error("Must provide an ID or slug");
		}
		const whereOptions = id ? { id } : { slug };
		return Tune.findOne({
			where: whereOptions,
			relations: entityRelationsForFind,
		});
	}

	@Query(() => [Tune])
	tunes(
		@Arg("take", { defaultValue: 20 }) take?: number,
		@Arg("skip", { defaultValue: 0 }) skip?: number
	) {
		return Tune.find({
			take,
			skip,
			order: { createdAt: "DESC" },
			relations: entityRelationsForFind,
		});
	}

	// We only allow updating the description of a Tune because the core data is
	// managed on TheSession
	@Mutation(() => Tune)
	async updateTune(
		@Arg("slug") slug: string,
		@Arg("input") input: UpdateTuneInput,
		@Ctx() ctx: CustomContext
	) {
		const { description } = input;

		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("You must be logged in to update a Tune");
		}

		const tune = await Tune.findOne(
			{ slug },
			{ relations: entityRelationsForFind }
		);
		if (!tune) {
			throw new Error("Could not find a Tune with that slug");
		}

		if (description) {
			tune.description = description;
		}

		tune.updatedByUser = user;
		await tune.save();
		return tune;
	}
}
