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

interface SortedTunesWithAliases {
	[tuneId: string]: {
		rawTune: RawTune;
		aliases: RawAlias[];
	};
}
const organizeRawTunes = (
	rawTunes: RawTune[],
	sortedTunesWithAliases: SortedTunesWithAliases
): void => {
	// Sort by TheSession Tune ID in ascending order
	const sortedRawTunes = rawTunes.sort(
		(a, b) => parseInt(a.tune_id) - parseInt(b.tune_id)
	);
	sortedRawTunes.forEach((rawTune) => {
		// If the tune ID does not exist in the object, set it
		if (!sortedTunesWithAliases[rawTune.tune_id]) {
			sortedTunesWithAliases[rawTune.tune_id] = {
				...sortedTunesWithAliases[rawTune.tune_id],
				rawTune,
			};
		}
	});
};

const organizeRawAliases = (
	rawAliases: RawAlias[],
	sortedTunesWithAliases: SortedTunesWithAliases
): void => {
	rawAliases.forEach((rawAlias) => {
		if (sortedTunesWithAliases[rawAlias.tune_id]) {
			sortedTunesWithAliases[rawAlias.tune_id] = {
				...sortedTunesWithAliases[rawAlias.tune_id],
				aliases: [
					...(sortedTunesWithAliases[rawAlias.tune_id].aliases ?? []),
					rawAlias,
				],
			};
		}
	});
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

	const sortedTunesWithAliases: SortedTunesWithAliases = {};
	organizeRawTunes(rawTunes, sortedTunesWithAliases);
	organizeRawAliases(rawAliases, sortedTunesWithAliases);

	let startAddingAtRawTuneId: string = "1";
	const [mostRecentTuneInDb] = await Tune.find({
		order: { id: "DESC" },
		take: 1,
	});
	if (mostRecentTuneInDb) {
		startAddingAtRawTuneId = mostRecentTuneInDb.theSessionTuneId;
	}

	// Starting at the given ID, add all the tunes from TheSession data to the DB

	return {
		success: true,
		tunesFoundOnTheSession: Object.keys(sortedTunesWithAliases).length,
		tunesAddedToDb: 0,
	};
};
