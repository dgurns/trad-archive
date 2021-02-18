import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';

import { EntityFragments } from 'fragments';
import { Person } from 'types';
import useAudioItemsTaggedWithEntity from 'hooks/useAudioItemsTaggedWithEntity';

import Layout from 'components/Layout';
import LoadingBlock from 'components/LoadingBlock';
import AudioItemComponent from 'components/AudioItem';
import TagWithRelationshipToObject from 'components/TagWithRelationshipToObject';
import AddTag from 'components/AddTag';
import EditTags from 'components/EditTags';

const PERSON_QUERY = gql`
  query Person($slug: String!) {
    person(slug: $slug) {
      ...Person
    }
  }
  ${EntityFragments.person}
`;

const ViewPersonBySlug = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: personData, error: personError } = useQuery<{ person: Person }>(
    PERSON_QUERY,
    {
      variables: { slug },
      skip: !slug,
      fetchPolicy: 'cache-and-network',
    }
  );

  const [
    audioItems = [],
    { loading: audioItemsLoading, error: audioItemsError },
  ] = useAudioItemsTaggedWithEntity(personData?.person);

  let statusMessage;
  if (!personData && !personError) {
    statusMessage = <LoadingBlock />;
  } else if (!personData && personError) {
    statusMessage = `Error fetching Person with slug ${slug}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  const { person } = personData;
  const { name, entityType, aliases, description, tags } = person;

  return (
    <Layout>
      <div className="flex flex-row">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-4">Audio Items Tagged with "{name}"</h1>
          {audioItemsLoading && <LoadingBlock />}
          {audioItemsError && (
            <div className="text-red-600">Error fetching Audio Items</div>
          )}
          {audioItems.map((audioItem, index) => (
            <AudioItemComponent audioItem={audioItem} key={index} />
          ))}
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
          <div className="mb-4">
            Description:
            <br />
            <span className="text-gray-500">{description}</span>
          </div>
          <Link href={`/entities/people/${slug}/edit`}>Edit</Link>
          <h1 className="mt-8 mb-4">Tags</h1>
          {tags.map((tag, index) => (
            <TagWithRelationshipToObject
              tag={tag}
              key={index}
              className="mb-4"
            />
          ))}
          <div>
            <AddTag entity={person} className="mb-4" />
            <span className="text-gray-500 px-2">/</span>
            <EditTags entity={person} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewPersonBySlug;
