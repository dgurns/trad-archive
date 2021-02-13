import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { AudioItem } from 'types';
import { EntityFragments } from 'fragments';

const UPDATE_AUDIO_ITEM_MUTATION = gql`
  mutation UpdateAudioItem($slug: String!, $input: UpdateAudioItemInput!) {
    updateAudioItem(slug: $slug, input: $input) {
      ...AudioItem
    }
  }
  ${EntityFragments.audioItem}
`;
interface UpdateAudioItemInput {
  name?: string;
  aliases?: string;
  description?: string;
}
interface Props {
  audioItem: AudioItem;
  onSuccess?: (audioItem: AudioItem) => void;
}
const EditAudioItemForm = ({ audioItem, onSuccess }: Props) => {
  const router = useRouter();

  const [updateAudioItem, { loading, error, data }] = useMutation<
    { updateAudioItem: AudioItem },
    { slug: string; input: UpdateAudioItemInput }
  >(UPDATE_AUDIO_ITEM_MUTATION, {
    errorPolicy: 'all',
  });

  const [name, setName] = useState(audioItem.name);
  const [aliases, setAliases] = useState(audioItem.aliases);
  const [description, setDescription] = useState(audioItem.description);

  const onUpdateAudioItem = (event) => {
    event.preventDefault();
    const input = {
      name,
      aliases,
      description,
    };
    updateAudioItem({ variables: { slug: audioItem.slug, input } });
  };

  useEffect(() => {
    if (data?.updateAudioItem) {
      if (onSuccess) {
        return onSuccess(data.updateAudioItem);
      }
      window.alert('AudioItem updated successfully!');
    }
  }, [data, router]);

  return (
    <>
      <div className="flex flex-col align-start">
        <form onSubmit={onUpdateAudioItem}>
          <input
            placeholder="First name"
            autoFocus
            className="mb-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            placeholder="Aliases"
            className="mb-2"
            value={aliases}
            onChange={(event) => setAliases(event.target.value)}
          />
          <div className="text-sm text-gray-400 mb-2 ml-2">
            A list of comma-separated aliases for this AudioItem. For example:{' '}
            <em>Finbarr and Brian, Finbarr '08 at Dolan's</em>
          </div>
          <textarea
            placeholder="Description"
            className="mb-2"
            value={description}
            rows={5}
            onChange={(event) => setDescription(event.target.value)}
          />
          <input
            type="submit"
            className="btn mb-4 w-auto"
            disabled={loading}
            value="Save"
          />
        </form>
      </div>

      {error && <div className="text-red-600">{error.message}</div>}
    </>
  );
};

export default EditAudioItemForm;
