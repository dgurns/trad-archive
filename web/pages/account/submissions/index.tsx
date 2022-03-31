import Link from "next/link";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import Breadcrumb from "components/Breadcrumb";

const Submissions = () => {
	return (
		<Layout>
			<RequireUser>
				<Breadcrumb
					items={[
						{
							label: "Account",
							href: "/account",
						},
						{ label: "Submissions" },
					]}
					className="mb-4"
				/>
				<Link href="/account/submissions/new">Create New</Link>
			</RequireUser>
		</Layout>
	);
};

export default Submissions;
