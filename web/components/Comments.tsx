import { useCallback } from 'react';
import Link from 'next/link';
import { useLazyQuery, gql } from '@apollo/client';

import { AudioItem, Comment, EntityType } from 'types';
import { CommentFragments } from 'fragments';
import DateTimeService from 'services/DateTime';

import CreateCommentForm from 'components/CreateCommentForm';
import LoadingCircle from 'components/LoadingCircle';

const COMMENTS_FOR_PARENT_ENTITY_QUERY = gql`
  query CommentsForParentEntity($input: CommentsForParentEntityInput!) {
    commentsForParentEntity(input: $input) {
      ...Comment
    }
  }
  ${CommentFragments.comment}
`;

interface QueryData {
  commentsForParentEntity: Comment[];
}
interface QueryVariables {
  input: {
    parentEntityType: EntityType;
    parentEntityId: string;
  };
}
interface Props {
  parentEntity: AudioItem; // Only AudioItems have comments for now
}
const Comments = ({ parentEntity }: Props) => {
  const { id, entityType, commentsCount } = parentEntity;

  const [
    getCommentsForParentEntity,
    { loading, data, error, refetch },
  ] = useLazyQuery<QueryData, QueryVariables>(
    COMMENTS_FOR_PARENT_ENTITY_QUERY,
    {
      fetchPolicy: 'cache-and-network',
    }
  );
  const comments = data?.commentsForParentEntity ?? [];

  const fetchComments = useCallback(() => {
    getCommentsForParentEntity({
      variables: {
        input: { parentEntityType: entityType, parentEntityId: id },
      },
    });
  }, [getCommentsForParentEntity]);

  const shouldShowViewCommentsButton = commentsCount > 0 && !data && !loading;

  return (
    <>
      {shouldShowViewCommentsButton && (
        <button className="btn-text mb-4" onClick={fetchComments}>
          View Comments ({commentsCount})
        </button>
      )}

      {error && <div className="text-red-600 mb-4">{error.message}</div>}

      {comments.map(({ createdByUser, createdAt, text }, index) => (
        <div className="mb-4 pl-2" key={index}>
          <div className="text-gray-500 text-sm mb-1">
            <Link href={`/users/${createdByUser.id}`}>
              {createdByUser.username}
            </Link>
            {' commented '}
            {DateTimeService.formatDateYearTime(createdAt)}
          </div>
          <div className="text-sm">{text}</div>
        </div>
      ))}

      {loading && <LoadingCircle className="mb-4" />}

      <CreateCommentForm
        parentEntity={parentEntity}
        onSuccess={fetchComments}
      />
    </>
  );
};

export default Comments;
