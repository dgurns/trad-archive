import { Link } from "@remix-run/react";
import { useQuery, gql } from "@apollo/client";

import type { Submission } from "~/types";
import { SubmissionFragments } from "~/fragments";
import DateTimeService from "~/services/DateTime";

import Layout from "~/components/Layout";
import RequireAdmin from "~/components/RequireAdmin";
import Breadcrumb from "~/components/Breadcrumb";
import LoadingBlock from "~/components/LoadingBlock";

const SUBMISSIONS = gql`
	query Submissions($input: SubmissionsInput!) {
		submissions(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;

interface SubmissionsData {
	submissions: Submission[];
}
interface SubmissionsVars {
	input: {
		take?: number;
		skip?: number;
	};
}

const AdminSubmissions = () => {
	const { data, loading } = useQuery<SubmissionsData, SubmissionsVars>(
		SUBMISSIONS,
		{
			variables: { input: { take: 100, skip: 0 } },
			fetchPolicy: "cache-and-network",
		}
	);

	return (
		<Layout>
			<RequireAdmin>
				<Breadcrumb
					items={[
						{
							label: "Admin",
							href: "/admin",
						},
						{ label: "Submissions" },
					]}
					className="mb-6"
				/>

				{!data && loading && <LoadingBlock />}

				{data && (
					<ul>
						{data.submissions.map((s, index) => (
							<li className="mb-4" key={index}>
								{DateTimeService.formatDateYearTime(s.createdAt, true)} (
								{s.materialTypes.join(", ")}) - Status: {s.status}
								<br />
								From {s.createdByUser.username} / {s.createdByUser.email}
								<br />
								Owns copyright? {s.userControlsCopyright ? "Yes" : "No"}
								{s.copyrightDetails ? ` - ${s.copyrightDetails}` : ""}
								<br />
								<span className="text-gray-500">{s.description}</span>
								<br />
								<Link to={`/admin/submissions/${s.id}`}>View Files</Link>
							</li>
						))}
					</ul>
				)}
			</RequireAdmin>
		</Layout>
	);
};

export default AdminSubmissions;