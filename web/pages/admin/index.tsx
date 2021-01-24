import Layout from 'components/Layout';
import RequireAdmin from 'components/RequireAdmin';

const AdminHome = () => {
  return (
    <Layout>
      <RequireAdmin>
        <div>Admin home</div>
      </RequireAdmin>
    </Layout>
  );
};

export default AdminHome;
