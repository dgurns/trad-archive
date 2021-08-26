import AwsS3 from "aws-sdk/clients/s3";

const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET } =
	process.env;

const S3 = new AwsS3({
	apiVersion: "2006-03-01",
	region: AWS_REGION,
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
	signatureVersion: "v4",
});

const makePresignedPutUrl = (s3Key: string) => {
	const params = {
		Bucket: AWS_S3_BUCKET,
		Key: s3Key,
		Expires: 360,
	};
	return S3.getSignedUrlPromise("putObject", params);
};

const makePresignedGetUrl = (s3Key: string) => {
	const params = {
		Bucket: AWS_S3_BUCKET,
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
