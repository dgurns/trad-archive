import Layout from 'components/Layout';
import RequireUser from 'components/RequireUser';
import CreateInstrumentEntityForm from 'components/CreateInstrumentEntityForm';

const EntitiesInstrumentNew = () => {
  return (
    <Layout>
      <RequireUser>
        <div className="max-w-md">
          <CreateInstrumentEntityForm />
        </div>
      </RequireUser>
    </Layout>
  );
};

export default EntitiesInstrumentNew;
