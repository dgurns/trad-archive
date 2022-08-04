import { UserRole } from "@prisma/client";
import { json, type ActionFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import DateTimeService from "~/services/DateTime";
import EntityService from "~/services/Entity";
import Tag from "~/services/Tag";
import { getSession } from "~/sessions.server";
import { db } from "~/utils/db.server";

interface LoaderData {
	error?: string;
	csvContent?: string;
}

export const loader: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const userId = String(session.get("userId") ?? "");
	const user = await db.user.findUnique({ where: { id: userId } });
	if (!user || user.role !== UserRole.Admin) {
		return json<LoaderData>({ error: "Must be an admin" }, { status: 400 });
	}

	// Get the most recent tags so we can fetch those AudioItem IDs
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

	const recentlyTaggedAudioItems = await db.audioItem.findMany({
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
		},
	});

	const csvRows: Array<[string, string, string, string]> = [
		[
			"atomId",
			"title",
			"originalScopeAndContent",
			"crowdsourcedScopeAndContent",
		],
	];
	// This is extremely messy for now - just creating a POC
	for (const a of recentlyTaggedAudioItems) {
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
	.map(
		(t) =>
			`${Tag.getObjectEntity(t)?.name} (${Tag.getObjectEntity(t)?.entityType})`
	)
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
				.map(
					(t) =>
						`${DateTimeService.formatSecondsAsDuration(
							t.subjectTimeMarkerSeconds ?? 0
						)} | ${Tag.getObjectEntity(t)?.name} (${
							Tag.getObjectEntity(t)?.entityType
						})`
				)
				.join("\n")
		: ""
}
`;
		const row: [string, string, string, string] = [
			`"${a.itmaAtomSlug ?? ""}"`,
			`"${a.name}"`,
			`"${a.description ?? ""}"`,
			`"${crowdsourcedInfo}"`,
		];
		csvRows.push(row);
	}

	const csvContent =
		"data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");

	return json<LoaderData>({ csvContent }, { status: 200 });
};

export default function ExportToAtomCsv() {
	const { csvContent, error } = useLoaderData();

	const downloadCsv = () => {
		if (!csvContent) {
			return;
		}
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "export_to_atom.csv");
		document.body.appendChild(link); // Required for FF
		link.click();
	};

	return (
		<Layout>
			{error && <p className="text-red-500">Error: {error}</p>}
			{csvContent && (
				<button className="link" onClick={downloadCsv}>
					Download Sample CSV
				</button>
			)}
		</Layout>
	);
}
