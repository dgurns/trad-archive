import { type EntityType, type Relationship } from "@prisma/client";
import { json, type LoaderFunction } from "@remix-run/node";
import { db } from "~/utils/db.server";

interface LoaderData {
	relationships?: Relationship[];
	error?: string;
}

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const subjectEntityType = url.searchParams.get("subjectEntityType");
	const objectEntityType = url.searchParams.get("objectEntityType");
	if (!subjectEntityType || !objectEntityType) {
		return json<LoaderData>(
			{ error: "Must specify subject entity type and object entity type" },
			{ status: 400 }
		);
	}
	const relationships = await db.relationship.findMany({
		where: {
			subjectEntityType: subjectEntityType as EntityType,
			objectEntityType: objectEntityType as EntityType,
		},
	});
	return json<LoaderData>({ relationships }, { status: 200 });
};
