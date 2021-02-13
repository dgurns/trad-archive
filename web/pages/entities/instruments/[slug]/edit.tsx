import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

import { Instrument } from 'types';
import { EntityFragments } from 'fragments';

import Layout from 'components/Layout';
import LoadingBlock from 'components/LoadingBlock';
import RequireUser from 'components/RequireUser';
import EditInstrumentForm from 'components/EditInstrumentForm';

const INSTRUMENT_QUERY = gql`
  query Instrument($slug: String!) {
    instrument(slug: $slug) {
      ...Instrument
    }
  }
  ${EntityFragments.instrument}
`;

const EditInstrument = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useQuery(INSTRUMENT_QUERY, {
    variables: { slug },
    skip: !slug,
  });

  const onEditSuccess = (instrument: Instrument) => {
    router.push(`/entities/instruments/${instrument.slug}`);
  };

  let statusMessage;
  if (!data && !error) {
    statusMessage = <LoadingBlock />;
  } else if (!data && error) {
    statusMessage = `Error fetching Instrument with slug ${slug}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  const { instrument } = data;

  return (
    <Layout>
      <RequireUser>
        <div className="max-w-md">
          <h1 className="mb-4">Edit Instrument: {instrument.name}</h1>
          <EditInstrumentForm
            instrument={instrument}
            onSuccess={onEditSuccess}
          />
        </div>
      </RequireUser>
    </Layout>
  );
};

export default EditInstrument;
