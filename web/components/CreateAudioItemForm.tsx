import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { AudioItem } from 'types';

const CREATE_AUDIO_ITEM_MUTATION = gql`
  mutation CreateAudioItem(
    $title: String!
    $urlSource: String!
    $description: String
  ) {
    createAudioItem(
      title: $title
      urlSource: $urlSource
      description: $description
    ) {
      id
    }
  }
`;

interface Props {
  onSuccess?: (audioItem: AudioItem) => void;
}
interface MutationData {
  createAudioItem: AudioItem;
}

const CreateAudioItemForm = ({ onSuccess }: Props) => {
  const router = useRouter();

  const [createAudioItem, { loading, error, data }] = useMutation<MutationData>(
    CREATE_AUDIO_ITEM_MUTATION,
    { errorPolicy: 'all' }
  );

  const [title, setTitle] = useState('');
  const [urlSource, setUrlSource] = useState('');
  const [description, setDescription] = useState('');

  const onCreateAudioItem = (event) => {
    event.preventDefault();
    createAudioItem({ variables: { title, urlSource, description } });
  };

  useEffect(() => {
    if (data?.createAudioItem) {
      if (onSuccess) {
        return onSuccess(data.createAudioItem);
      }
      window.alert('Audio Item created successfully!');
      setTitle('');
      setUrlSource('');
      setDescription('');
    }
  }, [data, router]);

  return (
    <>
      <h1 className="mb-4">Create Audio Item</h1>
      <div className="flex flex-col align-start">
        <form onSubmit={onCreateAudioItem}>
          <input
            placeholder="Title"
            autoFocus
            className="mb-2"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            placeholder="URL of Source File (ie. https://www.example.com/file.mp3)"
            className="mb-2"
            value={urlSource}
            onChange={(event) => setUrlSource(event.target.value)}
          />
          <textarea
            placeholder="Description"
            className="mb-2"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <input
            type="submit"
            className="btn mb-4 w-auto"
            disabled={loading}
            value="Create"
          />
        </form>
      </div>

      {error && <div className="text-red-600 mb-4">{error.message}</div>}
    </>
  );
};

export default CreateAudioItemForm;
