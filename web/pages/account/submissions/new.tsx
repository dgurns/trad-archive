import Link from "next/link";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import Breadcrumb from "components/Breadcrumb";

const SubmissionsNew = () => {
	return (
		<Layout>
			<RequireUser>
				<Breadcrumb
					items={[
						{
							label: "Account",
							href: "/account",
						},
						{
							label: "Submissions",
							href: "/account/submissions",
						},
						{ label: "Create a New Submission" },
					]}
					className="mb-4"
				/>
				Form goes here
			</RequireUser>
		</Layout>
	);
};

export default SubmissionsNew;
