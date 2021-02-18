import useAudioItems from 'hooks/useAudioItems';
import Layout from 'components/Layout';
import AudioItem from 'components/AudioItem';
import LoadingBlock from 'components/LoadingBlock';

export default function Home() {
  const [audioItems, { loading, error }, fetchNextPage] = useAudioItems();

  if (!audioItems && !error) {
    return (
      <Layout>
        <LoadingBlock />
      </Layout>
    );
  } else if (!audioItems && error) {
    return (
      <Layout>
        <div className="text-red-600">{error.message}</div>
      </Layout>
    );
  } else if (!audioItems?.length) {
    return (
      <Layout>
        <div className="text-gray-500">No Audio Items found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      {audioItems.map((audioItem, index) => (
        <AudioItem audioItem={audioItem} key={index} />
      ))}
      {!loading ? (
        <div className="flex flex-row justify-center">
          <button className="btn-text" onClick={fetchNextPage}>
            Load More
          </button>
        </div>
      ) : (
        <LoadingBlock />
      )}
    </Layout>
  );
}
