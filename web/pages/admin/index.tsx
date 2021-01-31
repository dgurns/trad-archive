import Link from 'next/link';
import Layout from 'components/Layout';
import RequireAdmin from 'components/RequireAdmin';

const AdminHome = () => {
  return (
    <Layout>
      <RequireAdmin>
        <>
          <Link href="/items/audio/new">
            <a className="block mb-2">Create Audio Item</a>
          </Link>
          <Link href="/entities/person/new">
            <a className="block mb-2">Create Person Entity</a>
          </Link>
          <Link href="/entities/instrument/new">
            <a className="block mb-2">Create Instrument Entity</a>
          </Link>
        </>
      </RequireAdmin>
    </Layout>
  );
};

export default AdminHome;
