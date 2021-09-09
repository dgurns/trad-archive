import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import { In } from "typeorm";

import { Tune } from "models/entities/Tune";
import { Tag } from "models/Tag";
@Resolver(() => Tune)
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
		});
	}

	@FieldResolver(() => [Tag])
	tags(@Root() tune: Tune) {
		return Tag.find({
			where: { subjectTuneId: In([tune.id]) },
		});
	}
}
