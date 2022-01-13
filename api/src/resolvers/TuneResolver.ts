import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import { FindManyOptions, In, getManager } from "typeorm";

import { Tune } from "../models/entities/Tune";
import { Tag } from "../models/Tag";
import { TunesInput } from "./TuneResolverTypes";
import { SortBy } from "./commonTypes";

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
	tunes(@Arg("input") input: TunesInput) {
		const { take, skip, sortBy } = input;

		let orderBy: string;
		let orderDirection: "ASC" | "DESC";
		switch (sortBy) {
			case SortBy.AToZ:
				orderBy = "t.name";
				orderDirection = "ASC";
				break;
			default:
				orderBy = "t.createdAt";
				orderDirection = "DESC";
		}
		const query = getManager()
			.createQueryBuilder(Tune, "t")
			.leftJoinAndSelect("t.createdByUser", "createdByUser")
			.leftJoinAndSelect("t.updatedByUser", "updatedByUser")
			.orderBy(orderBy, orderDirection);
		if (take) {
			query.take(take);
		}
		if (skip) {
			query.skip(skip);
		}
		return query.getMany();
	}

	@FieldResolver(() => [Tag])
	tags(@Root() tune: Tune) {
		return Tag.find({
			where: {
				subjectTuneId: In([tune.id]),
				// Don't return AudioItem tags here for efficiency reasons. Instead use
				// audioItemsTaggedWithEntity query.
				objectAudioItemId: null,
			},
		});
	}
}
