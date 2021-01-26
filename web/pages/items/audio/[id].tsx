import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

import { ItemFragments } from 'fragments';
import Layout from 'components/Layout';
import Item from 'components/Item';

const AUDIO_ITEM_QUERY = gql`
  query AudioItem($id: String!) {
    audioItem(id: $id) {
      ...AudioItem
    }
  }
  ${ItemFragments.audioItem}
`;

const ItemsAudioId = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useQuery(AUDIO_ITEM_QUERY, {
    variables: { id },
    skip: !id,
  });

  let statusMessage;
  if (!data && !error) {
    statusMessage = 'Loading...';
  } else if (error) {
    statusMessage = `Error fetching Audio Item with ID ${id}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  return (
    <Layout>
      <Item item={data.audioItem} />
    </Layout>
  );
};

export default ItemsAudioId;
