import { Resolver, Query, Arg } from "type-graphql";

import { Tune } from "models/entities/Tune";
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
}
