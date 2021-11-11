import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

import { EntityFragments } from "fragments";
import { Tune, FilterType, ViewAs } from "types";
import useAudioItemsTaggedWithEntity from "hooks/useAudioItemsTaggedWithEntity";
import useFilters from "hooks/useFilters";
import TagService from "services/Tag";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";
import AudioItem from "components/AudioItem";
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
	const { tune } = tuneData ?? {};
	const { name, aliases, tags, theSessionTuneId, type, mode, meter, abc } =
		tune ?? {};
	const sortedTags = TagService.sort(tags);

	const [
		audioItems = [],
		{ loading: audioItemsLoading, error: audioItemsError },
		fetchNextPageOfAudioItems,
	] = useAudioItemsTaggedWithEntity({ entity: tuneData?.tune });

	const { Filters, filtersProps, viewAs } = useFilters({
		types: [FilterType.ViewAs],
	});

	const aboutMarkup = useMemo(
		() => (
			<>
				{theSessionTuneId && (
					<div className="mb-4">
						<div className="italic text-gray-500">
							We source all of our Tune data from a wonderful community project
							called The Session.
						</div>
						<a
							href={`https://thesession.org/tunes/${theSessionTuneId}`}
							target="_blank"
						>
							View or Edit This Tune on The Session{" "}
							<i className="material-icons text-sm">launch</i>
						</a>
					</div>
				)}
				{aliases && (
					<div className="mb-4">
						Aliases:
						<br />
						<span className="text-gray-500">{aliases}</span>
					</div>
				)}
				{type && (
					<div className="mb-4">
						Type:
						<br />
						<span className="text-gray-500">{type}</span>
					</div>
				)}
				{meter && (
					<div className="mb-4">
						Meter:
						<br />
						<span className="text-gray-500">{meter}</span>
					</div>
				)}
				{mode && (
					<div className="mb-4">
						Mode:
						<br />
						<span className="text-gray-500">{mode}</span>
					</div>
				)}
				{abc && (
					<div className="mb-4">
						ABC:
						<br />
						<span className="text-gray-500">{abc}</span>
					</div>
				)}
			</>
		),
		[aliases, slug, theSessionTuneId, type, meter, mode, abc]
	);

	const tagsMarkup = useMemo(
		() => (
			<>
				{sortedTags.map((tag, index) => (
					<TagWithRelationshipToObject tag={tag} key={index} className="mb-4" />
				))}
				<div>
					<AddTagButton entity={tune} />
					{sortedTags.length > 0 && (
						<>
							<span className="text-gray-500 px-2">/</span>
							<EditTagsButton entity={tune} />
						</>
					)}
				</div>
			</>
		),
		[sortedTags, tune]
	);

	let statusMessage;
	if (!tuneData && !tuneError) {
		statusMessage = <LoadingBlock />;
	} else if (!tuneData && tuneError) {
		statusMessage = `Error fetching Tune with slug ${slug}`;
	}

	if (statusMessage) {
		return <Layout>{statusMessage}</Layout>;
	}

	const shouldShowAudioItems = audioItems.length > 0;
	const noAudioItemsFound =
		!audioItemsLoading && !audioItemsError && audioItems.length === 0;

	return (
		<Layout pageTitle={`Trad Archive - ${name}`}>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-1 flex-col mb-8">
					<div className="flex flex-row items-center mb-1">
						<Link href="/entities/tunes">
							<a className="mr-1">Tunes</a>
						</Link>
						<i className="material-icons text-gray-500 text-base">
							keyboard_arrow_right
						</i>
					</div>
					<h1 className="mb-6">{name}</h1>

					<div className="flex-col mb-8 md:hidden">{aboutMarkup}</div>

					{shouldShowAudioItems && (
						<>
							<Filters {...filtersProps} className="mb-6" />

							{audioItems.map((audioItem, index) => (
								<AudioItem
									viewAs={viewAs}
									audioItem={audioItem}
									key={index}
									className={viewAs === ViewAs.List ? "mb-4" : "mb-6"}
								/>
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
					{noAudioItemsFound && (
						<div className="text-gray-500">
							No Audio Items tagged with this yet
						</div>
					)}
					{audioItemsError && (
						<div className="text-red-600">Error fetching Audio Items</div>
					)}
				</div>

				<div className="hidden md:flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300">
					<h3 className="mb-4">About</h3>
					{aboutMarkup}
					<h3 className="mt-8 mb-4">Tags</h3>
					{tagsMarkup}
				</div>
			</div>
		</Layout>
	);
};

export default ViewTuneBySlug;
