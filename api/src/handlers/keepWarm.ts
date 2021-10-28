import fetch from "node-fetch";
import {
	APIGatewayProxyCallback,
	APIGatewayProxyEvent,
	Context as LambdaContext,
} from "aws-lambda";

const { SERVERLESS_STAGE } = process.env;

const makeKeepWarmRequests = async () => {
	let url: string | undefined;
	switch (SERVERLESS_STAGE) {
		case "prod":
			url = "https://api-master.tradarchive.com/graphql";
			break;
		default:
			url = `https://api-${SERVERLESS_STAGE}.tradarchive.com/graphql`;
	}

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `{
				currentUser {
					id
				}
			}`,
		}),
	};

	// Make 4 simultaneous requests to warm up 4 Lambda instances
	const promises = [
		fetch(url, options),
		fetch(url, options),
		fetch(url, options),
		fetch(url, options),
	];
	await Promise.all(promises);
	return;
};

export const handler = (
	event: APIGatewayProxyEvent,
	context: LambdaContext,
	callback: APIGatewayProxyCallback
) => {
	context.callbackWaitsForEmptyEventLoop = false;

	// Do nothing and return immediately in dev environment
	if (SERVERLESS_STAGE === "dev") {
		return callback(null);
	}

	makeKeepWarmRequests()
		.then(() => callback(null))
		.catch((err) => callback(err));
};
