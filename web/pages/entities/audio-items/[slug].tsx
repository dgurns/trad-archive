import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

import { EntityFragments } from 'fragments';
import { AudioItem } from 'types';

import Layout from 'components/Layout';
import AudioItemComponent from 'components/AudioItem';
import LoadingBlock from 'components/LoadingBlock';
import AddTag from 'components/AddTag';
import EditTags from 'components/EditTags';
import TagWithRelationshipToObject from 'components/TagWithRelationshipToObject';

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

  const { data: audioItemData, error: audioItemError } = useQuery<{
    audioItem: AudioItem;
  }>(AUDIO_ITEM_QUERY, {
    variables: { slug },
    skip: !slug,
    fetchPolicy: 'cache-and-network',
  });

  let statusMessage;
  if (!audioItemData && !audioItemError) {
    statusMessage = <LoadingBlock />;
  } else if (!audioItemData && audioItemError) {
    statusMessage = `Error fetching Audio Item with slug ${slug}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  const { audioItem } = audioItemData;
  const { name, entityType, aliases, tags } = audioItem;

  return (
    <Layout>
      <div className="flex flex-row">
        <div className="flex flex-1 flex-col">
          <AudioItemComponent audioItem={audioItem} />
        </div>
        <div className="flex flex-col items-start ml-8 pl-8 w-1/4 border-l border-gray-300">
          <h1 className="mb-4">About {name}</h1>
          <div className="mb-4">
            Entity Type:
            <br />
            <span className="text-gray-500">{entityType}</span>
          </div>
          <div className="mb-4">
            Aliases:
            <br />
            <span className="text-gray-500">{aliases}</span>
          </div>
          <Link href={`/entities/audio-items/${slug}/edit`}>Edit</Link>
          <h1 className="mt-8 mb-4">Tags</h1>
          {tags.map((tag, index) => (
            <TagWithRelationshipToObject
              tag={tag}
              key={index}
              className="mb-4"
            />
          ))}
          <div>
            <AddTag entity={audioItem} className="mb-4" />
            <span className="text-gray-500 px-2">/</span>
            <EditTags entity={audioItem} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewAudioItemBySlug;
