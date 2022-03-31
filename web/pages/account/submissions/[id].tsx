import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import Breadcrumb from "components/Breadcrumb";

const SubmissionsViewById = () => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<Layout>
			<RequireUser>
				<Breadcrumb
					items={[
						{
							label: "Account",
							href: "/account",
						},
						{ label: "Submissions", href: "/account/submissions" },
						{ label: `${id}` },
					]}
					className="mb-4"
				/>
				View Submission by ID
			</RequireUser>
		</Layout>
	);
};

export default SubmissionsViewById;
