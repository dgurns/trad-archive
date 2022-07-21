import { Link, useLoaderData } from "@remix-run/react";
import { json, redirect, type LoaderFunction } from "@remix-run/node";

import useFilters from "~/hooks/useFilters";
import { ViewAs, type SavedItemWithRelations } from "~/types";
import { db } from "~/utils/db.server";
import { getSession } from "~/sessions.server";

import Layout from "~/components/Layout";
import AudioItem from "~/components/AudioItem";

interface LoaderData {
	savedItems: SavedItemWithRelations[];
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
	const savedItems = await db.savedItem.findMany({
		where: { userId },
		include: {
			audioItem: {
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
					},
				},
			},
		},
		skip: (page - 1) * perPage,
		take: perPage,
	});
	return json<LoaderData>({ savedItems });
};

export default function SavedItems() {
	const { savedItems } = useLoaderData<LoaderData>();

	const { Filters, filtersProps, viewAs } = useFilters({
		defaultViewAs: ViewAs.List,
	});

	return (
		<Layout>
			<div className="flex flex-col">
				<h1 className="mb-6">Saved Items</h1>

				{savedItems.length > 0 && (
					<Filters {...filtersProps} className="mb-6" />
				)}

				{savedItems.length === 0 && (
					<div className="text-gray-500">
						Nothing saved yet - try browsing some{" "}
						<Link to="/">Audio Items</Link>!
					</div>
				)}

				{savedItems.map(({ audioItem }, index) => (
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
