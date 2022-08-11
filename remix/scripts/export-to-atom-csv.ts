import fs from "fs";
import os from "os";
import { type Tune } from "@prisma/client";
import { type AudioItemWithRelations } from "../app/types";
import DateTimeService from "../app/services/DateTime";
import Tag from "../app/services/Tag";
import { db } from "../app/utils/db.server";
import { EntityType } from "@prisma/client";

// exportToAtomCsv fetches AudioItems from the locally exposed DB, organizes the
// crowdsourced tags and comments, and exports to a CSV where you can compare
// the ITMA notes with the crowdsourced notes. Ultimately this CSV might serve
// as a staging area for importing crowdsourced data to AtoM.

async function exportToAtomCsv() {
	console.log("Fetching data...");
	const recentTags = await db.tag.findMany({
		select: {
			subjectAudioItemId: true,
		},
		where: {
			subjectAudioItemId: {
				not: null,
			},
		},
		distinct: ["subjectAudioItemId"],
		orderBy: {
			createdAt: "desc",
		},
		skip: 0,
		take: 20,
	});
	const recentlyTaggedAudioItemIds: string[] = [];
	for (const r of recentTags) {
		if (r.subjectAudioItemId) {
			recentlyTaggedAudioItemIds.push(r.subjectAudioItemId);
		}
	}

	const audioItems = await db.audioItem.findMany({
		where: {
			id: {
				in: recentlyTaggedAudioItemIds,
			},
		},
		include: {
			tagsAsSubject: {
				include: {
					objectAudioItem: true,
					objectCollection: true,
					objectInstrument: true,
					objectPerson: true,
					objectPlace: true,
					objectTune: true,
					relationship: true,
				},
			},
			createdByUser: true,
			updatedByUser: true,
			comments: {
				include: {
					createdByUser: true,
				},
				orderBy: {
					createdAt: "asc",
				},
			},
			savedItems: true,
		},
	});

	// the IN operator does not guarantee order so we need to manually order them
	const orderedAudioItems: AudioItemWithRelations[] = [];
	for (let id of recentlyTaggedAudioItemIds) {
		for (let a of audioItems) {
			if (a.id === id) {
				orderedAudioItems.push(a);
				break;
			}
		}
	}

	console.log("Creating CSV...");

	const csvRows: Array<[string, string, string, string]> = [
		[
			"atomId",
			"title",
			"originalScopeAndContent",
			"crowdsourcedScopeAndContent",
		],
	];
	// This is extremely messy for now - just creating a POC
	for (const a of orderedAudioItems) {
		const tagsWithoutTimestamps = a.tagsAsSubject.filter(
			(t) => typeof t.subjectTimeMarkerSeconds !== "number"
		);
		const tagsWithTimestamps = a.tagsAsSubject
			.filter((t) => typeof t.subjectTimeMarkerSeconds === "number")
			.sort(
				(a, b) =>
					(a.subjectTimeMarkerSeconds ?? 0) - (b.subjectTimeMarkerSeconds ?? 0)
			);
		const crowdsourcedInfo = `${
			tagsWithoutTimestamps.length > 0
				? `Tags: 
${tagsWithoutTimestamps
	.map((t) => {
		const objectEntity = Tag.getObjectEntity(t);
		if (!objectEntity) {
			return "";
		}
		const { name, entityType } = objectEntity;
		const label =
			entityType === EntityType.Tune ? (objectEntity as Tune).type : entityType;
		return `${name} (${label})`;
	})
	.join(", ")}`
				: ""
		}
${
	a.comments.length > 0
		? `
Comments: 
${a.comments.map((c) => c.text).join("\n")}`
		: ""
}

${
	tagsWithTimestamps.length > 0
		? tagsWithTimestamps
				.map((t) => {
					const timestamp = DateTimeService.formatSecondsAsDuration(
						t.subjectTimeMarkerSeconds ?? 0
					);
					const objectEntity = Tag.getObjectEntity(t);
					if (!objectEntity) {
						return "";
					}
					const { name, entityType } = objectEntity;
					const label =
						entityType === EntityType.Tune
							? (objectEntity as Tune).type
							: entityType;
					return `${timestamp} | ${name} (${label})`;
				})
				.join("\n")
		: ""
}
`;

		// Within each cell, we need to replace " with "" so they're escaped
		function clean(input: string | null) {
			if (!input) {
				return "";
			}
			return input.replace(/"/g, '""');
		}
		// Each cell should be surrounded by double quotes so that internal commas
		// are escaped and not interpreted to be new cells
		const row: [string, string, string, string] = [
			`"${clean(a.itmaAtomSlug)}"`,
			`"${clean(a.name)}"`,
			`"${clean(a.description)}"`,
			`"${clean(crowdsourcedInfo)}"`,
		];
		csvRows.push(row);
	}

	const csvContent = csvRows.map((e) => e.join(",")).join("\n");

	fs.writeFileSync(`${os.homedir()}/Downloads/export.csv`, csvContent);
	console.log(
		`✅ Successfully exported ${orderedAudioItems.length} AudioItems to CSV file at ~/Downloads/export.csv`
	);
	process.exit(0);
}

exportToAtomCsv();
