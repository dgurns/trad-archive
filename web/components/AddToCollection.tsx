import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import useCurrentUser from 'hooks/useCurrentUser';
import { AudioItem, CollectionEntry } from 'types';

const CREATE_COLLECTION_ENTRY_MUTATION = gql`
  mutation CreateCollectionEntry($input: CreateCollectionEntryInput!) {
    createCollectionEntry(input: $input) {
      id
    }
  }
`;

interface MutationData {
  createCollectionEntry: CollectionEntry;
}
interface MutationVariables {
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

  const [
    createCollectionEntry,
    { loading: createLoading, data: createData, error: createError },
  ] = useMutation<MutationData, MutationVariables>(
    CREATE_COLLECTION_ENTRY_MUTATION,
    { errorPolicy: 'all' }
  );

  const onClick = useCallback(() => {
    if (!user) {
      const redirectTo = `/entities/audio-items/${slug}`;
      router.push({
        pathname: '/login',
        query: { redirectTo },
      });
    } else {
      const input = {
        audioItemId: id,
      };
      createCollectionEntry({ variables: { input } });
    }
  }, [user, router, audioItem, createCollectionEntry]);

  useEffect(() => {
    // Refetch parent AudioItem
  }, [createData]);

  useEffect(() => {
    if (createError) {
      window.alert('Error adding to collection. Please try again.');
    }
  }, [createError]);

  return (
    <button
      className={`btn-secondary flex flex-row items-center ${
        isAddedToCollection ? 'text-gray-800' : ''
      }`}
      onClick={onClick}
      disabled={createLoading}
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
