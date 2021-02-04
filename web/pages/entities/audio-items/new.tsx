import { useRouter } from 'next/router';
import { AudioItem } from 'types';
import Layout from 'components/Layout';
import RequireAdmin from 'components/RequireAdmin';
import CreateAudioItemForm from 'components/CreateAudioItemForm';

const NewAudioItem = () => {
  const router = useRouter();

  const onCreateSuccess = (audioItem: AudioItem) => {
    router.push(`/entities/audio-items/${audioItem.slug}`);
  };

  return (
    <Layout>
      <RequireAdmin>
        <div className="max-w-md">
          <CreateAudioItemForm onSuccess={onCreateSuccess} />
        </div>
      </RequireAdmin>
    </Layout>
  );
};

export default NewAudioItem;
