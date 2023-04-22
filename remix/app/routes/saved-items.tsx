import { Link } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { typedjson, useTypedLoaderData, redirect } from "remix-typedjson";

import useFilters from "~/hooks/useFilters";
import { type AudioItemWithRelations, ViewAs, SortBy } from "~/types";
import { db } from "~/utils/db.server";
import { getSession } from "~/sessions.server";

import Layout from "~/components/Layout";
import AudioItem from "~/components/AudioItem";

export const loader = async ({ request }: LoaderArgs) => {
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

	// Get saved items from old to new. Also fetch total for use in the UI.
	const [savedItems, totalSavedItems] = await Promise.all([
		db.savedItem.findMany({
			where: {
				userId,
			},
			skip: (page - 1) * perPage,
			take: perPage,
			orderBy: {
				createdAt: "asc",
			},
		}),
		db.savedItem.count({ where: { userId } }),
	]);
	const savedAudioItemIds = savedItems.map((s) => s.audioItemId);

	const audioItems = await db.audioItem.findMany({
		where: {
			id: {
				in: savedAudioItemIds,
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
	});

	// the IN operator does not guarantee order so we need to manually order them
	const orderedAudioItems: AudioItemWithRelations[] = [];
	for (let id of savedAudioItemIds) {
		for (let a of audioItems) {
			if (a.id === id) {
				orderedAudioItems.push(a);
				break;
			}
		}
	}

	return typedjson({ savedItems: orderedAudioItems, totalSavedItems });
};

export const action = async ({ request }: ActionArgs) => {
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
	return typedjson({ ok: true }, { status: 200 });
};

export default function SavedItems() {
	const { savedItems, totalSavedItems } = useTypedLoaderData<typeof loader>();

	const { Filters, filtersProps, viewAs } = useFilters({
		totalItems: totalSavedItems,
		defaultViewAs: ViewAs.Compact,
	});

	return (
		<Layout>
			<div className="flex flex-col">
				<h1 className="mb-6">Saved Items</h1>

				{savedItems.length > 0 && (
					<Filters
						{...filtersProps}
						sortByOptions={[SortBy.DateSavedOldToNew]}
						sortBy={SortBy.DateSavedOldToNew}
						className="mb-6"
					/>
				)}

				{savedItems.length === 0 && (
					<div className="text-gray-500">
						Nothing saved yet - try browsing some{" "}
						<Link to="/">Audio Items</Link>!
					</div>
				)}

				{savedItems.map((s, index) => (
					<AudioItem
						viewAs={viewAs}
						audioItem={s}
						key={index}
						className={viewAs === ViewAs.List ? "mb-4" : "mb-6"}
					/>
				))}
			</div>
		</Layout>
	);
}
