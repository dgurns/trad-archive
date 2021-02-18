import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

import { AudioItem } from 'types';
import { EntityFragments } from 'fragments';

import Layout from 'components/Layout';
import LoadingBlock from 'components/LoadingBlock';
import RequireUser from 'components/RequireUser';
import EditAudioItemForm from 'components/EditAudioItemForm';

const AUDIO_ITEM_QUERY = gql`
  query AudioItem($slug: String!) {
    audioItem(slug: $slug) {
      ...AudioItem
    }
  }
  ${EntityFragments.audioItem}
`;

const EditAudioItem = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useQuery<{ audioItem?: AudioItem }>(
    AUDIO_ITEM_QUERY,
    {
      variables: { slug },
      skip: !slug,
    }
  );

  const onEditSuccess = (audioItem: AudioItem) => {
    router.push(`/entities/audio-items/${audioItem.slug}`);
  };

  let statusMessage;
  if (!data && !error) {
    statusMessage = <LoadingBlock />;
  } else if (!data && error) {
    statusMessage = `Error fetching AudioItem with slug ${slug}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  const { audioItem } = data;

  return (
    <Layout>
      <RequireUser>
        <div className="max-w-md">
          <h1 className="mb-4">Edit AudioItem: {audioItem.name}</h1>
          <EditAudioItemForm audioItem={audioItem} onSuccess={onEditSuccess} />
        </div>
      </RequireUser>
    </Layout>
  );
};

export default EditAudioItem;
