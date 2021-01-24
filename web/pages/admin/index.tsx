import Link from 'next/link';
import Layout from 'components/Layout';
import RequireAdmin from 'components/RequireAdmin';

const AdminHome = () => {
  return (
    <Layout>
      <RequireAdmin>
        <Link href="/items/audio/new">Create Audio Item</Link>
      </RequireAdmin>
    </Layout>
  );
};

export default AdminHome;
