import { useLoaderData } from "@remix-run/react";
import type { DataFunctionArgs } from "@remix-run/node";
import type { Prisma, Person } from "@prisma/client";

import { type AudioItemWithRelations, SortBy } from "~/types";
import { db } from "~/utils/db.server";
import Layout from "~/components/Layout";
import ViewEntityAndAudioItems from "~/components/ViewEntityAndAudioItems";

interface LoaderData {
	person: Person;
	audioItems: AudioItemWithRelations[];
	totalAudioItems: number;
}

export async function loader({
	params,
	request,
}: DataFunctionArgs): Promise<LoaderData> {
	const { slug } = params;
	const person = await db.person.findUnique({
		where: {
			slug,
		},
	});
	if (!person) {
		throw new Response("Not Found", {
			status: 404,
			statusText: "Could not find this Person",
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
						subjectPersonId: person.id,
					},
				},
			},
			orderBy: audioItemsOrderBy,
		}),
		db.audioItem.count({
			where: {
				tagsAsObject: {
					some: {
						subjectPersonId: person.id,
					},
				},
			},
		}),
	]);
	return {
		person,
		audioItems,
		totalAudioItems,
	};
}

const ViewPersonBySlug = () => {
	const { person, audioItems, totalAudioItems } = useLoaderData<LoaderData>();

	return (
		<Layout>
			<ViewEntityAndAudioItems
				entity={person}
				audioItems={audioItems}
				totalAudioItems={totalAudioItems}
			/>
		</Layout>
	);
};

export default ViewPersonBySlug;
