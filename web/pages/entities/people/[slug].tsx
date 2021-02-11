import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';

import { EntityFragments } from 'fragments';
import useTagsForEntity from 'hooks/useTagsForEntity';
import { AudioItem } from 'types';

import Layout from 'components/Layout';
import LoadingBlock from 'components/LoadingBlock';
import AudioItemComponent from 'components/AudioItem';

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

  const { data: personData, error: personError } = useQuery(PERSON_QUERY, {
    variables: { slug },
    skip: !slug,
  });

  const [tagsForEntity, tagsForEntityQuery] = useTagsForEntity(
    personData?.person
  );

  const audioItems: AudioItem[] = useMemo(() => {
    if (!tagsForEntity) {
      return [];
    }
    let outputAudioItems: AudioItem[] = [];
    tagsForEntity.forEach((tag) => {
      if (Boolean(tag.subjectAudioItem)) {
        outputAudioItems.push(tag.subjectAudioItem);
      }
    });
    return outputAudioItems;
  }, [tagsForEntity]);
  const audioItemsLoading = tagsForEntityQuery.loading;
  const audioItemsError = tagsForEntityQuery.error;

  let statusMessage;
  if (!personData && !personError) {
    statusMessage = <LoadingBlock />;
  } else if (personError) {
    statusMessage = `Error fetching Person with slug ${slug}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  const { name, entityType, aliases, description } = personData.person;

  return (
    <Layout>
      <div className="flex flex-row">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-4">Audio Items Tagged with "{name}"</h1>
          {audioItemsLoading && <LoadingBlock />}
          {audioItemsError && (
            <div className="text-red-600">{audioItemsError.message}</div>
          )}
          {audioItems.map((audioItem, index) => (
            <AudioItemComponent audioItem={audioItem} key={index} />
          ))}
        </div>
        <div className="flex flex-col ml-8 pl-8 w-1/4 border-l border-gray-300">
          <h1 className="mb-4">About</h1>
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
        </div>
      </div>
    </Layout>
  );
};

export default ViewPersonBySlug;
