import { useRouter } from 'next/router';
import { AudioItem } from 'types';

import useAudioItems from 'hooks/useAudioItems';

import Layout from 'components/Layout';
import RequireAdmin from 'components/RequireAdmin';
import CreateAudioItemForm from 'components/CreateAudioItemForm';

const NewAudioItem = () => {
  const router = useRouter();
  const [_, { refetch }] = useAudioItems();

  const onCreateSuccess = async (audioItem: AudioItem) => {
    await refetch();
    router.push(`/entities/audio-items/${audioItem.slug}`);
  };

  return (
    <Layout>
      <RequireAdmin>
        <div className="max-w-md">
          <h1 className="mb-4">Create Audio Item</h1>
          <CreateAudioItemForm onSuccess={onCreateSuccess} />
        </div>
      </RequireAdmin>
    </Layout>
  );
};

export default NewAudioItem;
