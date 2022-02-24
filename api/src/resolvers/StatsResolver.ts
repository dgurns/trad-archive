import { Resolver, Int, Query, ObjectType, Field } from "type-graphql";
import { getManager } from "typeorm";
import { AudioItem } from "../models/entities/AudioItem";
import { Tag } from "../models/Tag";
import { User } from "../models/User";

@ObjectType()
class Stats {
	@Field(() => Int)
	numAudioItemsAllTime!: number;

	@Field(() => Int)
	numTagsAllTime!: number;

	@Field(() => Int)
	numUsersAllTime!: number;
}

@Resolver()
export class StatsResolver {
	@Query(() => Stats)
	async stats() {
		const [numAudioItemsAllTime, numTagsAllTime, numUsersAllTime] =
			await Promise.all<number>([
				getManager().createQueryBuilder(AudioItem, "audioItem").getCount(),
				getManager().createQueryBuilder(Tag, "tag").getCount(),
				getManager().createQueryBuilder(User, "user").getCount(),
			]);
		return {
			numAudioItemsAllTime,
			numTagsAllTime,
			numUsersAllTime,
		};
	}
}
