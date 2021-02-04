import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

import { EntityFragments } from 'fragments';
import Layout from 'components/Layout';
import AudioItem from 'components/AudioItem';
import LoadingBlock from 'components/LoadingBlock';

const AUDIO_ITEM_QUERY = gql`
  query AudioItem($slug: String!) {
    audioItem(slug: $slug) {
      ...AudioItem
    }
  }
  ${EntityFragments.audioItem}
`;

const ViewAudioItemBySlug = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useQuery(AUDIO_ITEM_QUERY, {
    variables: { slug },
    skip: !slug,
  });

  let statusMessage;
  if (!data && !error) {
    statusMessage = <LoadingBlock />;
  } else if (error) {
    statusMessage = `Error fetching Audio Item with slug ${slug}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  return (
    <Layout>
      <AudioItem audioItem={data.audioItem} />
    </Layout>
  );
};

export default ViewAudioItemBySlug;
