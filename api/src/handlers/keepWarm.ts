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
		case "dev":
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

	// Make parallel requests to warm up Lambda instances
	const NUM_PARALLEL_REQUESTS = 8;
	const promises = [];
	for (let i = 0; i < NUM_PARALLEL_REQUESTS; i++) {
		promises.push(fetch(url, options));
	}
	await Promise.all(promises);
	return;
};

export const handler = (
	event: APIGatewayProxyEvent,
	context: LambdaContext,
	callback: APIGatewayProxyCallback
) => {
	context.callbackWaitsForEmptyEventLoop = false;

	makeKeepWarmRequests()
		.then(() => callback(null))
		.catch((err) => callback(err));
};
