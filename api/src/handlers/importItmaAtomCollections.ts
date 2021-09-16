import "reflect-metadata";
import { ScheduledEvent, Context as LambdaContext } from "aws-lambda";
import fetch from "node-fetch";
import { URLSearchParams } from "url";
import { Connection } from "typeorm";

import { connectToDatabase } from "db";
import { Collection } from "models/entities/Collection";
import EntityService from "services/Entity";

const COLLECTION_SLUGS_TO_IMPORT = ["amw-18694", "dml-18718"];

const { ITMA_ATOM_API_BASE_URL, ITMA_ATOM_API_KEY } = process.env;

// Store the DB connection outside of the Lambda handler so it can persist
// between invocations once it is created.
let dbConnection: Connection | undefined;

const initializeDbConnection = async () => {
	if (typeof dbConnection === "undefined") {
		dbConnection = await connectToDatabase();
	}
};

enum PublicationStatus {
	Draft = "Draft",
	Published = "Published",
}
// RawCollectionCreator is the creator record for a given information object
interface RawCollectionCreator {
	history: string;
}
// RawCollection is the information object returned for a given collection slug
interface RawCollection {
	reference_code: string;
	title: string;
	publication_status: PublicationStatus;
	scope_and_content: string;
	creators: RawCollectionCreator[];
}
// RawCollectionDigitalObject is the top-level summary result for digital
// objects within a collection.
interface RawCollectionDigitalObject {
	slug: string;
}
enum MediaType {
	Audio = "Audio",
	Image = "Image",
	Video = "Video",
	Text = "Text",
	Other = "Other",
}
enum MimeType {
	AudioMpeg = "audio/mpeg",
}
// RawDigitalObject is the information object returned for a given digital
// object slug
interface RawDigitalObject {
	title: string;
	publication_status: PublicationStatus;
	scope_and_content: string;
	digital_object: {
		media_type: MediaType;
		mime_type: MimeType;
		url: string;
	};
}

const headers = {
	"REST-API-Key": ITMA_ATOM_API_KEY ?? "",
};
const fetchCollection = async (slug: string): Promise<RawCollection> => {
	const response = await fetch(
		`${ITMA_ATOM_API_BASE_URL}/informationobjects/${slug}`,
		{
			headers,
		}
	);
	return response.json();
};

interface CollectionDigitalObjectsResponse {
	total: number;
	results: RawCollectionDigitalObject[];
}
const fetchCollectionDigitalObjects = async (
	collectionSlug: string
): Promise<CollectionDigitalObjectsResponse> => {
	const params = {
		sort: "lastUpdated",
		sf0: "referenceCode",
		sq0: collectionSlug,
		onlyMedia: "1",
		mediaTypes: "135",
		skip: "0",
		resultsPerPage: "10",
	};
	const paramsToString = new URLSearchParams(params).toString();
	const response = await fetch(
		`${ITMA_ATOM_API_BASE_URL}/informationobjects/${paramsToString}`,
		{ headers }
	);
	return response.json();
};

const fetchDigitalObject = async (slug: string): Promise<RawDigitalObject> => {
	const response = await fetch(
		`${ITMA_ATOM_API_BASE_URL}/informationobjects/${slug}`,
		{
			headers,
		}
	);
	return response.json();
};

export const handler = async (
	event: ScheduledEvent,
	context: LambdaContext
) => {
	const startTime = Date.now();

	console.log("Fetching collection summaries from ITMA AtoM API...");
	const collectionPromises = COLLECTION_SLUGS_TO_IMPORT.map((slug) =>
		fetchCollection(slug)
	);
	const collectionPromiseResults = await Promise.allSettled(collectionPromises);
	const rawCollections: RawCollection[] = [];
	collectionPromiseResults.forEach((result) => {
		if (result.status === "fulfilled") {
			const { reference_code, title } = result.value;
			console.log(`Got collection summary for ${reference_code}: ${title}`);
			rawCollections.push(result.value);
		} else if (result.status === "rejected") {
			console.log("Error fetching a collection summary:", result.reason);
		}
	});

	await initializeDbConnection();

	console.log("Adding collections to DB if not already present...");
	for (const rawCollection of rawCollections) {
		const { reference_code, scope_and_content, creators, title } =
			rawCollection;
		const existing = await Collection.findOne({
			where: { itmaAtomSlug: reference_code },
		});
		if (existing) {
			console.log(`Already have DB record for ${reference_code}: ${title}`);
			continue;
		} else {
			let description = scope_and_content;
			if (creators.length > 0) {
				description = `${description} ${creators[0].history ?? ""}`;
			}
			const newCollection = Collection.create({
				slug: EntityService.cleanSlug(reference_code),
				name: title,
				description,
				itmaAtomSlug: reference_code,
			});
			await newCollection.save();
			console.log(`Added new Collection to DB: ${reference_code}: ${title}`);
		}
	}

	// const totalTunesFoundOnTheSession = keys.length;
	// const elapsedTimeMs = Date.now() - startTime;
	// console.log("Total tunes found on TheSession: ", totalTunesFoundOnTheSession);
	// console.log("Total tunes in database before this script: ", tunesInDb.length);
	// console.log("Total new tunes added to database: ", totalNewTunesAddedToDb);
	// console.log("Elapsed time: %s ms", elapsedTimeMs);

	return;
};
