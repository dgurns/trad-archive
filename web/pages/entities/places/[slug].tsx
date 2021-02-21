import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';

import { EntityFragments } from 'fragments';
import { Place } from 'types';
import useAudioItemsTaggedWithEntity from 'hooks/useAudioItemsTaggedWithEntity';

import Layout from 'components/Layout';
import LoadingBlock from 'components/LoadingBlock';
import AudioItemComponent from 'components/AudioItem';
import TagWithRelationshipToObject from 'components/TagWithRelationshipToObject';
import AddTag from 'components/AddTag';
import EditTags from 'components/EditTags';

const PLACE_QUERY = gql`
  query Place($slug: String!) {
    place(slug: $slug) {
      ...Place
    }
  }
  ${EntityFragments.place}
`;

const ViewPlaceBySlug = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: placeData, error: placeError } = useQuery<{ place: Place }>(
    PLACE_QUERY,
    {
      variables: { slug },
      skip: !slug,
      fetchPolicy: 'cache-and-network',
    }
  );

  const [
    audioItems = [],
    { loading: audioItemsLoading, error: audioItemsError },
    fetchNextPageOfAudioItems,
  ] = useAudioItemsTaggedWithEntity({ entity: placeData?.place });

  let statusMessage;
  if (!placeData && !placeError) {
    statusMessage = <LoadingBlock />;
  } else if (!placeData && placeError) {
    statusMessage = `Error fetching Place with slug ${slug}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  const { place } = placeData;
  const {
    name,
    entityType,
    aliases,
    description,
    tags,
    latitude,
    longitude,
  } = place;

  const shouldShowAudioItems = audioItems.length > 0;
  const noAudioItemsFound =
    !audioItemsLoading && !audioItemsError && audioItems.length === 0;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-1 flex-col mb-8">
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
          {noAudioItemsFound && <div className="text-gray-500">None yet</div>}
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
            Latitude and Longitude:
            <br />
            <span className="text-gray-500">
              {latitude},{longitude}
            </span>
            <br />
            <a
              href={`https://www.google.com/maps/@?api=1&map_action=map&zoom=12&center=${latitude},${longitude}`}
              target="_blank"
            >
              View on Map
            </a>
          </div>
          <div className="mb-4">
            Description:
            <br />
            <span className="text-gray-500">{description}</span>
          </div>
          <Link href={`/entities/places/${slug}/edit`}>Edit</Link>
          <h1 className="mt-8 mb-4">Tags</h1>
          {tags.map((tag, index) => (
            <TagWithRelationshipToObject
              tag={tag}
              key={index}
              className="mb-4"
            />
          ))}
          <div>
            <AddTag entity={place} />
            {tags.length > 0 && (
              <>
                <span className="text-gray-500 px-2">/</span>
                <EditTags entity={place} />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewPlaceBySlug;
