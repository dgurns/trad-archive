import { type Comment } from "@prisma/client";
import { type ActionFunction, json, redirect } from "@remix-run/node";
import { getSession } from "~/sessions.server";
import { db } from "~/utils/db.server";

interface ActionData {
	error?: string;
	comment?: Comment;
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
	const text = String(formData.get("text") ?? "");
	const parentAudioItemId = String(formData.get("parentAudioItemId") ?? "");
	let error;
	if (!text) {
		error = "Comment cannot be empty";
	} else if (!parentAudioItemId) {
		error = "Parent audio item ID not defined";
	}
	if (error) {
		return json<ActionData>({ error }, { status: 400 });
	}
	const comment = await db.comment.create({
		data: {
			text,
			parentAudioItemId,
			createdByUserId: userId,
		},
	});
	return json<ActionData>({ comment }, { status: 201 });
};
