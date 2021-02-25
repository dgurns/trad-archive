import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';

import useCurrentUser from 'hooks/useCurrentUser';
import useAudioItem from 'hooks/useAudioItem';
import useCollectionEntriesForUser from 'hooks/useCollectionEntriesForUser';
import { AudioItem, CollectionEntry } from 'types';
import { apolloClient } from 'apolloClient';

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
    { data: createData, error: createError },
  ] = useMutation<CreateMutationData, CreateMutationVariables>(
    CREATE_COLLECTION_ENTRY_MUTATION,
    { errorPolicy: 'all' }
  );
  const [
    deleteCollectionEntry,
    { data: deleteData, error: deleteError },
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
      // Optimistically update to true, then create
      apolloClient.cache.modify({
        id: `AudioItem:${id}`,
        fields: {
          isAddedToCollection() {
            return true;
          },
        },
      });
      createCollectionEntry({
        variables: {
          input: { audioItemId: id },
        },
      });
    } else if (isAddedToCollection) {
      // Optimistically update to false, then delete
      apolloClient.cache.modify({
        id: `AudioItem:${id}`,
        fields: {
          isAddedToCollection() {
            return false;
          },
        },
      });
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
      refetchCollectionEntriesForUser();
    }
  }, [createData]);
  useEffect(() => {
    if (createError) {
      refetchParentAudioItem();
      window.alert('Error adding to collection. Please try again.');
    }
  }, [createError]);

  useEffect(() => {
    if (deleteData) {
      refetchCollectionEntriesForUser();
    }
  }, [deleteData]);
  useEffect(() => {
    if (deleteError) {
      refetchParentAudioItem();
      window.alert('Error removing from collection. Please try again.');
    }
  }, [deleteError]);

  return (
    <button
      className={`btn-secondary flex flex-row items-center ${
        isAddedToCollection ? 'text-gray-800' : ''
      }`}
      onClick={onButtonClicked}
    >
      {isAddedToCollection ? (
        <>
          <i className="material-icons mb-1">done</i>
          Added to Collection
        </>
      ) : (
        <>
          <i className="material-icons mb-0.5">add</i>
          Add to Collection
        </>
      )}
    </button>
  );
};

export default AddToCollection;
