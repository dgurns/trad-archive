import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';

import useCurrentUser from 'hooks/useCurrentUser';
import useAudioItem from 'hooks/useAudioItem';
import useCollectionEntriesForUser from 'hooks/useCollectionEntriesForUser';
import { AudioItem, CollectionEntry } from 'types';

const CREATE_COLLECTION_ENTRY_MUTATION = gql`
  mutation CreateCollectionEntry($input: CreateCollectionEntryInput!) {
    createCollectionEntry(input: $input) {
      id
    }
  }
`;
const DELETE_COLLECTION_ENTRY_MUTATION = gql`
  mutation DeleteCollectionEntry($input: DeleteCollectionEntryInput!) {
    deleteCollectionEntry(input: $input)
  }
`;

interface CreateMutationData {
  createCollectionEntry: CollectionEntry;
}
interface CreateMutationVariables {
  input: {
    audioItemId: string;
  };
}
interface DeleteMutationData {
  deleteCollectionEntry: boolean;
}
interface DeleteMutationVariables {
  input: {
    audioItemId: string;
  };
}
interface Props {
  audioItem: AudioItem;
}
const AddToCollection = ({ audioItem }: Props) => {
  const { id, slug, isAddedToCollection } = audioItem;

  const router = useRouter();
  const [user] = useCurrentUser();
  const [, { refetch: refetchParentAudioItem }] = useAudioItem({ slug });
  const [
    ,
    { refetch: refetchCollectionEntriesForUser },
  ] = useCollectionEntriesForUser();

  const [
    createCollectionEntry,
    { loading: createLoading, data: createData, error: createError },
  ] = useMutation<CreateMutationData, CreateMutationVariables>(
    CREATE_COLLECTION_ENTRY_MUTATION,
    { errorPolicy: 'all' }
  );
  const [
    deleteCollectionEntry,
    { loading: deleteLoading, data: deleteData, error: deleteError },
  ] = useMutation<DeleteMutationData, DeleteMutationVariables>(
    DELETE_COLLECTION_ENTRY_MUTATION,
    { errorPolicy: 'all' }
  );

  const onButtonClicked = useCallback(() => {
    if (!user) {
      router.push({
        pathname: '/login',
        query: {
          redirectTo: `/entities/audio-items/${slug}`,
        },
      });
    } else if (!isAddedToCollection) {
      createCollectionEntry({
        variables: {
          input: { audioItemId: id },
        },
      });
    } else if (isAddedToCollection) {
      deleteCollectionEntry({
        variables: {
          input: { audioItemId: id },
        },
      });
    }
  }, [
    user,
    router,
    audioItem,
    id,
    createCollectionEntry,
    deleteCollectionEntry,
  ]);

  useEffect(() => {
    if (createData) {
      refetchParentAudioItem();
      refetchCollectionEntriesForUser();
    }
  }, [createData, refetchParentAudioItem, refetchCollectionEntriesForUser]);
  useEffect(() => {
    if (createError) {
      window.alert('Error adding to collection. Please try again.');
    }
  }, [createError]);

  useEffect(() => {
    if (deleteData) {
      refetchParentAudioItem();
      refetchCollectionEntriesForUser();
    }
  }, [deleteData, refetchParentAudioItem, refetchCollectionEntriesForUser]);
  useEffect(() => {
    if (deleteError) {
      window.alert('Error removing from collection. Please try again.');
    }
  }, [deleteError]);

  return (
    <button
      className={`btn-secondary ${
        isAddedToCollection ? 'btn-secondary-active' : ''
      } pl-0.5`}
      onClick={onButtonClicked}
      disabled={createLoading || deleteLoading}
    >
      {isAddedToCollection ? (
        <>
          <i className="material-icons">bookmark</i>
          Added<span className="hidden md:block md:pl-1">to Collection</span>
        </>
      ) : (
        <>
          <i className="material-icons">bookmark_border</i>
          Add<span className="hidden md:block md:pl-1">to Collection</span>
        </>
      )}
    </button>
  );
};

export default AddToCollection;
