import { useState, useCallback, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

import { Comment, Entity, isAudioItem } from 'types';
import { CommentFragments } from 'fragments';
import useRequireLogin from 'hooks/useRequireLogin';
import EntityService from 'services/Entity';

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      ...Comment
    }
  }
  ${CommentFragments.comment}
`;

interface MutationData {
  createComment: Comment;
}
interface MutationVariables {
  input: {
    parentAudioItemId: string;
    text: string;
  };
}
interface Props {
  parentEntity: Entity;
  onSuccess?: (comment: Comment) => void;
}
const CreateCommentForm = ({ parentEntity, onSuccess }: Props) => {
  const { currentUser, requireLogin } = useRequireLogin();

  const [text, setText] = useState('');

  const [createComment, { loading, data, error }] = useMutation<
    MutationData,
    MutationVariables
  >(CREATE_COMMENT_MUTATION, { errorPolicy: 'all' });

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!currentUser) {
        const redirectTo = EntityService.makeHrefForView(parentEntity);
        return await requireLogin({ redirectTo });
      }

      let parentAudioItemId;
      if (isAudioItem(parentEntity)) {
        parentAudioItemId = parentEntity.id;
      }
      const input = { parentAudioItemId, text };
      createComment({ variables: { input } });
    },
    [createComment, parentEntity, text]
  );

  useEffect(() => {
    if (data?.createComment) {
      setText('');
      if (onSuccess) {
        onSuccess(data.createComment);
      }
    }
  }, [data]);

  return (
    <form onSubmit={onSubmit} className="w-full">
      <input
        type="text"
        placeholder="Add a comment..."
        autoFocus
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      {text.length > 0 && (
        <input
          className="btn mt-4 w-auto"
          type="submit"
          disabled={loading}
          value="Add Comment"
        />
      )}
      {error && <div className="text-red-600 mt-4">{error.message}</div>}
    </form>
  );
};

export default CreateCommentForm;
