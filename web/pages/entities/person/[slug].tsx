import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

import { EntityFragments } from 'fragments';
import Layout from 'components/Layout';
import Loading from 'components/Loading';

const PERSON_ENTITY_QUERY = gql`
  query PersonEntity($slug: String!) {
    personEntity(slug: $slug) {
      ...PersonEntity
    }
  }
  ${EntityFragments.personEntity}
`;

const EntitiesPersonSlug = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useQuery(PERSON_ENTITY_QUERY, {
    variables: { slug },
    skip: !slug,
  });

  let statusMessage;
  if (!data && !error) {
    statusMessage = <Loading />;
  } else if (error) {
    statusMessage = `Error fetching Person Entity with slug ${slug}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  return (
    <Layout>
      <h1>Items Tagged with "{data.personEntity?.name}"</h1>
    </Layout>
  );
};

export default EntitiesPersonSlug;
