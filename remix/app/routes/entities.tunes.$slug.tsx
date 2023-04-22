import type { LoaderArgs } from "@remix-run/node";
import type { Prisma } from "@prisma/client";
import { typedjson, useTypedLoaderData } from "remix-typedjson";

import { SortBy } from "~/types";
import { db } from "~/utils/db.server";
import { getSession } from "~/sessions.server";
import Layout from "~/components/Layout";
import ViewEntityAndAudioItems from "~/components/ViewEntityAndAudioItems";

export async function loader({ params, request }: LoaderArgs) {
	const { slug } = params;
	const tune = await db.tune.findUnique({
		where: {
			slug,
		},
	});
	if (!tune) {
		throw new Response("Not Found", {
			status: 404,
			statusText: "Could not find this Tune",
		});
	}

	const session = await getSession(request.headers.get("Cookie"));
	const userId = String(session.get("userId") ?? "");

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
			where: {
				tagsAsObject: {
					some: {
						subjectTuneId: tune.id,
					},
				},
			},
			orderBy: audioItemsOrderBy,
		}),
		db.audioItem.count({
			where: {
				tagsAsObject: {
					some: {
						subjectTuneId: tune.id,
					},
				},
			},
		}),
	]);
	return typedjson({
		tune,
		audioItems,
		totalAudioItems,
	});
}

const ViewTuneBySlug = () => {
	const { tune, audioItems, totalAudioItems } =
		useTypedLoaderData<typeof loader>();

	return (
		<Layout>
			<ViewEntityAndAudioItems
				entity={tune}
				audioItems={audioItems}
				totalAudioItems={totalAudioItems}
			/>
		</Layout>
	);
};

export default ViewTuneBySlug;
