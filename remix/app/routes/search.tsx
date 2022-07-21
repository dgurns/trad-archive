import { EntityType } from "@prisma/client";
import { json, type LoaderFunction } from "@remix-run/node";
import { type Entity } from "~/types";
import { db } from "~/utils/db.server";

interface LoaderData {
	error?: string;
	results?: Entity[];
}

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const searchTerm = url.searchParams.get("searchTerm") || "";
	let entityTypes = url.searchParams.getAll("entityTypes");
	if (entityTypes.length === 0) {
		entityTypes = [
			EntityType.Person,
			EntityType.Instrument,
			EntityType.Place,
			EntityType.Tune,
			EntityType.Collection,
			EntityType.AudioItem,
		];
	}
	const take = Number(url.searchParams.get("take") ?? 24);

	if (searchTerm.length < 3) {
		return json<LoaderData>(
			{ error: "Must include a search term of at least 3 letters" },
			{ status: 400 }
		);
	}
	const cleanedSearchTerm = searchTerm.toLowerCase();
	const takeFromEach = Math.round(take / entityTypes.length);

	const personQuery = db.person.findMany({
		include: {
			createdByUser: true,
		},
		where: {
			OR: [
				{
					name: {
						contains: cleanedSearchTerm,
					},
				},
				{ aliases: { contains: cleanedSearchTerm } },
				{ description: { contains: cleanedSearchTerm } },
			],
		},
		take: takeFromEach,
	});
	const instrumentQuery = db.instrument.findMany({
		include: {
			createdByUser: true,
		},
		where: {
			OR: [
				{
					name: {
						contains: cleanedSearchTerm,
					},
				},
				{ aliases: { contains: cleanedSearchTerm } },
				{ description: { contains: cleanedSearchTerm } },
			],
		},
		take: takeFromEach,
	});
	const placeQuery = db.place.findMany({
		include: {
			createdByUser: true,
		},
		where: {
			OR: [
				{
					name: {
						contains: cleanedSearchTerm,
					},
				},
				{ aliases: { contains: cleanedSearchTerm } },
				{ description: { contains: cleanedSearchTerm } },
			],
		},
		take: takeFromEach,
	});
	const tuneQuery = db.tune.findMany({
		include: {
			createdByUser: true,
		},
		where: {
			OR: [
				{
					name: {
						contains: cleanedSearchTerm,
					},
				},
				{ aliases: { contains: cleanedSearchTerm } },
				{ theSessionTuneId: { equals: cleanedSearchTerm } },
			],
		},
		take: takeFromEach,
	});
	const collectionQuery = db.collection.findMany({
		include: {
			createdByUser: true,
		},
		where: {
			OR: [
				{
					name: {
						contains: cleanedSearchTerm,
					},
				},
				{ aliases: { contains: cleanedSearchTerm } },
				{ description: { contains: cleanedSearchTerm } },
			],
		},
		take: takeFromEach,
	});
	const audioItemQuery = db.audioItem.findMany({
		include: {
			createdByUser: true,
		},
		where: {
			OR: [
				{
					name: {
						contains: cleanedSearchTerm,
					},
				},
				{ aliases: { contains: cleanedSearchTerm } },
				{ description: { contains: cleanedSearchTerm } },
			],
		},
		take: takeFromEach,
	});

	// Determine which queries to make
	const queryPromises: Promise<Entity[]>[] = [];
	for (const entityType of entityTypes) {
		switch (entityType) {
			case EntityType.Person:
				queryPromises.push(personQuery);
				break;
			case EntityType.Tune:
				queryPromises.push(tuneQuery);
				break;
			case EntityType.Instrument:
				queryPromises.push(instrumentQuery);
				break;
			case EntityType.Place:
				queryPromises.push(placeQuery);
				break;
			case EntityType.Collection:
				queryPromises.push(collectionQuery);
				break;
			case EntityType.AudioItem:
				queryPromises.push(audioItemQuery);
				break;
			default:
				break;
		}
	}

	const queryResults = await Promise.all(queryPromises);
	const results = queryResults.reduce(
		(prevVal, curVal) => [...prevVal, ...curVal],
		[]
	);
	return json<LoaderData>({ results }, { status: 200 });
};
