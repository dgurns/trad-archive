import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, gql } from "@apollo/client";

import { Submission } from "types";
import { SubmissionFragments } from "fragments";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import Breadcrumb from "components/Breadcrumb";
import LoadingBlock from "components/LoadingBlock";
import DateTimeService from "services/DateTime";

const SUBMISSION = gql`
	query Submission($input: SubmissionInput!) {
		submission(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;

const CREATE_PRESIGNED_FILE_UPLOAD_URLS = gql`
	mutation CreatePresignedFileUploadUrls(
		$input: CreatePresignedFileUploadUrlsInput!
	) {
		createPresignedFileUploadUrls(input: $input) {
			filename
			presignedUploadUrl
		}
	}
`;

interface QueryData {
	submission: Submission;
}
interface QueryVars {
	input: {
		id: string;
	};
}
interface MutationData {
	createPresignedFileUploadUrls: Array<{
		filename: string;
		presignedUploadUrl: string;
	}>;
}
interface MutationVars {
	input: {
		submissionId: string;
		filenames: string[];
	};
}

const SubmissionsViewByIdUpload = () => {
	const router = useRouter();
	const { id } = router.query;
	const submissionId = typeof id === "string" ? id : id[0];

	const { data, error } = useQuery<QueryData, QueryVars>(SUBMISSION, {
		variables: { input: { id: typeof id === "string" ? id : undefined } },
	});

	const [files, setFiles] = useState<File[]>([]);

	const [getPresignedUrls] = useMutation<MutationData, MutationVars>(
		CREATE_PRESIGNED_FILE_UPLOAD_URLS
	);

	const onUploadClicked = async () => {
		try {
			const filenames = files.map((f) => f.name);
			const presignedUrls = await getPresignedUrls({
				variables: { input: { submissionId, filenames } },
			});
			console.log(presignedUrls);
		} catch {
			alert("Error uploading files. Please try again.");
		}
	};

	if (!data) {
		return (
			<Layout>
				<RequireUser>
					{error ? (
						<div className="text-red-600">
							{error.graphQLErrors.map((e) => e.message).join(", ")}
						</div>
					) : (
						<LoadingBlock />
					)}
				</RequireUser>
			</Layout>
		);
	}

	const onFilesSelected = (event) => {
		// Add any new files to the array in state
		const updatedFiles = [...files];
		const selected = Array.from<File>(event.target.files);
		for (const s of selected) {
			if (
				!updatedFiles.find(
					(f) =>
						f.name === s.name &&
						f.size === s.size &&
						f.lastModified === s.lastModified
				)
			) {
				updatedFiles.push(s);
			}
		}
		setFiles(updatedFiles);
	};

	const onRemove = (file: File) => {
		setFiles(
			files.filter((f) => {
				if (
					f.name === file.name &&
					f.size === file.size &&
					f.lastModified === file.lastModified
				) {
					return false;
				}
				return true;
			})
		);
	};

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
						{
							label: DateTimeService.formatDateYearTime(
								data.submission.createdAt,
								true
							),
						},
						{ label: "Upload Files" },
					]}
					className="mb-6"
				/>

				<div className="flex-col">
					<label htmlFor="file-picker">
						<div className="btn-text mb-4 cursor-pointer">Choose Files</div>
					</label>
					<input
						id="file-picker"
						type="file"
						multiple
						onChange={onFilesSelected}
						style={{ display: "none" }}
					/>

					{files.length > 0 && (
						<>
							<ul className="mb-6">
								{files.map((f, index) => (
									<li key={index}>
										{f.name}{" "}
										<button
											className="btn-text pl-2"
											onClick={() => onRemove(f)}
										>
											Remove
										</button>
									</li>
								))}
							</ul>
							<button className="btn block" onClick={onUploadClicked}>
								Upload {files.length} File{files.length === 1 ? "" : "s"}
							</button>
						</>
					)}
				</div>
			</RequireUser>
		</Layout>
	);
};

export default SubmissionsViewByIdUpload;
