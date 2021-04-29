import "reflect-metadata";
import { Connection } from "typeorm";
import { ScheduledEvent, Callback, Context as LambdaContext } from "aws-lambda";

import { connectToDatabase } from "db";

const { SERVERLESS_STAGE } = process.env;

// Store the DB connection outside of the Lambda handler so it can persist
// between invocations once it is created.
let dbConnection: Connection | undefined;

const initializeDbConnection = async () => {
	if (typeof dbConnection === "undefined") {
		dbConnection = await connectToDatabase();
	}
};

// handler fetches the latest `tune` and `alias` data from TheSession.org's data
// dumps and, if new tunes are found, saves them to the database.
// Data sources:
// 	- https://github.com/adactio/TheSession-data/blob/main/json/tunes.json
// 	- https://github.com/adactio/TheSession-data/blob/main/json/aliases.json
export const handler = (
	event: ScheduledEvent,
	context: LambdaContext,
	callback: Callback
) => {
	context.callbackWaitsForEmptyEventLoop = false;

	initializeDbConnection().then(() => {
		console.log("running");
		callback(null, { success: true });
	});
};
