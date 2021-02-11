import { useRouter } from 'next/router';

import { Instrument } from 'types';

import Layout from 'components/Layout';
import RequireUser from 'components/RequireUser';
import CreateInstrumentForm from 'components/CreateInstrumentForm';

const NewInstrument = () => {
  const router = useRouter();

  const onCreateSuccess = (instrument: Instrument) => {
    router.push(`/entities/instruments/${instrument.slug}`);
  };

  return (
    <Layout>
      <RequireUser>
        <div className="max-w-md">
          <h1 className="mb-4">Create Instrument</h1>
          <CreateInstrumentForm onSuccess={onCreateSuccess} />
        </div>
      </RequireUser>
    </Layout>
  );
};

export default NewInstrument;
