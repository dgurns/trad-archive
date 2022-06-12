import { useEffect, useMemo, useCallback, useState } from "react";
import { gql } from "@apollo/client";
import { Link } from "@remix-run/react";

import { EntityStatus, SortBy, ViewAs } from "~/types";
import useAudioItems, { AUDIO_ITEMS_QUERY } from "~/hooks/useAudioItems";
import useComments, { COMMENTS_QUERY } from "~/hooks/useComments";
import useCollections, { COLLECTIONS_QUERY } from "~/hooks/useCollections";
import useFilters from "~/hooks/useFilters";
import EntityService from "~/services/Entity";
import CommentService from "~/services/Comment";
import LocalStorageService from "~/services/LocalStorage";

import Layout from "~/components/Layout";
import ProjectIntro from "~/components/ProjectIntro";
import AudioItemComponent from "~/components/AudioItem";
import LoadingBlock from "~/components/LoadingBlock";

const NUM_AUDIO_ITEMS_TO_FETCH = 10;
const NUM_COMMENTS_TO_FETCH = 6;
const NUM_COLLECTIONS_TO_FETCH = 5;

export default function Home() {
	const { Filters, filtersProps, sortBy, viewAs } = useFilters({
		defaultSortBy: SortBy.RecentlyTagged,
		defaultViewAs: ViewAs.Cards,
		enableQueryParams: false,
	});

	// These queries skip the initial network request if the cache was
	// pre-populated via static props
	const [
		fetchedAudioItems,
		{ loading: audioItemsLoading, error: audioItemsError },
		fetchNextPage,
	] = useAudioItems({
		sortBy,
		resultsPerPage: NUM_AUDIO_ITEMS_TO_FETCH,
		queryOptions: {
			fetchPolicy: "cache-only",
		},
	});
	const {
		comments: fetchedComments,
		commentsQuery: { loading: commentsLoading },
	} = useComments({
		resultsPerPage: NUM_COMMENTS_TO_FETCH,
		queryOptions: {
			fetchPolicy: "cache-only",
		},
	});
	const [fetchedCollections, { loading: collectionsLoading }] = useCollections({
		resultsPerPage: NUM_COLLECTIONS_TO_FETCH,
		sortBy: SortBy.RecentlyAdded,
		queryOptions: {
			fetchPolicy: "cache-only",
		},
	});

	const audioItems = fetchedAudioItems;

	const comments = useMemo(() => {
		const data = fetchedComments ?? [];
		const sorted = CommentService.sortByCreatedAtDesc(data);
		return sorted.slice(0, NUM_COMMENTS_TO_FETCH);
	}, [fetchedComments]);

	const collections = useMemo(() => {
		const data = fetchedCollections ?? [];
		return data.slice(0, NUM_COLLECTIONS_TO_FETCH);
	}, [fetchedCollections]);

	// Due to static rendering, we need to check localStorage for intro status
	// after client-side hydration.
	const [shouldShowIntro, setShouldShowIntro] = useState(false);
	useEffect(() => {
		if (LocalStorageService.getItem("SHOULD_SHOW_INTRO") !== "false") {
			setShouldShowIntro(true);
		}
	}, []);
	const onCloseIntro = useCallback(() => {
		LocalStorageService.setItem("SHOULD_SHOW_INTRO", "false");
		setShouldShowIntro(false);
	}, []);

	return (
		<Layout pageTitle="Trad Archive - Home">
			{shouldShowIntro && (
				<ProjectIntro
					className="mb-8 md:mt-4 md:mb-12"
					onClose={onCloseIntro}
				/>
			)}

			<div className="flex flex-col md:flex-row">
				<div className="flex flex-1 flex-col pb-8">
					<h1 className="mb-6">Explore</h1>

					<Filters {...filtersProps} className="mb-6" />

					{!audioItems && audioItemsError && (
						<div className="text-red-600">{audioItemsError.message}</div>
					)}
					{!audioItemsLoading && audioItems?.length === 0 && (
						<div className="text-gray-500">No Audio Items found</div>
					)}
					{audioItems?.map((audioItem, index) => (
						<AudioItemComponent
							viewAs={viewAs}
							audioItem={audioItem}
							key={index}
							className={viewAs === ViewAs.List ? "mb-4" : "mb-6"}
						/>
					))}
					{audioItemsLoading && <LoadingBlock />}
					{!audioItemsLoading && audioItems?.length > 0 && (
						<div className="flex flex-row justify-center">
							<button className="btn-text" onClick={fetchNextPage}>
								Load More
							</button>
						</div>
					)}
				</div>

				<div className="flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300">
					<h3 className="mb-4">Browse</h3>
					<Link to="/entities/people">
						<a className="mb-2">People</a>
					</Link>
					<Link to="/entities/instruments">
						<a className="mb-2">Instruments</a>
					</Link>
					<Link to="/entities/places">
						<a className="mb-2">Places</a>
					</Link>
					<Link to="/entities/tunes">
						<a className="mb-2">Tunes</a>
					</Link>
					<Link to="/entities/collections">
						<a className="mb-2">Collections</a>
					</Link>

					{/* {prefetchedStats && (
						<>
							<h3 className="mt-6 mb-4">Stats</h3>
							<span className="mb-2 text-gray-500">
								{prefetchedStats.numAudioItemsAllTime} Audio Items
							</span>
							<span className="mb-2 text-gray-500">
								{prefetchedStats.numTagsAllTime} Tags
							</span>
							<span className="mb-2 text-gray-500">
								{prefetchedStats.numCommentsAllTime} Comments
							</span>
						</>
					)} */}

					<h3 className="mt-6 mb-4">Latest Collections</h3>
					{collectionsLoading && collections?.length === 0 && <LoadingBlock />}
					{!collectionsLoading && collections?.length === 0 && (
						<div className="text-gray-500">None</div>
					)}
					{collections?.map((collection, index) => {
						const { name } = collection;
						if (!name) {
							return null;
						}
						return (
							<div className="mb-2 text-gray-500" key={index}>
								<Link to={EntityService.makeHrefForView(collection)}>
									{collection.name}
								</Link>
							</div>
						);
					})}

					<h3 className="mt-6 mb-4">Latest Features + Fixes</h3>
					<a
						className="mb-2"
						href="https://github.com/dgurns/trad-archive/pulls?q=is%3Apr+is%3Amerged+sort%3Aupdated-desc"
						target="_blank"
						rel="noreferrer"
					>
						View on GitHub <i className="material-icons text-sm">launch</i>
					</a>

					<h3 className="mt-6 mb-4">Latest Comments</h3>
					{commentsLoading && comments?.length === 0 && <LoadingBlock />}
					{!commentsLoading && comments?.length === 0 && (
						<div className="text-gray-500">None</div>
					)}
					{comments?.map((comment, index) => {
						const { createdByUser, parentAudioItem, text } = comment;
						if (!createdByUser) {
							return null;
						}
						return (
							<div className="mb-4 text-gray-500" key={index}>
								<div className=" mb-1">
									<Link to={`/users/${createdByUser.id}`}>
										{createdByUser.username}
									</Link>
									{` commented on `}
									<Link to={EntityService.makeHrefForView(parentAudioItem)}>
										{parentAudioItem.name}
									</Link>
									{":"}
								</div>
								<div className="whitespace-pre-line text-sm">{text}</div>
							</div>
						);
					})}
				</div>
			</div>
		</Layout>
	);
}
