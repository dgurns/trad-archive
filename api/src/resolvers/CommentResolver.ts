import { Resolver, Mutation, Ctx, Arg, Query } from "type-graphql";
import { getManager } from "typeorm";
import { CustomContext } from "middleware/context";
import { User } from "models/User";
import {
	CommentsInput,
	CommentsForParentEntityInput,
	CreateCommentInput,
} from "resolvers/CommentResolverTypes";
import { AudioItem } from "models/entities/AudioItem";
import { Comment } from "models/Comment";

@Resolver()
export class CommentResolver {
	@Query(() => [Comment])
	comments(@Arg("input") input: CommentsInput) {
		const { take, skip } = input;
		return getManager()
			.createQueryBuilder(Comment, "comment")
			.leftJoinAndSelect("comment.parentAudioItem", "parentAudioItem")
			.leftJoinAndSelect("comment.createdByUser", "createdByUser")
			.orderBy("comment.createdAt", "DESC")
			.take(take)
			.skip(skip)
			.getMany();
	}

	@Query(() => [Comment])
	commentsForParentEntity(@Arg("input") input: CommentsForParentEntityInput) {
		const { parentEntityType, parentEntityId } = input;

		return getManager()
			.createQueryBuilder(Comment, "comment")
			.where(`comment.parent${parentEntityType}Id = :id`, {
				id: parentEntityId,
			})
			.leftJoinAndSelect("comment.createdByUser", "createdByUser")
			.orderBy("comment.createdAt", "ASC")
			.getMany();
	}

	@Mutation(() => Comment)
	async createComment(
		@Arg("input") input: CreateCommentInput,
		@Ctx() ctx: CustomContext
	) {
		const { parentAudioItemId, text } = input;

		if (!text) {
			throw new Error("Comment text cannot be empty");
		}
		const user = await User.findOne({ where: { id: ctx.userId } });
		if (!user) {
			throw new Error("Must be logged in to create a Comment");
		}
		const parentAudioItem = await AudioItem.findOne({
			where: { id: parentAudioItemId },
		});
		if (!parentAudioItem) {
			throw new Error("Could not find an AudioItem with that ID");
		}

		const comment = Comment.create({
			parentAudioItem,
			text,
			createdByUser: user,
		});
		await comment.save();
		return comment;
	}
}
