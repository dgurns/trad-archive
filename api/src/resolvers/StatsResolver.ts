import { Resolver, Int, Query, ObjectType, Field } from "type-graphql";
import { getManager } from "typeorm";
import { AudioItem } from "../models/entities/AudioItem";
import { Tag } from "../models/Tag";
import { Comment } from "../models/Comment";
import { User } from "../models/User";

@ObjectType()
class Stats {
	@Field(() => Int)
	numAudioItemsAllTime!: number;

	@Field(() => Int)
	numTagsAllTime!: number;

	@Field(() => Int)
	numCommentsAllTime!: number;

	@Field(() => Int)
	numUsersAllTime!: number;
}

@Resolver()
export class StatsResolver {
	@Query(() => Stats)
	async stats() {
		const [
			numAudioItemsAllTime,
			numTagsAllTime,
			numCommentsAllTime,
			numUsersAllTime,
		] = await Promise.all<number>([
			getManager().createQueryBuilder(AudioItem, "audioItem").getCount(),
			getManager().createQueryBuilder(Tag, "tag").getCount(),
			getManager().createQueryBuilder(Comment, "comment").getCount(),
			getManager().createQueryBuilder(User, "user").getCount(),
		]);
		return {
			numAudioItemsAllTime,
			numTagsAllTime,
			numCommentsAllTime,
			numUsersAllTime,
		};
	}
}
