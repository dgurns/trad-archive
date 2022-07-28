import { EntityType, type Tag } from "@prisma/client";
import { type ActionFunction, json, redirect } from "@remix-run/node";
import { getSession } from "~/sessions.server";
import { db } from "~/utils/db.server";

interface ActionData {
	error?: string;
	tag?: Tag;
	tagInverse?: Tag;
}

export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const userId = String(session.get("userId") ?? "");
	const referer = String(request.headers.get("referer") ?? "");

	const redirectTo = encodeURIComponent(
		referer ? new URL(referer).pathname : "/"
	);
	if (!userId) {
		return redirect(`/login?redirectTo=${redirectTo}`);
	}

	const formData = await request.formData();
	const relationshipId = String(formData.get("relationshipId") ?? "");
	const inverseRelationshipId = String(
		formData.get("inverseRelationshipId") ?? ""
	);
	const subjectEntityType = String(formData.get("subjectEntityType") ?? "");
	const subjectEntityId = String(formData.get("subjectEntityId") ?? "");
	const objectEntityType = String(formData.get("objectEntityType") ?? "");
	const objectEntityId = String(formData.get("objectEntityId") ?? "");
	const rawSubjectTimeMarkerSeconds = String(
		formData.get("subjectTimeMarkerSeconds") ?? ""
	);
	const subjectTimeMarkerSeconds =
		rawSubjectTimeMarkerSeconds === ""
			? undefined
			: Number(rawSubjectTimeMarkerSeconds);

	if (
		!relationshipId ||
		!inverseRelationshipId ||
		!subjectEntityType ||
		!subjectEntityId ||
		!objectEntityType ||
		!objectEntityId
	) {
		return json<ActionData>(
			{ error: "Missing required fields for creating Tag" },
			{ status: 400 }
		);
	}
	const [existing, existingInverse] = await Promise.all([
		db.tag.findFirst({
			where: {
				[`subject${subjectEntityType}Id`]: subjectEntityId,
				[`object${objectEntityType}Id`]: objectEntityId,
				relationshipId,
				subjectTimeMarkerSeconds:
					subjectEntityType === EntityType.AudioItem
						? subjectTimeMarkerSeconds
						: undefined,
			},
		}),
		db.tag.findFirst({
			where: {
				[`subject${objectEntityType}Id`]: objectEntityId,
				[`object${subjectEntityType}Id`]: subjectEntityId,
				relationshipId: inverseRelationshipId,
				subjectTimeMarkerSeconds:
					objectEntityType === EntityType.AudioItem
						? subjectTimeMarkerSeconds
						: undefined,
			},
		}),
	]);
	if (existing && existingInverse) {
		return json<ActionData>(
			{ error: "This Tag has already been created" },
			{ status: 400 }
		);
	}

	// Create the tag and its inverse if they don't already exist
	let tag: Tag | undefined;
	if (!existing) {
		tag = await db.tag.create({
			data: {
				[`subject${subjectEntityType}Id`]: subjectEntityId,
				[`object${objectEntityType}Id`]: objectEntityId,
				relationshipId,
				subjectTimeMarkerSeconds:
					subjectEntityType === EntityType.AudioItem
						? subjectTimeMarkerSeconds
						: undefined,
			},
		});
	}
	let tagInverse: Tag | undefined;
	if (!existingInverse) {
		tagInverse = await db.tag.create({
			data: {
				[`subject${objectEntityType}Id`]: objectEntityId,
				[`object${subjectEntityType}Id`]: subjectEntityId,
				relationshipId: inverseRelationshipId,
				subjectTimeMarkerSeconds:
					objectEntityType === EntityType.AudioItem
						? subjectTimeMarkerSeconds
						: undefined,
			},
		});
	}
	return json<ActionData>({ tag, tagInverse }, { status: 201 });
};
