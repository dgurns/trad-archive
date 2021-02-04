import useAudioItems from 'hooks/useAudioItems';
import Layout from 'components/Layout';
import AudioItem from 'components/AudioItem';
import LoadingBlock from 'components/LoadingBlock';

export default function Home() {
  const [audioItems, { loading, error }] = useAudioItems();

  if (loading) {
    return (
      <Layout>
        <LoadingBlock />
      </Layout>
    );
  } else if (error) {
    return <Layout>{error.message}</Layout>;
  } else if (!audioItems) {
    return 'No Audio Items found';
  }

  return (
    <Layout>
      {audioItems.map((audioItem, index) => (
        <AudioItem audioItem={audioItem} key={index} />
      ))}
    </Layout>
  );
}
