import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, gql } from "@apollo/client";

import { Submission } from "types";
import { SubmissionFragments } from "fragments";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";
import Breadcrumb from "components/Breadcrumb";
import LoadingBlock from "components/LoadingBlock";
import FileUploader from "components/FileUploader";
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
	const submissionId = typeof id === "string" ? id : undefined;

	const { data, error } = useQuery<QueryData, QueryVars>(SUBMISSION, {
		variables: { input: { id: submissionId } },
		skip: !submissionId,
	});

	const [files, setFiles] = useState<File[]>([]);
	const [uploadQueue, setUploadQueue] =
		useState<Array<{ file: File; uploadUrl: string }>>();

	const [getPresignedUrls] = useMutation<MutationData, MutationVars>(
		CREATE_PRESIGNED_FILE_UPLOAD_URLS
	);

	const onUploadClicked = async () => {
		if (!submissionId) {
			return;
		}
		try {
			const filenames = files.map((f) => f.name);
			const response = await getPresignedUrls({
				variables: { input: { submissionId, filenames } },
			});
			const uploadUrls = response.data.createPresignedFileUploadUrls;
			if (uploadUrls.length !== files.length) {
				throw new Error("Unexpected number of presigned upload URLs");
			}
			setUploadQueue(
				files.map((f, index) => ({
					file: f,
					uploadUrl: uploadUrls[index].presignedUploadUrl,
				}))
			);
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

	const onUploadSuccess = () => {
		alert("Files uploaded successfully!");
		router.push("/account/submissions");
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
					{!uploadQueue ? (
						<>
							<label htmlFor="file-picker">
								<div className="btn-text mb-4 cursor-pointer">
									{files.length === 0 ? "Choose Files" : "Choose More Files"}
								</div>
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
						</>
					) : (
						<FileUploader
							filesWithUploadUrls={uploadQueue}
							onSuccess={onUploadSuccess}
						/>
					)}
				</div>
			</RequireUser>
		</Layout>
	);
};

export default SubmissionsViewByIdUpload;
