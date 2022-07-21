import { useLoaderData, Link } from "@remix-run/react";
import type { DataFunctionArgs } from "@remix-run/node";

import { db } from "~/utils/db.server";
import { ViewAs, type AudioItemWithRelations } from "~/types";
import EntityService from "~/services/Entity";
import Layout from "~/components/Layout";
import AudioItemComponent from "~/components/AudioItem";
import Breadcrumb from "~/components/Breadcrumb";

interface LoaderData {
	audioItem: AudioItemWithRelations;
}

export async function loader({
	params,
}: DataFunctionArgs): Promise<LoaderData> {
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
	const { audioItem } = useLoaderData<LoaderData>();

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
				<div className="flex flex-row mb-6">
					<Link to={EntityService.makeHrefForAbout(audioItem)}>About</Link>
				</div>
			</div>
			<AudioItemComponent audioItem={audioItem} viewAs={ViewAs.Cards} />
		</Layout>
	);
};

export default ViewAudioItemBySlug;
