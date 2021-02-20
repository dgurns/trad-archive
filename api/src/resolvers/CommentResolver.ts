import { Resolver, Mutation, Ctx, Arg, Query } from 'type-graphql';
import { getManager } from 'typeorm';
import { CustomContext } from 'middleware/context';
import { User } from 'entities/User';
import { CreateCommentInput } from 'resolvers/CommentResolverTypes';
import { AudioItem } from 'entities/AudioItem';
import { Comment } from 'entities/Comment';

@Resolver()
export class CommentResolver {
  @Query(() => Comment)
  commentsForAudioItem(@Arg('audioItemId') audioItemId: string) {
    return getManager()
      .createQueryBuilder(Comment, 'comment')
      .where(`comment.parentAudioItemId = :audioItemId`, {
        audioItemId,
      })
      .leftJoinAndSelect('comment.createdByUser', 'createdByUser')
      .orderBy('comment.createdAt', 'ASC')
      .getMany();
  }

  @Mutation(() => Comment)
  async createComment(
    @Arg('input') input: CreateCommentInput,
    @Ctx() ctx: CustomContext
  ) {
    const { parentAudioItemId, text } = input;

    if (!text) {
      throw new Error('Comment text cannot be empty');
    }
    const user = await User.findOne(ctx.userId);
    if (!user) {
      throw new Error('Must be logged in to create a Comment');
    }
    const parentAudioItem = await AudioItem.findOne(parentAudioItemId);
    if (!parentAudioItem) {
      throw new Error('Could not find an AudioItem with that ID');
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
