import { useLoaderData } from "@remix-run/react";
import type { DataFunctionArgs } from "@remix-run/node";
import type { Prisma, Instrument } from "@prisma/client";

import { type AudioItemWithRelations, SortBy } from "~/types";
import { db } from "~/utils/db.server";
import Layout from "~/components/Layout";
import ViewEntityAndAudioItems from "~/components/ViewEntityAndAudioItems";

interface LoaderData {
	instrument: Instrument;
	audioItems: AudioItemWithRelations[];
	totalAudioItems: number;
}

export async function loader({
	params,
	request,
}: DataFunctionArgs): Promise<LoaderData> {
	const { slug } = params;
	const instrument = await db.instrument.findUnique({
		where: {
			slug,
		},
	});
	if (!instrument) {
		throw new Response("Not Found", {
			status: 404,
			statusText: "Could not find this Instrument",
		});
	}
	const { searchParams } = new URL(request.url);
	const page = Number(searchParams.get("page") ?? 1);
	const perPage = Number(searchParams.get("perPage") ?? 20);
	const sortBy = searchParams.get("sortBy") ?? SortBy.RecentlyTagged;
	const audioItemsOrderBy: Prisma.Enumerable<Prisma.AudioItemOrderByWithRelationInput> =
		sortBy === SortBy.RecentlyTagged
			? { updatedAt: "desc" }
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
			},
			where: {
				tagsAsObject: {
					some: {
						subjectInstrumentId: instrument.id,
					},
				},
			},
			orderBy: audioItemsOrderBy,
		}),
		db.audioItem.count({
			where: {
				tagsAsObject: {
					some: {
						subjectInstrumentId: instrument.id,
					},
				},
			},
		}),
	]);
	return {
		instrument,
		audioItems,
		totalAudioItems,
	};
}

const ViewInstrumentBySlug = () => {
	const { instrument, audioItems, totalAudioItems } =
		useLoaderData<LoaderData>();

	return (
		<Layout>
			<ViewEntityAndAudioItems
				entity={instrument}
				audioItems={audioItems}
				totalAudioItems={totalAudioItems}
			/>
		</Layout>
	);
};

export default ViewInstrumentBySlug;
