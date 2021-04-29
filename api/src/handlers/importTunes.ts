import "reflect-metadata";
import { ScheduledEvent, Context as LambdaContext } from "aws-lambda";
import fetch from "node-fetch";
import { Connection } from "typeorm";

import { connectToDatabase } from "db";
import { Tune } from "models/entities/Tune";

// Store the DB connection outside of the Lambda handler so it can persist
// between invocations once it is created.
let dbConnection: Connection | undefined;

const initializeDbConnection = async () => {
	if (typeof dbConnection === "undefined") {
		dbConnection = await connectToDatabase();
	}
};

interface RawTune {
	tune_id: string;
	setting_id: string;
	name: string;
	type: string;
	meter: string;
	mode: string;
	date: string;
	username: string;
}
const fetchTunesData = async (): Promise<RawTune[]> => {
	const response = await fetch(
		"https://raw.githubusercontent.com/adactio/TheSession-data/main/json/tunes.json"
	);
	return response.json();
};

interface RawAlias {
	tune_id: string;
	alias: string;
	name: string;
}
const fetchAliasesData = async (): Promise<RawAlias[]> => {
	const response = await fetch(
		"https://raw.githubusercontent.com/adactio/TheSession-data/main/json/aliases.json"
	);
	return response.json();
};

// handler fetches the latest `tunes` and `aliases` from TheSession.org's data
// dumps and, if new tunes are found, saves them to the database.
// Data sources:
// 	- https://github.com/adactio/TheSession-data/blob/main/json/tunes.json
// 	- https://github.com/adactio/TheSession-data/blob/main/json/aliases.json
export const handler = async (
	event: ScheduledEvent,
	context: LambdaContext
) => {
	const [rawTunes, rawAliases] = await Promise.all([
		fetchTunesData(),
		fetchAliasesData(),
	]);
	if (!Array.isArray(rawTunes) || !Array.isArray(rawAliases)) {
		return new Error("Error fetching tunes and aliases from TheSession data");
	}

	await initializeDbConnection();

	let startAddingAtIndex = 0;
	const mostRecentTuneInDb = await Tune.findOne();
	if (mostRecentTuneInDb) {
		startAddingAtIndex = rawTunes.findIndex(
			(rawTune) => rawTune.tune_id === mostRecentTuneInDb.theSessionTuneId
		);
	}

	// Add raw tunes to DB

	return {
		success: true,
		message: "Added x new tunes to the database",
	};
};
