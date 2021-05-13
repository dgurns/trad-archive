import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

import { EntityFragments } from "fragments";
import { Tune } from "types";
import useAudioItemsTaggedWithEntity from "hooks/useAudioItemsTaggedWithEntity";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";
import AudioItemComponent from "components/AudioItem";
import TagWithRelationshipToObject from "components/TagWithRelationshipToObject";
import AddTagButton from "components/AddTagButton";
import EditTagsButton from "components/EditTagsButton";

const TUNE_QUERY = gql`
	query Tune($slug: String!) {
		tune(slug: $slug) {
			...Tune
		}
	}
	${EntityFragments.tune}
`;

const ViewTuneBySlug = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data: tuneData, error: tuneError } = useQuery<{ tune: Tune }>(
		TUNE_QUERY,
		{
			variables: { slug },
			skip: !slug,
			fetchPolicy: "cache-and-network",
		}
	);

	const [
		audioItems = [],
		{ loading: audioItemsLoading, error: audioItemsError },
		fetchNextPageOfAudioItems,
	] = useAudioItemsTaggedWithEntity({ entity: tuneData?.tune });

	let statusMessage;
	if (!tuneData && !tuneError) {
		statusMessage = <LoadingBlock />;
	} else if (!tuneData && tuneError) {
		statusMessage = `Error fetching Tune with slug ${slug}`;
	}

	if (statusMessage) {
		return <Layout>{statusMessage}</Layout>;
	}

	const { tune } = tuneData;
	const {
		name,
		entityType,
		aliases,
		tags,
		theSessionTuneId,
		type,
		mode,
		meter,
		abc,
	} = tune;

	const shouldShowAudioItems = audioItems.length > 0;
	const noAudioItemsFound =
		!audioItemsLoading && !audioItemsError && audioItems.length === 0;

	return (
		<Layout>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-1 flex-col mb-8">
					<h1 className="mb-4">Audio Items Tagged with "{name}"</h1>
					{shouldShowAudioItems && (
						<>
							{audioItems.map((audioItem, index) => (
								<AudioItemComponent audioItem={audioItem} key={index} />
							))}
							{!audioItemsLoading && (
								<button
									className="btn-text"
									onClick={fetchNextPageOfAudioItems}
								>
									Load More
								</button>
							)}
						</>
					)}
					{audioItemsLoading && <LoadingBlock />}
					{noAudioItemsFound && <div className="text-gray-500">None yet</div>}
					{audioItemsError && (
						<div className="text-red-600">Error fetching Audio Items</div>
					)}
				</div>

				<div className="flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300">
					<h1 className="mb-4">About {name}</h1>
					<div className="mb-4">
						Entity Type:
						<br />
						<span className="text-gray-500">{entityType}</span>
					</div>
					<div className="italic text-gray-500">
						We source all of our Tune data from a wonderful community project
						called The Session.
					</div>
					<a
						className="mb-4"
						href={`https://thesession.org/tunes/${theSessionTuneId}`}
						target="_blank"
					>
						View or Edit This Tune on The Session{" "}
						<i className="material-icons text-sm">launch</i>
					</a>
					<div className="mb-4">
						Aliases:
						<br />
						<span className="text-gray-500">{aliases}</span>
					</div>
					<div className="mb-4">
						Type:
						<br />
						<span className="text-gray-500">{type}</span>
					</div>
					<div className="mb-4">
						Meter:
						<br />
						<span className="text-gray-500">{meter}</span>
					</div>
					<div className="mb-4">
						Mode:
						<br />
						<span className="text-gray-500">{mode}</span>
					</div>
					<div className="mb-4">
						ABC:
						<br />
						<span className="text-gray-500">{abc}</span>
					</div>

					<h1 className="mt-8 mb-4">Tags</h1>
					{tags.map((tag, index) => (
						<TagWithRelationshipToObject
							tag={tag}
							key={index}
							className="mb-4"
						/>
					))}
					<div>
						<AddTagButton entity={tune} />
						{tags.length > 0 && (
							<>
								<span className="text-gray-500 px-2">/</span>
								<EditTagsButton entity={tune} />
							</>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ViewTuneBySlug;
