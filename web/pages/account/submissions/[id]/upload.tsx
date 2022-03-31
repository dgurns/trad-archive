import { useRouter } from "next/router";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import Breadcrumb from "components/Breadcrumb";

const SubmissionsViewByIdUpload = () => {
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
						{ label: "Upload" },
					]}
					className="mb-4"
				/>
				Upload files here
			</RequireUser>
		</Layout>
	);
};

export default SubmissionsViewByIdUpload;
