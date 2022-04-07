import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import { Submission } from "types";
import { SubmissionFragments } from "fragments";
import DateTimeService from "services/DateTime";

import Layout from "components/Layout";
import RequireAdmin from "components/RequireAdmin";
import Breadcrumb from "components/Breadcrumb";
import LoadingBlock from "components/LoadingBlock";

const SUBMISSION_WITH_FILES = gql`
	query SubmissionWithFiles($id: String!) {
		submissionWithFiles(id: $id) {
			submission {
				...Submission
			}
			files {
				filename
				presignedDownloadUrl
			}
		}
	}
	${SubmissionFragments.submission}
`;

interface SubmissionWithFilesData {
	submissionWithFiles: {
		submission: Submission;
		files: Array<{
			filename: string;
			presignedDownloadUrl: string;
		}>;
	};
}
interface SubmissionWithFilesVars {
	id: string;
}

const AdminViewSubmissionById = () => {
	const router = useRouter();
	const { id } = router.query;
	const submissionId = typeof id === "string" ? id : undefined;

	const { data, loading } = useQuery<
		SubmissionWithFilesData,
		SubmissionWithFilesVars
	>(SUBMISSION_WITH_FILES, {
		variables: { id: submissionId },
		skip: !submissionId,
		fetchPolicy: "cache-and-network",
	});
	const { submission, files } = data?.submissionWithFiles ?? {};

	return (
		<Layout>
			<RequireAdmin>
				<Breadcrumb
					items={[
						{
							label: "Admin",
							href: "/admin",
						},
						{ label: "Submissions", href: "/admin/submissions" },
						{
							label: submission
								? `${DateTimeService.formatDateYearTime(
										submission.createdAt,
										true
								  )} from ${submission.createdByUser.username}`
								: "View Submission",
						},
					]}
					className="mb-6"
				/>

				{files && (
					<ul>
						{files.map((f, index) => (
							<li className="flex flex-row" key={index}>
								<div className="pr-2">{f.filename}</div>
								<Link href={f.presignedDownloadUrl}>
									<a target="_blank">
										View<i className="material-icons text-sm">launch</i>
									</a>
								</Link>
							</li>
						))}
					</ul>
				)}

				{!files && loading && <LoadingBlock className="mt-8" />}
			</RequireAdmin>
		</Layout>
	);
};

export default AdminViewSubmissionById;
