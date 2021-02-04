import Link from 'next/link';
import Layout from 'components/Layout';
import RequireAdmin from 'components/RequireAdmin';

const AdminHome = () => {
  return (
    <Layout>
      <RequireAdmin>
        <>
          <Link href="/entities/audio-items/new">
            <a className="block mb-2">Create Audio Item</a>
          </Link>
          <Link href="/entities/people/new">
            <a className="block mb-2">Create Person</a>
          </Link>
          <Link href="/entities/instruments/new">
            <a className="block mb-2">Create Instrument</a>
          </Link>
          <Link href="/relationships/new">
            <a className="block mb-2">Create Relationship</a>
          </Link>
        </>
      </RequireAdmin>
    </Layout>
  );
};

export default AdminHome;
