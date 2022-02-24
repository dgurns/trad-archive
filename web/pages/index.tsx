import { useEffect, useMemo, useCallback, useState } from "react";
import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
	gql,
} from "@apollo/client";
import Link from "next/link";

import { API_URL, apolloClient } from "apolloClient";
import {
	AudioItem,
	Comment,
	Collection,
	EntityStatus,
	SortBy,
	ViewAs,
	Stats,
} from "types";
import useAudioItems, { AUDIO_ITEMS_QUERY } from "hooks/useAudioItems";
import useComments, { COMMENTS_QUERY } from "hooks/useComments";
import useCollections, { COLLECTIONS_QUERY } from "hooks/useCollections";
import useFilters from "hooks/useFilters";
import EntityService from "services/Entity";
import CommentService from "services/Comment";
import LocalStorageService from "services/LocalStorage";

import Layout from "components/Layout";
import ProjectIntro from "components/ProjectIntro";
import AudioItemComponent from "components/AudioItem";
import LoadingBlock from "components/LoadingBlock";

const NUM_AUDIO_ITEMS_TO_FETCH = 10;
const NUM_COMMENTS_TO_FETCH = 6;
const NUM_COLLECTIONS_TO_FETCH = 5;

const STATS_QUERY = gql`
	query Stats {
		stats {
			numAudioItemsAllTime
			numTagsAllTime
			numCommentsAllTime
		}
	}
`;

interface QueryVariables {
	input: {
		sortBy?: SortBy;
		take?: number;
		skip?: number;
		status?: EntityStatus;
	};
}

// Attempt to reuse instance of server side Apollo Client between runs of
// getStaticProps, to avoid creating a new DB connection on every request
let serverSideApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

// getStaticProps fetches data server-side and pre-renders a static HTML page.
// It will regenerate the static HTML at most once per second.
export async function getStaticProps() {
	let recentlyTaggedAudioItems: AudioItem[] | undefined;
	let recentlyAddedAudioItems: AudioItem[] | undefined;
	let stats: Stats | undefined;
	let comments: Comment[] | undefined;
	let collections: Collection[] | undefined;

	try {
		if (!serverSideApolloClient) {
			serverSideApolloClient = new ApolloClient({
				uri: API_URL,
				credentials: "include",
				cache: new InMemoryCache(),
				defaultOptions: {
					query: {
						// Force server-side queries to get the latest data each time
						fetchPolicy: "no-cache",
					},
				},
			});
		}

		const [recentlyTaggedAudioItemsQuery, recentlyAddedAudioItemsQuery] =
			await Promise.all([
				serverSideApolloClient.query<
					{ audioItems: AudioItem[] },
					QueryVariables
				>({
					query: AUDIO_ITEMS_QUERY,
					variables: {
						input: {
							sortBy: SortBy.RecentlyTagged,
							take: NUM_AUDIO_ITEMS_TO_FETCH,
							skip: 0,
							status: EntityStatus.Published,
						},
					},
				}),
				serverSideApolloClient.query<
					{ audioItems: AudioItem[] },
					QueryVariables
				>({
					query: AUDIO_ITEMS_QUERY,
					variables: {
						input: {
							sortBy: SortBy.RecentlyAdded,
							take: NUM_AUDIO_ITEMS_TO_FETCH,
							skip: 0,
							status: EntityStatus.Published,
						},
					},
				}),
			]);

		const [statsQuery, commentsQuery, collectionsQuery] = await Promise.all([
			serverSideApolloClient.query<{ stats: Stats }>({
				query: STATS_QUERY,
			}),
			serverSideApolloClient.query<{ comments: Comment[] }, QueryVariables>({
				query: COMMENTS_QUERY,
				variables: {
					input: {
						take: NUM_COMMENTS_TO_FETCH,
					},
				},
			}),
			serverSideApolloClient.query<
				{ collections: Collection[] },
				QueryVariables
			>({
				query: COLLECTIONS_QUERY,
				variables: {
					input: {
						take: NUM_COLLECTIONS_TO_FETCH,
						sortBy: SortBy.RecentlyAdded,
					},
				},
			}),
		]);

		recentlyTaggedAudioItems = recentlyTaggedAudioItemsQuery?.data?.audioItems;
		recentlyAddedAudioItems = recentlyAddedAudioItemsQuery?.data?.audioItems;
		stats = statsQuery?.data?.stats;
		comments = commentsQuery?.data?.comments;
		collections = collectionsQuery?.data?.collections;
	} catch {
		//
	}

	return {
		props: {
			prefetchedRecentlyTaggedAudioItems: recentlyTaggedAudioItems ?? null,
			prefetchedRecentlyAddedAudioItems: recentlyAddedAudioItems ?? null,
			prefetchedStats: stats ?? null,
			prefetchedComments: comments ?? null,
			prefetchedCollections: collections ?? null,
		},
		revalidate: 1,
	};
}

interface Props {
	prefetchedRecentlyTaggedAudioItems?: AudioItem[];
	prefetchedRecentlyAddedAudioItems?: AudioItem[];
	prefetchedStats?: Stats;
	prefetchedComments?: Comment[];
	prefetchedCollections?: Collection[];
}

export default function Home({
	prefetchedRecentlyTaggedAudioItems,
	prefetchedRecentlyAddedAudioItems,
	prefetchedStats,
	prefetchedComments,
	prefetchedCollections,
}: Props) {
	// If there is prefetched data and the cache is not yet populated, populate it
	useEffect(() => {
		if (prefetchedRecentlyTaggedAudioItems) {
			// Check if there are already "Recently Tagged" AudioItems in the cache
			const cachedRecentlyTaggedAudioItems = apolloClient.readQuery({
				query: AUDIO_ITEMS_QUERY,
				variables: {
					input: {
						sortBy: SortBy.RecentlyTagged,
						take: NUM_AUDIO_ITEMS_TO_FETCH,
						skip: 0,
						status: EntityStatus.Published,
					},
				},
			});
			// If not, add the prefetched AudioItems to the cache
			if (!cachedRecentlyTaggedAudioItems) {
				apolloClient.writeQuery({
					query: AUDIO_ITEMS_QUERY,
					data: { audioItems: prefetchedRecentlyTaggedAudioItems },
					variables: {
						input: {
							sortBy: SortBy.RecentlyTagged,
							take: NUM_AUDIO_ITEMS_TO_FETCH,
							skip: 0,
							status: EntityStatus.Published,
						},
					},
				});
			}
		}
		if (prefetchedRecentlyAddedAudioItems) {
			// Check if there are already "Recently Added" AudioItems in the cache
			const cachedRecentlyAddedAudioItems = apolloClient.readQuery({
				query: AUDIO_ITEMS_QUERY,
				variables: {
					input: {
						sortBy: SortBy.RecentlyAdded,
						take: NUM_AUDIO_ITEMS_TO_FETCH,
						skip: 0,
						status: EntityStatus.Published,
					},
				},
			});
			// If not, add the prefetched AudioItems to the cache
			if (!cachedRecentlyAddedAudioItems) {
				apolloClient.writeQuery({
					query: AUDIO_ITEMS_QUERY,
					data: { audioItems: prefetchedRecentlyAddedAudioItems },
					variables: {
						input: {
							sortBy: SortBy.RecentlyAdded,
							take: NUM_AUDIO_ITEMS_TO_FETCH,
							skip: 0,
							status: EntityStatus.Published,
						},
					},
				});
			}
		}
		if (prefetchedStats) {
			// Check if there are already Stats in the cache
			const cachedStats = apolloClient.readQuery({
				query: STATS_QUERY,
			});
			// If not, add the prefetched Stats to the cache
			if (!cachedStats) {
				apolloClient.writeQuery({
					query: STATS_QUERY,
					data: { stats: prefetchedStats },
				});
			}
		}
		if (prefetchedComments) {
			// Check if there are already Comments in the cache
			const cachedComments = apolloClient.readQuery({
				query: COMMENTS_QUERY,
				variables: {
					input: {
						take: NUM_COMMENTS_TO_FETCH,
					},
				},
			});
			// If not, add the prefetched Comments to the cache
			if (!cachedComments) {
				apolloClient.writeQuery({
					query: COMMENTS_QUERY,
					data: { comments: prefetchedComments },
					variables: {
						input: {
							take: NUM_COMMENTS_TO_FETCH,
						},
					},
				});
			}
		}
		if (prefetchedCollections) {
			// Check if there are already Tags in the cache
			const cachedCollections = apolloClient.readQuery({
				query: COLLECTIONS_QUERY,
				variables: {
					input: {
						take: NUM_COLLECTIONS_TO_FETCH,
						sortBy: SortBy.RecentlyAdded,
					},
				},
			});
			// If not, add the prefetched Tags to the cache
			if (!cachedCollections) {
				apolloClient.writeQuery({
					query: COLLECTIONS_QUERY,
					data: { collections: prefetchedCollections },
					variables: {
						input: {
							take: NUM_COLLECTIONS_TO_FETCH,
							sortBy: SortBy.RecentlyAdded,
						},
					},
				});
			}
		}
	}, [
		apolloClient,
		prefetchedRecentlyTaggedAudioItems,
		prefetchedRecentlyAddedAudioItems,
		prefetchedStats,
		prefetchedComments,
		prefetchedCollections,
	]);

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

	const defaultAudioItems =
		sortBy === SortBy.RecentlyTagged
			? prefetchedRecentlyTaggedAudioItems
			: prefetchedRecentlyAddedAudioItems;
	const audioItems = fetchedAudioItems ?? defaultAudioItems;

	const comments = useMemo(() => {
		const data = fetchedComments ?? prefetchedComments ?? [];
		const sorted = CommentService.sortByCreatedAtDesc(data);
		return sorted.slice(0, NUM_COMMENTS_TO_FETCH);
	}, [fetchedComments, prefetchedComments]);

	const collections = useMemo(() => {
		const data = fetchedCollections ?? prefetchedCollections ?? [];
		return data.slice(0, NUM_COLLECTIONS_TO_FETCH);
	}, [fetchedCollections, prefetchedCollections]);

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
					<Link href="/entities/people">
						<a className="mb-2">People</a>
					</Link>
					<Link href="/entities/instruments">
						<a className="mb-2">Instruments</a>
					</Link>
					<Link href="/entities/places">
						<a className="mb-2">Places</a>
					</Link>
					<Link href="/entities/tunes">
						<a className="mb-2">Tunes</a>
					</Link>
					<Link href="/entities/collections">
						<a className="mb-2">Collections</a>
					</Link>

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
								<Link href={EntityService.makeHrefForView(collection)}>
									{collection.name}
								</Link>
							</div>
						);
					})}

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
									<Link href={`/users/${createdByUser.id}`}>
										{createdByUser.username}
									</Link>
									{` commented on `}
									<Link href={EntityService.makeHrefForView(parentAudioItem)}>
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
