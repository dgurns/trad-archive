import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

import { Submission } from "types";
import { SubmissionFragments } from "fragments";
import DateTimeService from "services/DateTime";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import Breadcrumb from "components/Breadcrumb";
import LoadingBlock from "components/LoadingBlock";

const SUBMISSIONS_FOR_CURRENT_USER = gql`
	query SubmissionsForCurrentUser {
		submissionsForCurrentUser {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;

interface SubmissionsData {
	submissionsForCurrentUser: Submission[];
}

const Submissions = () => {
	const { data, loading, error } = useQuery<SubmissionsData>(
		SUBMISSIONS_FOR_CURRENT_USER
	);

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

				{loading && <LoadingBlock className="mt-6" />}

				{data && (
					<ul className="mt-6">
						{data.submissionsForCurrentUser.map((s, index) => (
							<li className="mb-4" key={index}>
								{DateTimeService.formatDateYearTime(s.createdAt, true)} (
								{s.materialTypes.join(", ")}) - Status: {s.status}
								<br />
								<span className="text-gray-500">
									{`${s.description.substring(0, 200)}${
										s.description.length > 200 ? "..." : ""
									}`}
								</span>
								<br />
								<Link href={`/account/submissions/${s.id}/upload`}>
									Upload More Files
								</Link>
							</li>
						))}
					</ul>
				)}
			</RequireUser>
		</Layout>
	);
};

export default Submissions;
