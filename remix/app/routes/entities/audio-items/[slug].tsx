import { useNavigate } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { useQuery, gql } from "@apollo/client";

import { EntityFragments } from "~/fragments";
import type { AudioItem } from "~/types";
import { ViewAs } from "~/types";
import EntityService from "~/services/Entity";

import Layout from "~/components/Layout";
import LoadingBlock from "~/components/LoadingBlock";
import Breadcrumb from "~/components/Breadcrumb";
import AudioItemComponent from "~/components/AudioItem";

export const AUDIO_ITEM_QUERY = gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;

const ViewAudioItemBySlug = () => {
	const navigate = useNavigate();
	const { slug } = navigate.query;

	const { data, error } = useQuery<{
		audioItem: AudioItem;
	}>(AUDIO_ITEM_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const { audioItem } = data ?? {};
	const { name } = audioItem ?? {};

	return (
		<Layout pageTitle={`Trad Archive - ${name ?? ""}`}>
			{!data && !error && <LoadingBlock />}
			{error && <span className="text-red-500">{error.message}</span>}
			{data && (
				<div className="mb-6">
					<Breadcrumb
						items={[
							{
								label: EntityService.makeReadableNamePlural(audioItem),
								href: EntityService.makeHrefForTopLevel(audioItem),
							},
							{ label: name },
						]}
						className="mb-2"
					/>
					<div className="flex flex-row mb-6">
						<Link to={EntityService.makeHrefForAbout(audioItem)}>About</Link>
					</div>
					<AudioItemComponent
						viewAs={ViewAs.Cards}
						audioItem={audioItem}
						showTitle={false}
					/>
				</div>
			)}
		</Layout>
	);
};

export default ViewAudioItemBySlug;
