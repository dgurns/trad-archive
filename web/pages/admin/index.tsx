import Link from "next/link";
import Layout from "components/Layout";
import RequireAdmin from "components/RequireAdmin";

const AdminHome = () => {
	return (
		<Layout>
			<RequireAdmin>
				<>
					<h1 className="mb-4">Admin</h1>
					<Link href="/verification-requests">
						<a className="block mb-2">Manage Verification Requests</a>
					</Link>
					<Link href="/takedown-requests">
						<a className="block mb-2">Manage Takedown Requests</a>
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
					<Link href="/relationships/new">
						<a className="block mb-2">Create Relationship</a>
					</Link>
				</>
			</RequireAdmin>
		</Layout>
	);
};

export default AdminHome;
