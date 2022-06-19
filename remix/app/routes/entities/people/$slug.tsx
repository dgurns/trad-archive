import { useLoaderData } from "@remix-run/react";
import type { DataFunctionArgs } from "@remix-run/node";
import type { Person } from "@prisma/client";

import type { AudioItemWithRelations } from "~/types";
import { db } from "~/utils/db.server";
import Layout from "~/components/Layout";
import ViewEntityAndAudioItems from "~/components/ViewEntityAndAudioItems";

interface LoaderData {
	person: Person;
	audioItems: AudioItemWithRelations[];
}

export async function loader({
	params,
	request,
}: DataFunctionArgs): Promise<LoaderData> {
	const url = new URL(request.url);
	const page = Number(url.searchParams.get("page") ?? 1);
	const perPage = Number(url.searchParams.get("perPage") ?? 20);
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
	const audioItems = await db.audioItem.findMany({
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
					subjectPersonId: person.id,
				},
			},
		},
		orderBy: {
			updatedAt: "desc",
		},
	});
	return {
		person,
		audioItems,
	};
}

const ViewPersonBySlug = () => {
	const { person, audioItems } = useLoaderData<LoaderData>();

	if (!person) {
		return <Layout>Can't find this Person.</Layout>;
	}

	return (
		<Layout>
			<ViewEntityAndAudioItems entity={person} audioItems={audioItems} />
		</Layout>
	);
};

export default ViewPersonBySlug;
