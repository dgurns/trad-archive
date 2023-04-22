import { useLoaderData } from "@remix-run/react";
import type { DataFunctionArgs } from "@remix-run/node";

import { db } from "~/utils/db.server";
import { ViewAs, type AudioItemWithRelations } from "~/types";
import EntityService from "~/services/Entity";
import { getSession } from "~/sessions.server";

import Layout from "~/components/Layout";
import AudioItemComponent from "~/components/AudioItem";
import Breadcrumb from "~/components/Breadcrumb";

export async function loader({ request, params }: DataFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const userId = String(session.get("userId") ?? "");

	const { slug } = params;
	const audioItem = await db.audioItem.findUnique({
		where: {
			slug,
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
	if (!audioItem) {
		throw new Response("Not Found", {
			status: 404,
			statusText: "Could not find this AudioItem",
		});
	}
	return {
		audioItem,
	};
}

const ViewAudioItemBySlug = () => {
	const { audioItem } = useLoaderData<typeof loader>();

	return (
		<Layout>
			<div className="mb-6">
				<Breadcrumb
					items={[
						{
							label: EntityService.makeReadableNamePlural(audioItem),
							href: EntityService.makeHrefForTopLevel(audioItem),
						},
						{ label: audioItem.name },
					]}
					className="mb-2"
				/>
			</div>

			<AudioItemComponent
				audioItem={audioItem}
				viewAs={ViewAs.Cards}
				showTitle={false}
			/>

			<div className="mt-8 text-sm">
				<a
					href={`https://itma-atom.arkivum.net/index.php/${audioItem.itmaAtomSlug}`}
					target="_blank"
					rel="noreferrer"
				>
					View in ITMA AtoM catalog ↗
				</a>
			</div>
		</Layout>
	);
};

export default ViewAudioItemBySlug;
