import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

import { EntityFragments } from 'fragments';
import { InstrumentEntity } from 'types';
import Layout from 'components/Layout';
import Loading from 'components/Loading';

const INSTRUMENT_ENTITY_QUERY = gql`
  query InstrumentEntity($slug: String!) {
    instrumentEntity(slug: $slug) {
      ...InstrumentEntity
    }
  }
  ${EntityFragments.instrumentEntity}
`;

const EntitiesInstrumentSlug = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useQuery<{ instrumentEntity: InstrumentEntity }>(
    INSTRUMENT_ENTITY_QUERY,
    {
      variables: { slug },
      skip: !slug,
    }
  );

  let statusMessage;
  if (!data && !error) {
    statusMessage = <Loading />;
  } else if (error) {
    statusMessage = `Error fetching Instrument Entity with slug ${slug}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  return (
    <Layout>
      <h1>Items Tagged with "{data.instrumentEntity?.name}"</h1>
    </Layout>
  );
};

export default EntitiesInstrumentSlug;
