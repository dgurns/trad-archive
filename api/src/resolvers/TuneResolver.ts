import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import { FindManyOptions, In } from "typeorm";

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
		const options: FindManyOptions<Tune> = {
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
		return Tune.find(options);
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
