import Link from "next/link";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";

const AccountHome = () => {
	return (
		<Layout>
			<RequireUser>
				<h1 className="mb-4">Account</h1>
				<Link href="/account/verify">
					<a className="block mb-2">Verify Yourself and Link Person Tag</a>
				</Link>
				<Link href="/logout">
					<a className="block mb-2">Log Out</a>
				</Link>
			</RequireUser>
		</Layout>
	);
};

export default AccountHome;
