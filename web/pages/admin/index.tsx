import Link from "next/link";
import Layout from "components/Layout";
import RequireAdmin from "components/RequireAdmin";

const AdminHome = () => {
	return (
		<Layout>
			<RequireAdmin>
				<>
					<h1 className="mb-4">Admin</h1>
					<Link href="/admin/verification-requests">
						<a className="block mb-2">Manage Verification Requests</a>
					</Link>
					<Link href="/admin/takedown-requests">
						<a className="block mb-2">Manage Takedown Requests</a>
					</Link>
					<Link href="/admin/submissions">
						<a className="block mb-6">Manage Submissions</a>
					</Link>

					<Link href="/entities/audio-items/new">
						<a className="block mb-2">Create Audio Item</a>
					</Link>
					<Link href="/entities/people/new">
						<a className="block mb-2">Create Person</a>
					</Link>
					<Link href="/entities/instruments/new">
						<a className="block mb-2">Create Instrument</a>
					</Link>
					<Link href="/entities/places/new">
						<a className="block mb-2">Create Place</a>
					</Link>
					<Link href="/entities/collections/new">
						<a className="block mb-2">Create Collection</a>
					</Link>
				</>
			</RequireAdmin>
		</Layout>
	);
};

export default AdminHome;
