import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

import { EntityFragments } from "fragments";
import { Place, ViewAs } from "types";
import useAudioItemsTaggedWithEntity from "hooks/useAudioItemsTaggedWithEntity";
import useFilters from "hooks/useFilters";
import TagService from "services/Tag";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";
import AudioItem from "components/AudioItem";
import TagWithRelationshipToObject from "components/TagWithRelationshipToObject";
import AddTagButton from "components/AddTagButton";
import EditTagsButton from "components/EditTagsButton";

const PLACE_QUERY = gql`
	query Place($slug: String!) {
		place(slug: $slug) {
			...Place
		}
	}
	${EntityFragments.place}
`;

const ViewPlaceBySlug = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data: placeData, error: placeError } = useQuery<{ place: Place }>(
		PLACE_QUERY,
		{
			variables: { slug },
			skip: !slug,
			fetchPolicy: "cache-and-network",
		}
	);
	const { place } = placeData ?? {};
	const { name, aliases, description, tags, latitude, longitude } = place ?? {};
	const sortedTags = TagService.sort(tags);

	const [
		audioItems = [],
		{ loading: audioItemsLoading, error: audioItemsError },
		fetchNextPageOfAudioItems,
	] = useAudioItemsTaggedWithEntity({ entity: place });

	const { Filters, filtersProps, viewAs } = useFilters({
		defaultViewAs: ViewAs.Card,
	});

	const aboutMarkup = useMemo(
		() => (
			<>
				{description && (
					<div className="mb-4">
						Description:
						<br />
						<span className="text-gray-500">{description}</span>
					</div>
				)}
				{aliases && (
					<div className="mb-4">
						Aliases:
						<br />
						<span className="text-gray-500">{aliases}</span>
					</div>
				)}
				{latitude && longitude && (
					<div className="mb-4">
						Latitude and Longitude:
						<br />
						<span className="text-gray-500">
							{latitude},{longitude}
						</span>
						<br />
						<a
							href={`https://www.google.com/maps/@?api=1&map_action=map&zoom=12&center=${latitude},${longitude}`}
							target="_blank"
						>
							View on Map
						</a>
					</div>
				)}
				<Link href={`/entities/places/${slug}/edit`}>Edit</Link>
			</>
		),
		[aliases, description, slug, latitude, longitude]
	);

	const tagsMarkup = useMemo(
		() => (
			<>
				{sortedTags.map((tag, index) => (
					<TagWithRelationshipToObject tag={tag} key={index} className="mb-4" />
				))}
				<div>
					<AddTagButton entity={place} />
					{sortedTags.length > 0 && (
						<>
							<span className="text-gray-500 px-2">/</span>
							<EditTagsButton entity={place} />
						</>
					)}
				</div>
			</>
		),
		[sortedTags, place]
	);

	let statusMessage;
	if (!placeData && !placeError) {
		statusMessage = <LoadingBlock />;
	} else if (!placeData && placeError) {
		statusMessage = `Error fetching Place with slug ${slug}`;
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
						<Link href="/entities/places">
							<a className="mr-1">Places</a>
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

export default ViewPlaceBySlug;
