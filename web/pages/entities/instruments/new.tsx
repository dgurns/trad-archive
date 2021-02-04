import Layout from 'components/Layout';
import RequireUser from 'components/RequireUser';
import CreateInstrumentForm from 'components/CreateInstrumentForm';

const NewInstrument = () => {
  return (
    <Layout>
      <RequireUser>
        <div className="max-w-md">
          <CreateInstrumentForm />
        </div>
      </RequireUser>
    </Layout>
  );
};

export default NewInstrument;
