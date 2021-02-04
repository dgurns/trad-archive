import Layout from 'components/Layout';
import RequireUser from 'components/RequireUser';
import CreatePersonForm from 'components/CreatePersonForm';

const NewPerson = () => {
  return (
    <Layout>
      <RequireUser>
        <div className="max-w-md">
          <CreatePersonForm />
        </div>
      </RequireUser>
    </Layout>
  );
};

export default NewPerson;
