import Layout from 'components/Layout';
import RequireAdmin from 'components/RequireAdmin';
import CreateRelationshipForm from 'components/CreateRelationshipForm';

const NewAudioItem = () => {
  return (
    <Layout>
      <RequireAdmin>
        <div className="max-w-md">
          <CreateRelationshipForm />
        </div>
      </RequireAdmin>
    </Layout>
  );
};

export default NewAudioItem;
