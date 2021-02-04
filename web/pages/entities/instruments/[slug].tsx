import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

import { EntityFragments } from 'fragments';
import { Instrument } from 'types';
import Layout from 'components/Layout';
import LoadingBlock from 'components/LoadingBlock';

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

  const { data, error } = useQuery<{ instrument: Instrument }>(
    INSTRUMENT_QUERY,
    {
      variables: { slug },
      skip: !slug,
    }
  );

  let statusMessage;
  if (!data && !error) {
    statusMessage = <LoadingBlock />;
  } else if (error) {
    statusMessage = `Error fetching Instrument with slug ${slug}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  return (
    <Layout>
      <h1>Audio Items Tagged with "{data.instrument?.name}"</h1>
    </Layout>
  );
};

export default ViewInstrumentBySlug;
