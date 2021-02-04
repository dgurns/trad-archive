import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

import { EntityFragments } from 'fragments';
import Layout from 'components/Layout';
import LoadingBlock from 'components/LoadingBlock';

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

  const { data, error } = useQuery(PERSON_QUERY, {
    variables: { slug },
    skip: !slug,
  });

  let statusMessage;
  if (!data && !error) {
    statusMessage = <LoadingBlock />;
  } else if (error) {
    statusMessage = `Error fetching Person with slug ${slug}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  return (
    <Layout>
      <h1>Audio Items Tagged with "{data.person?.name}"</h1>
    </Layout>
  );
};

export default ViewPersonBySlug;
