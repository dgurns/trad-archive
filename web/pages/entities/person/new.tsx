import Layout from 'components/Layout';
import RequireUser from 'components/RequireUser';
import CreatePersonEntityForm from 'components/CreatePersonEntityForm';

const EntitiesPersonNew = () => {
  return (
    <Layout>
      <RequireUser>
        <div className="max-w-md">
          <CreatePersonEntityForm />
        </div>
      </RequireUser>
    </Layout>
  );
};

export default EntitiesPersonNew;
