import "reflect-metadata";
import { ScheduledEvent, Context as LambdaContext } from "aws-lambda";
import fetch from "node-fetch";
import { Connection, getManager } from "typeorm";

import { connectToDatabase } from "db";
import { Tune } from "models/entities/Tune";
import EntityService from "services/Entity";

interface RawTune {
	tune_id: string;
	setting_id: string;
	name: string;
	type: string;
	meter: string;
	mode: string;
	abc: string;
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

interface RawDataByTuneId {
	[tuneId: string]: {
		rawTune: RawTune;
		rawAliases: RawAlias[];
	};
}
const sortRawTunesById = (
	rawTunes: RawTune[],
	rawDataByTuneId: RawDataByTuneId
): void => {
	rawTunes.forEach((rawTune) => {
		// If the tune ID does not exist in the object, set it
		if (!rawDataByTuneId[rawTune.tune_id]) {
			rawDataByTuneId[rawTune.tune_id] = {
				...rawDataByTuneId[rawTune.tune_id],
				rawTune,
			};
		}
	});
};

const sortRawAliasesByTuneId = (
	rawAliases: RawAlias[],
	rawDataByTuneId: RawDataByTuneId
): void => {
	rawAliases.forEach((rawAlias) => {
		// If the raw alias's parent tune ID exists in the object, add the alias to
		// the existing ones
		if (rawDataByTuneId[rawAlias.tune_id]) {
			rawDataByTuneId[rawAlias.tune_id] = {
				...rawDataByTuneId[rawAlias.tune_id],
				rawAliases: [
					...(rawDataByTuneId[rawAlias.tune_id].rawAliases ?? []),
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
	const startTime = Date.now();

	const dbConnection = await connectToDatabase();

	console.log("Fetching tunes and aliases data from The Session data dumps...");
	const [rawTunes, rawAliases] = await Promise.all([
		fetchTunesData(),
		fetchAliasesData(),
	]);
	if (!Array.isArray(rawTunes) || !Array.isArray(rawAliases)) {
		return new Error("Error fetching tunes and aliases from TheSession data");
	}

	const rawDataByTuneId: RawDataByTuneId = {};
	sortRawTunesById(rawTunes, rawDataByTuneId);
	sortRawAliasesByTuneId(rawAliases, rawDataByTuneId);

	console.log("Checking tunes already in database...");
	const tunesInDb =
		(await getManager()
			.createQueryBuilder(Tune, "tune")
			.select("tune.theSessionTuneId")
			.getMany()) ?? [];

	let totalNewTunesAddedToDb = 0;
	const keys = Object.keys(rawDataByTuneId);

	console.log("Adding new tunes if not already in database...");
	for (let i = 0; i < keys.length; i++) {
		const tuneId = keys[i];

		const tuneIsAlreadyInDb =
			tunesInDb.findIndex((tuneInDb) => tuneInDb.theSessionTuneId === tuneId) >
			-1;
		if (tuneIsAlreadyInDb) {
			continue;
		}

		const { rawTune, rawAliases } = rawDataByTuneId[tuneId];
		try {
			const tune = Tune.create({
				name: rawTune.name,
				slug: EntityService.cleanSlug(tuneId),
				aliases: rawAliases?.map((rawAlias) => rawAlias.alias).join(", "),
				theSessionTuneId: tuneId,
				type: rawTune.type,
				meter: rawTune.meter,
				mode: rawTune.mode,
				abc: rawTune.abc,
			});
			await tune.save();
			totalNewTunesAddedToDb += 1;
		} catch (error) {
			console.log(
				"Error adding tune with ID %s: ",
				tuneId,
				(error as Error).message
			);
		}
	}

	// Clean up the DB connection
	if (dbConnection) {
		await dbConnection.close();
	}

	const totalTunesFoundOnTheSession = keys.length;
	const elapsedTimeMs = Date.now() - startTime;
	console.log("Total tunes found on TheSession: ", totalTunesFoundOnTheSession);
	console.log("Total tunes in database before this script: ", tunesInDb.length);
	console.log("Total new tunes added to database: ", totalNewTunesAddedToDb);
	console.log("Elapsed time: %s ms", elapsedTimeMs);

	return;
};
