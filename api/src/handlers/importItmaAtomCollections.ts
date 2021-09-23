import "reflect-metadata";
import { ScheduledEvent, Context as LambdaContext } from "aws-lambda";
import fetch from "node-fetch";
import { URLSearchParams } from "url";
import { Connection } from "typeorm";

import { connectToDatabase } from "db";
import { EntityType } from "models/entities/base";
import { Collection } from "models/entities/Collection";
import { AudioItem } from "models/entities/AudioItem";
import { Relationship } from "models/Relationship";
import { Tag } from "models/Tag";
import EntityService from "services/Entity";

const COLLECTION_SLUGS_TO_IMPORT = ["amw-18694", "dml-18718"];
const { ITMA_ATOM_ORIGIN, ITMA_ATOM_API_KEY } = process.env;

// Store the DB connection outside of the Lambda handler so it can persist
// between invocations once it is created.
let dbConnection: Connection | undefined;

const initializeDbConnection = async () => {
	if (typeof dbConnection === "undefined") {
		dbConnection = await connectToDatabase();
	}
};

const headers = {
	"REST-API-Key": ITMA_ATOM_API_KEY ?? "",
};

enum RawPublicationStatus {
	Draft = "Draft",
	Published = "Published",
}
interface RawCreator {
	history: string;
}
// RawCollection is the AtoM information object returned for a collection slug
interface RawCollection {
	reference_code: string;
	title: string;
	publication_status: RawPublicationStatus;
	scope_and_content: string;
	creators: RawCreator[];
}
const fetchCollection = async (slug: string): Promise<RawCollection> => {
	const response = await fetch(
		`${ITMA_ATOM_ORIGIN}/api/informationobjects/${slug}`,
		{
			headers,
		}
	);
	return response.json();
};

interface FetchCollectionDigitalAudioObjectsRequest {
	collectionSlug: string;
	skip?: number;
	limit?: number;
}
// RawCollectionDigitalAudioObject is the top-level summary result for digital
// audio objects within a collection.
interface RawCollectionDigitalAudioObject {
	slug: string;
}
interface FetchCollectionDigitalAudioObjectsResponse {
	total: number;
	results: RawCollectionDigitalAudioObject[];
}
const fetchCollectionDigitalAudioObjects = async ({
	collectionSlug,
	skip = 0,
	limit = 10, // Seems to be hard-coded on AtoM as maximum 10
}: FetchCollectionDigitalAudioObjectsRequest): Promise<FetchCollectionDigitalAudioObjectsResponse> => {
	const params = {
		sort: "lastUpdated",
		sf0: "referenceCode",
		sq0: collectionSlug,
		onlyMedia: "1",
		mediaTypes: "135",
		skip: String(skip),
		limit: String(limit),
	};
	const paramsToString = new URLSearchParams(params).toString();
	const url = `${ITMA_ATOM_ORIGIN}/api/informationobjects?${paramsToString}`;
	const response = await fetch(url, { headers });
	return response.json();
};

// RawDigitalAudioObject is the information object returned for a given digital
// audio object slug
interface RawDigitalAudioObject {
	title: string;
	publication_status: RawPublicationStatus;
	scope_and_content: string;
	digital_object: {
		media_type: string;
		mime_type: string;
		reference_url: string;
	};
}
const fetchDigitalAudioObject = async (
	slug: string
): Promise<RawDigitalAudioObject> => {
	const response = await fetch(
		`${ITMA_ATOM_ORIGIN}/api/informationobjects/${slug}`,
		{
			headers,
		}
	);
	return response.json();
};

const addCollectionToDbIfNotPresent = async (
	rawCollection: RawCollection
): Promise<void> => {
	const { reference_code, scope_and_content, creators, title } = rawCollection;
	const existing = await Collection.findOne({
		where: { itmaAtomSlug: reference_code },
	});
	if (existing) {
		console.log(`Already have DB record for ${reference_code}: ${title}`);
		return;
	} else {
		let description = scope_and_content;
		if (creators.length > 0 && creators[0].history) {
			description = `${description} ${creators[0].history}`;
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
};

const addCollectionDigitalAudioObjectsToDbIfNotPresent = async (
	rawCollection: RawCollection
): Promise<void> => {
	const { reference_code, title } = rawCollection;
	console.log(
		`Adding digital audio objects from collection ${reference_code}: ${title}`
	);
	const { total } = await fetchCollectionDigitalAudioObjects({
		collectionSlug: reference_code,
	});
	console.log(
		`Found ${total} digital audio objects in ${reference_code}: ${title}`
	);

	// Get the Collection in DB so we can use it to tag each AudioItem
	const collectionInDb = await Collection.findOne({
		where: { itmaAtomSlug: reference_code },
	});
	const audioItemToCollectionRelationship = await Relationship.findOne({
		where: {
			subjectEntityType: EntityType.AudioItem,
			objectEntityType: EntityType.Collection,
			name: "is contained in",
		},
	});
	const collectionToAudioItemRelationship = await Relationship.findOne({
		where: {
			subjectEntityType: EntityType.Collection,
			objectEntityType: EntityType.AudioItem,
			name: "contains",
		},
	});

	// Get all the digital audio objects for this collection slug
	let currentSkipValue = 0;
	let audioItemsAlreadyInDb = 0;
	let audioItemsAddedToDb = 0;
	while (currentSkipValue < total) {
		console.log(
			`Checking digital audio objects ${currentSkipValue + 1}-${
				currentSkipValue + 10
			} from collection ${reference_code}: ${title}`
		);
		const response = await fetchCollectionDigitalAudioObjects({
			collectionSlug: reference_code,
			skip: currentSkipValue,
			limit: 10,
		});
		for (const result of response.results) {
			const existing = await AudioItem.findOne({
				where: { itmaAtomSlug: result.slug },
			});
			// If raw audio object is already in DB, skip to next. If not, add it.
			if (existing) {
				audioItemsAlreadyInDb = audioItemsAlreadyInDb + 1;
				continue;
			} else {
				const data = await fetchDigitalAudioObject(result.slug);
				if (
					!data ||
					data.publication_status !== "Published" ||
					!data.digital_object?.reference_url ||
					data.digital_object?.media_type !== "Audio" ||
					data.digital_object?.mime_type !== "audio/mpeg"
				) {
					continue;
				}
				const urlSourceSuffix =
					data.digital_object.reference_url.split("/uploads/")[1];
				const urlSource = `${ITMA_ATOM_ORIGIN}/uploads/${urlSourceSuffix}`;
				const newAudioItem = AudioItem.create({
					slug: EntityService.cleanSlug(result.slug),
					name: data.title,
					description: data.scope_and_content,
					urlSource,
					itmaAtomSlug: result.slug,
				});
				await newAudioItem.save();
				audioItemsAddedToDb = audioItemsAddedToDb + 1;

				// Tag this AudioItem with the associated Collection and vice versa
				if (
					collectionInDb &&
					audioItemToCollectionRelationship &&
					collectionToAudioItemRelationship
				) {
					const tag1 = Tag.create({
						relationship: audioItemToCollectionRelationship,
						subjectAudioItem: newAudioItem,
						objectCollection: collectionInDb,
					});
					const tag2 = Tag.create({
						relationship: collectionToAudioItemRelationship,
						subjectCollection: collectionInDb,
						objectAudioItem: newAudioItem,
					});
					await tag1.save();
					await tag2.save();
				}
			}
		}
		currentSkipValue = currentSkipValue + 10;
	}
	console.log(
		`Added ${audioItemsAddedToDb} AudioItems to DB from collection ${reference_code}: ${title}. ${audioItemsAlreadyInDb} AudioItems were already in DB.`
	);
};

export const handler = async (
	event: ScheduledEvent,
	context: LambdaContext
) => {
	const startTime = Date.now();

	console.log("Fetching collection summaries from ITMA AtoM API...");
	const fetchCollectionPromises = COLLECTION_SLUGS_TO_IMPORT.map((slug) =>
		fetchCollection(slug)
	);
	const collectionPromiseResults = await Promise.allSettled(
		fetchCollectionPromises
	);
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
	const addCollectionPromises = rawCollections.map((rawCollection) =>
		addCollectionToDbIfNotPresent(rawCollection)
	);
	await Promise.allSettled(addCollectionPromises);

	console.log(
		"Looping through collections and adding digital audio objects to DB if not already present..."
	);
	const addDigitalAudioObjectsPromises = rawCollections.map((rawCollection) =>
		addCollectionDigitalAudioObjectsToDbIfNotPresent(rawCollection)
	);
	await Promise.allSettled(addDigitalAudioObjectsPromises);

	const elapsedTimeMs = Date.now() - startTime;
	console.log(
		`Finished! Elapsed time: ${Math.round(elapsedTimeMs / 1000)} seconds`
	);
	return;
};
