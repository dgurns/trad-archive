import { useLoaderData } from "@remix-run/react";
import type { DataFunctionArgs } from "@remix-run/node";
import type { Prisma, Collection } from "@prisma/client";

import { type AudioItemWithRelations, SortBy } from "~/types";
import { db } from "~/utils/db.server";
import Layout from "~/components/Layout";
import ViewEntityAndAudioItems from "~/components/ViewEntityAndAudioItems";

interface LoaderData {
	collection: Collection;
	audioItems: AudioItemWithRelations[];
	totalAudioItems: number;
}

export async function loader({
	params,
	request,
}: DataFunctionArgs): Promise<LoaderData> {
	const { slug } = params;
	const collection = await db.collection.findUnique({
		where: {
			slug,
		},
	});
	if (!collection) {
		throw new Response("Not Found", {
			status: 404,
			statusText: "Could not find this Collection",
		});
	}
	const { searchParams } = new URL(request.url);
	const page = Number(searchParams.get("page") ?? 1);
	const perPage = Number(searchParams.get("perPage") ?? 20);
	const sortBy = searchParams.get("sortBy") ?? SortBy.DateAddedOldToNew;
	const audioItemsOrderBy: Prisma.Enumerable<Prisma.AudioItemOrderByWithRelationInput> =
		sortBy === SortBy.DateAddedOldToNew
			? { createdAt: "asc" }
			: { createdAt: "desc" };

	const [audioItems, totalAudioItems] = await Promise.all([
		db.audioItem.findMany({
			take: perPage,
			skip: perPage * (page - 1),
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
				savedItems: true,
			},
			where: {
				tagsAsObject: {
					some: {
						subjectCollectionId: collection.id,
					},
				},
			},
			orderBy: audioItemsOrderBy,
		}),
		db.audioItem.count({
			where: {
				tagsAsObject: {
					some: {
						subjectCollectionId: collection.id,
					},
				},
			},
		}),
	]);
	return {
		collection,
		audioItems,
		totalAudioItems,
	};
}

const ViewCollectionBySlug = () => {
	const { collection, audioItems, totalAudioItems } =
		useLoaderData<LoaderData>();

	return (
		<Layout>
			<ViewEntityAndAudioItems
				entity={collection}
				audioItems={audioItems}
				totalAudioItems={totalAudioItems}
			/>
		</Layout>
	);
};

export default ViewCollectionBySlug;
