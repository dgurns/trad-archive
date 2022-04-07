import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

import { Submission } from "types";
import { SubmissionFragments } from "fragments";
import DateTimeService from "services/DateTime";

import Layout from "components/Layout";
import RequireAdmin from "components/RequireAdmin";
import Breadcrumb from "components/Breadcrumb";
import LoadingBlock from "components/LoadingBlock";

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

				{loading && <LoadingBlock />}

				{data && (
					<ul>
						{data.submissions.map((s, index) => (
							<li className="mb-4" key={index}>
								{DateTimeService.formatDateYearTime(s.createdAt, true)} (
								{s.materialTypes.join(", ")}) - Status: {s.status}
								<br />
								<span className="text-gray-500">{s.description}</span>
								<br />
								<Link href="https://console.aws.amazon.com/s3">
									<a target="_blank">
										View Files <i className="material-icons text-sm">launch</i>
									</a>
								</Link>{" "}
								- {s.s3DirectoryKey}
							</li>
						))}
					</ul>
				)}
			</RequireAdmin>
		</Layout>
	);
};

export default AdminSubmissions;
