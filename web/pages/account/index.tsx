import Link from "next/link";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";

const AccountHome = () => {
	return (
		<Layout>
			<RequireUser>
				<h1 className="mb-4">Account</h1>
				<Link href="/account/verify">
					<a className="block mb-2">Verify yourself and link Person tag</a>
				</Link>
				<Link href="/logout">
					<a className="block mb-2">Log out</a>
				</Link>
			</RequireUser>
		</Layout>
	);
};

export default AccountHome;
