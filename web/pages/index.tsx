import { useEffect, useMemo } from "react";
import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import Link from "next/link";

import { API_URL, apolloClient } from "apolloClient";
import { AudioItem, Tag, Comment, EntityStatus } from "types";
import useAudioItems, { AUDIO_ITEMS_QUERY } from "hooks/useAudioItems";
import useComments, { COMMENTS_QUERY } from "hooks/useComments";
import useTags, { TAGS_QUERY } from "hooks/useTags";
import EntityService from "services/Entity";
import CommentService from "services/Comment";
import TagService from "services/Tag";

import Layout from "components/Layout";
import AudioItemComponent from "components/AudioItem";
import LoadingBlock from "components/LoadingBlock";
import Filters from "components/Filters";

const NUM_AUDIO_ITEMS_TO_FETCH = 10;
const NUM_COMMENTS_TO_FETCH = 4;
const NUM_TAGS_TO_FETCH = 10;
interface QueryVariables {
	input: {
		take?: number;
		status?: EntityStatus;
	};
}

// Attempt to reuse instance of server side Apollo Client between runs of
// getStaticProps, to avoid creating a new DB connection on every request
let serverSideApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

// getStaticProps fetches data server-side and pre-renders a static HTML page.
// It will regenerate the static HTML at most once per second.
export async function getStaticProps() {
	let audioItems: AudioItem[] | undefined;
	let comments: Comment[] | undefined;
	let tags: Tag[] | undefined;

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
		const audioItemsQuery = await serverSideApolloClient.query<
			{ audioItems: AudioItem[] },
			QueryVariables
		>({
			query: AUDIO_ITEMS_QUERY,
			variables: {
				input: {
					take: NUM_AUDIO_ITEMS_TO_FETCH,
					status: EntityStatus.Published,
				},
			},
		});
		const [commentsQuery, tagsQuery] = await Promise.all([
			serverSideApolloClient.query<{ comments: Comment[] }, QueryVariables>({
				query: COMMENTS_QUERY,
				variables: {
					input: {
						take: NUM_COMMENTS_TO_FETCH,
					},
				},
			}),
			serverSideApolloClient.query<{ tags: Tag[] }, QueryVariables>({
				query: TAGS_QUERY,
				variables: {
					input: {
						take: NUM_TAGS_TO_FETCH,
					},
				},
			}),
		]);

		audioItems = audioItemsQuery?.data?.audioItems;
		comments = commentsQuery?.data?.comments;
		tags = tagsQuery?.data?.tags;
	} catch {
		//
	}

	return {
		props: {
			prefetchedAudioItems: audioItems ?? null,
			prefetchedComments: comments ?? null,
			prefetchedTags: tags ?? null,
		},
		revalidate: 1,
	};
}

interface Props {
	prefetchedAudioItems?: AudioItem[];
	prefetchedComments?: Comment[];
	prefetchedTags?: Tag[];
}

export default function Home({
	prefetchedAudioItems,
	prefetchedComments,
	prefetchedTags,
}: Props) {
	// If there is prefetched data and the cache is not yet populated, populate it
	useEffect(() => {
		if (prefetchedAudioItems) {
			// Check if there are already AudioItems in the cache
			const cachedAudioItems = apolloClient.readQuery({
				query: AUDIO_ITEMS_QUERY,
				variables: {
					input: {
						take: NUM_AUDIO_ITEMS_TO_FETCH,
						status: EntityStatus.Published,
					},
				},
			});
			// If not, add the prefetched AudioItems to the cache
			if (!cachedAudioItems) {
				apolloClient.writeQuery({
					query: AUDIO_ITEMS_QUERY,
					data: { audioItems: prefetchedAudioItems },
					variables: {
						input: {
							take: NUM_AUDIO_ITEMS_TO_FETCH,
							status: EntityStatus.Published,
						},
					},
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
		if (prefetchedTags) {
			// Check if there are already Tags in the cache
			const cachedTags = apolloClient.readQuery({
				query: TAGS_QUERY,
				variables: {
					input: {
						take: NUM_TAGS_TO_FETCH,
					},
				},
			});
			// If not, add the prefetched Tags to the cache
			if (!cachedTags) {
				apolloClient.writeQuery({
					query: TAGS_QUERY,
					data: { tags: prefetchedTags },
					variables: {
						input: {
							take: NUM_TAGS_TO_FETCH,
						},
					},
				});
			}
		}
	}, [prefetchedAudioItems, prefetchedComments, prefetchedTags]);

	// These queries skip the initial network request if the cache is
	// pre-populated
	const [
		fetchedAudioItems,
		{ loading: audioItemsLoading, error: audioItemsError },
		fetchNextPage,
	] = useAudioItems({
		resultsPerPage: NUM_AUDIO_ITEMS_TO_FETCH,
	});
	const {
		comments: fetchedComments,
		commentsQuery: { loading: commentsLoading },
	} = useComments({
		resultsPerPage: NUM_COMMENTS_TO_FETCH,
	});
	const {
		tags: fetchedTags,
		tagsQuery: { loading: tagsLoading },
	} = useTags({ resultsPerPage: NUM_TAGS_TO_FETCH });

	const audioItems = fetchedAudioItems ?? prefetchedAudioItems;

	const comments = useMemo(() => {
		const data = fetchedComments ?? prefetchedComments ?? [];
		const sorted = CommentService.sortByCreatedAtDesc(data);
		return sorted.slice(0, NUM_COMMENTS_TO_FETCH);
	}, [fetchedComments, prefetchedComments]);

	const tags = useMemo(() => {
		const data = fetchedTags ?? prefetchedTags ?? [];
		const sorted = TagService.sort(
			data,
			TagService.TagSortStrategy.CreatedAtDesc
		);
		return sorted.slice(0, NUM_TAGS_TO_FETCH);
	}, [fetchedTags, prefetchedTags]);

	return (
		<Layout pageTitle="Trad Archive - Home">
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-1 flex-col pb-8">
					<h1 className="mb-6">Explore</h1>

					<Filters className="mb-6" />
					{!audioItems && audioItemsError && (
						<div className="text-red-600">{audioItemsError.message}</div>
					)}
					{!audioItemsLoading && audioItems?.length === 0 && (
						<div className="text-gray-500">No Audio Items found</div>
					)}
					{audioItems?.map((audioItem, index) => (
						<AudioItemComponent audioItem={audioItem} key={index} />
					))}
					{!audioItemsLoading ? (
						<div className="flex flex-row justify-center">
							<button className="btn-text" onClick={fetchNextPage}>
								Load More
							</button>
						</div>
					) : (
						<LoadingBlock />
					)}
				</div>

				<div className="hidden md:flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300">
					<h3 className="mb-4">Latest Comments</h3>
					{commentsLoading && <LoadingBlock />}
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

					<h3 className="mt-4 mb-4">Latest Tags</h3>
					{tagsLoading && <LoadingBlock />}
					{!tagsLoading && tags?.length === 0 && (
						<div className="text-gray-500">None</div>
					)}
					{tags?.map((tag, index) => {
						const { createdByUser, subjectEntity, objectEntity } = tag;
						if (!subjectEntity || !objectEntity) {
							return null;
						}
						return (
							<div className="mb-4 text-gray-500" key={index}>
								<div className="mb-1">
									{createdByUser && (
										<>
											<Link href={`/users/${createdByUser.id}`}>
												{createdByUser.username}
											</Link>
											{` tagged `}
										</>
									)}
									<Link href={EntityService.makeHrefForView(subjectEntity)}>
										{subjectEntity.name}
									</Link>
									{createdByUser ? ` with ` : ` was tagged with `}
									<Link href={EntityService.makeHrefForView(objectEntity)}>
										{objectEntity.name}
									</Link>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Layout>
	);
}
