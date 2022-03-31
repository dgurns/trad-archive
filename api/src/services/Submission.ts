const makeS3DirectoryKey = (userId: string, submissionId: string) =>
	`users/${userId}}/submissions/${submissionId}`;

const SubmissionService = {
	makeS3DirectoryKey,
};
export default SubmissionService;
