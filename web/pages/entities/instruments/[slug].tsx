import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';

import { EntityFragments } from 'fragments';
import { Instrument } from 'types';
import useAudioItemsTaggedWithEntity from 'hooks/useAudioItemsTaggedWithEntity';

import Layout from 'components/Layout';
import LoadingBlock from 'components/LoadingBlock';
import LoadingCircle from 'components/LoadingCircle';
import AudioItemComponent from 'components/AudioItem';
import AddTag from 'components/AddTag';
import EditTags from 'components/EditTags';
import TagWithRelationshipToObject from 'components/TagWithRelationshipToObject';

const INSTRUMENT_QUERY = gql`
  query Instrument($slug: String!) {
    instrument(slug: $slug) {
      ...Instrument
    }
  }
  ${EntityFragments.instrument}
`;

const ViewInstrumentBySlug = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: instrumentData, error: instrumentError } = useQuery<{
    instrument: Instrument;
  }>(INSTRUMENT_QUERY, {
    variables: { slug },
    skip: !slug,
    fetchPolicy: 'cache-and-network',
  });

  const [
    audioItems = [],
    { loading: audioItemsLoading, error: audioItemsError },
    fetchNextPageOfAudioItems,
  ] = useAudioItemsTaggedWithEntity({ entity: instrumentData?.instrument });

  let statusMessage;
  if (!instrumentData && !instrumentError) {
    statusMessage = <LoadingBlock />;
  } else if (!instrumentData && instrumentError) {
    statusMessage = `Error fetching Instrument with slug ${slug}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  const { instrument } = instrumentData;
  const {
    name,
    entityType,
    aliases,
    description,
    tags,
  } = instrumentData.instrument;

  const shouldShowAudioItems = audioItems.length > 0;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-1 flex-col pb-8">
          <h1 className="mb-4">Audio Items Tagged with "{name}"</h1>
          {shouldShowAudioItems && (
            <>
              {audioItems.map((audioItem, index) => (
                <AudioItemComponent audioItem={audioItem} key={index} />
              ))}
              {!audioItemsLoading && (
                <button
                  className="btn-text"
                  onClick={fetchNextPageOfAudioItems}
                >
                  Load More
                </button>
              )}
            </>
          )}
          {audioItemsLoading && <LoadingBlock />}
          {audioItemsError && (
            <div className="text-red-600">Error fetching Audio Items</div>
          )}
        </div>
        <div className="flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300">
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
          <div className="mb-4">
            Description:
            <br />
            <span className="text-gray-500">{description}</span>
          </div>
          <Link href={`/entities/instruments/${slug}/edit`}>Edit</Link>
          <h1 className="mt-8 mb-4">Tags</h1>
          {tags.map((tag, index) => (
            <TagWithRelationshipToObject
              tag={tag}
              key={index}
              className="mb-4"
            />
          ))}
          <div>
            <AddTag entity={instrument} />
            <span className="text-gray-500 px-2">/</span>
            <EditTags entity={instrument} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewInstrumentBySlug;
