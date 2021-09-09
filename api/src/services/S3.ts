import AwsS3 from "aws-sdk/clients/s3";

const {
	API_AWS_REGION,
	API_AWS_ACCESS_KEY_ID,
	API_AWS_SECRET_ACCESS_KEY,
	API_AWS_S3_BUCKET,
} = process.env;

const S3 = new AwsS3({
	apiVersion: "2006-03-01",
	region: API_AWS_REGION,
	accessKeyId: API_AWS_ACCESS_KEY_ID,
	secretAccessKey: API_AWS_SECRET_ACCESS_KEY,
	signatureVersion: "v4",
});

const makePresignedPutUrl = (s3Key: string) => {
	const params = {
		Bucket: API_AWS_S3_BUCKET,
		Key: s3Key,
		Expires: 360,
	};
	return S3.getSignedUrlPromise("putObject", params);
};

const makePresignedGetUrl = (s3Key: string) => {
	const params = {
		Bucket: API_AWS_S3_BUCKET,
		Key: s3Key,
		Expires: 360,
	};
	return S3.getSignedUrlPromise("getObject", params);
};

const S3Service = {
	makePresignedPutUrl,
	makePresignedGetUrl,
};
export default S3Service;
