import { Link, useLoaderData } from "@remix-run/react";
import {
	type ActionFunction,
	json,
	redirect,
	type LoaderFunction,
} from "@remix-run/node";

import useFilters from "~/hooks/useFilters";
import { type AudioItemWithRelations, ViewAs } from "~/types";
import { db } from "~/utils/db.server";
import { getSession } from "~/sessions.server";

import Layout from "~/components/Layout";
import AudioItem from "~/components/AudioItem";

interface LoaderData {
	audioItems: AudioItemWithRelations[];
}

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const userId = String(session.get("userId") ?? "");

	const { pathname, searchParams } = new URL(request.url);
	const redirectParams = new URLSearchParams({
		redirectTo: pathname,
	});
	if (!userId) {
		return redirect(`/login?${redirectParams.toString()}`);
	}

	const page = Number(searchParams.get("page") ?? 1);
	const perPage = Number(searchParams.get("perPage") ?? 20);
	const audioItems = await db.audioItem.findMany({
		where: {
			savedItems: {
				some: {
					userId,
				},
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
			savedItems: {
				where: {
					userId,
				},
			},
		},
		skip: (page - 1) * perPage,
		take: perPage,
	});

	return json<LoaderData>({ audioItems });
};

interface ActionData {
	error?: string;
	ok: boolean;
}

export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const userId = String(session.get("userId") ?? "");
	const referer = String(request.headers.get("referer") ?? "");
	const redirectParams = new URLSearchParams({
		redirectTo: referer ? new URL(referer).pathname : "/",
	});
	if (!userId) {
		return redirect(`/login?${redirectParams.toString()}`);
	}

	const formData = await request.formData();
	const audioItemId = String(formData.get("audioItemId") ?? "");
	const existing = await db.savedItem.findUnique({
		where: {
			userId_audioItemId: {
				userId,
				audioItemId,
			},
		},
	});
	if (existing) {
		await db.savedItem.delete({ where: { id: existing.id } });
	} else {
		await db.savedItem.create({ data: { userId, audioItemId } });
	}
	return json<ActionData>({ ok: true }, { status: 200 });
};

export default function SavedItems() {
	const { audioItems } = useLoaderData<LoaderData>();

	const { Filters, filtersProps, viewAs } = useFilters({
		defaultViewAs: ViewAs.Compact,
	});

	return (
		<Layout>
			<div className="flex flex-col">
				<h1 className="mb-6">Saved Items</h1>

				{audioItems.length > 0 && (
					<Filters {...filtersProps} className="mb-6" />
				)}

				{audioItems.length === 0 && (
					<div className="text-gray-500">
						Nothing saved yet - try browsing some{" "}
						<Link to="/">Audio Items</Link>!
					</div>
				)}

				{audioItems.map((audioItem, index) => (
					<AudioItem
						viewAs={viewAs}
						audioItem={audioItem}
						key={index}
						className={viewAs === ViewAs.List ? "mb-4" : "mb-6"}
					/>
				))}
			</div>
		</Layout>
	);
}
