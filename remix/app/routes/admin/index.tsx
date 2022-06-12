import { Link } from "@remix-run/react";
import Layout from "~/components/Layout";
import RequireAdmin from "~/components/RequireAdmin";

const AdminHome = () => {
	return (
		<Layout>
			<RequireAdmin>
				<>
					<h1 className="mb-4">Admin</h1>
					<Link to="/admin/verification-requests">
						<a className="block mb-2">Manage Verification Requests</a>
					</Link>
					<Link to="/admin/takedown-requests">
						<a className="block mb-2">Manage Takedown Requests</a>
					</Link>
					<Link to="/admin/submissions">
						<a className="block mb-6">Manage Submissions</a>
					</Link>

					<Link to="/entities/audio-items/new">
						<a className="block mb-2">Create Audio Item</a>
					</Link>
					<Link to="/entities/people/new">
						<a className="block mb-2">Create Person</a>
					</Link>
					<Link to="/entities/instruments/new">
						<a className="block mb-2">Create Instrument</a>
					</Link>
					<Link to="/entities/places/new">
						<a className="block mb-2">Create Place</a>
					</Link>
					<Link to="/entities/collections/new">
						<a className="block mb-2">Create Collection</a>
					</Link>
				</>
			</RequireAdmin>
		</Layout>
	);
};

export default AdminHome;
