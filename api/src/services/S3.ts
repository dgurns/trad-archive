import {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
	DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const {
	API_AWS_S3_BUCKET,
	API_AWS_REGION,
	API_AWS_ACCESS_KEY_ID,
	API_AWS_SECRET_ACCESS_KEY,
} = process.env;

console.log("ACCESS KEY", process.env.AWS_ACCESS_KEY_ID);

const s3Client = new S3Client({
	apiVersion: "2006-03-01",
	region: API_AWS_REGION ?? "",
	credentials: {
		accessKeyId: API_AWS_ACCESS_KEY_ID ?? "",
		secretAccessKey: API_AWS_SECRET_ACCESS_KEY ?? "",
	},
});

const makePresignedPutUrl = (s3Key: string) => {
	const command = new PutObjectCommand({
		Bucket: API_AWS_S3_BUCKET,
		Key: s3Key,
	});
	return getSignedUrl(s3Client, command, { expiresIn: 360 });
};

const makePresignedGetUrl = (s3Key: string) => {
	const command = new GetObjectCommand({
		Bucket: API_AWS_S3_BUCKET,
		Key: s3Key,
	});
	return getSignedUrl(s3Client, command, { expiresIn: 360 });
};

const deleteObject = (s3Key: string) => {
	const command = new DeleteObjectCommand({
		Bucket: API_AWS_S3_BUCKET,
		Key: s3Key,
	});
	return s3Client.send(command);
};

const S3Service = {
	makePresignedPutUrl,
	makePresignedGetUrl,
	deleteObject,
};
export default S3Service;
