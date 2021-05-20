import { useEffect, useMemo } from "react";
import {
	useQuery,
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

const NUM_AUDIO_ITEMS_TO_FETCH = 10;
const NUM_COMMENTS_TO_FETCH = 2;
const NUM_TAGS_TO_FETCH = 5;
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
		const [audioItemsQuery, commentsQuery, tagsQuery] = await Promise.all([
			serverSideApolloClient.query<{ audioItems: AudioItem[] }, QueryVariables>(
				{
					query: AUDIO_ITEMS_QUERY,
					variables: {
						input: {
							take: NUM_AUDIO_ITEMS_TO_FETCH,
							status: EntityStatus.Published,
						},
					},
				}
			),
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
	// On mount, populate the Apollo Client cache with the prefetched data, so
	// subsequent queries can pull from the cache instead of using the network
	useEffect(() => {
		if (prefetchedAudioItems) {
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
		if (prefetchedComments) {
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
		if (prefetchedTags) {
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
	}, [prefetchedAudioItems, prefetchedComments, prefetchedTags]);

	// These queries skip the initial network request since the cache is
	// pre-populated
	const [fetchedAudioItems, { loading, error }, fetchNextPage] = useAudioItems({
		resultsPerPage: NUM_AUDIO_ITEMS_TO_FETCH,
	});
	const { comments: fetchedComments } = useComments({
		resultsPerPage: NUM_COMMENTS_TO_FETCH,
	});
	const { tags: fetchedTags } = useTags({ resultsPerPage: NUM_TAGS_TO_FETCH });

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
		<Layout>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-1 flex-col pb-8">
					<h1 className="mb-6">Explore Audio Items</h1>
					{!audioItems && error && (
						<div className="text-red-600">{error.message}</div>
					)}
					{audioItems?.length === 0 && (
						<div className="text-gray-500">No Audio Items found</div>
					)}
					{audioItems?.map((audioItem, index) => (
						<AudioItemComponent audioItem={audioItem} key={index} />
					))}
					{!loading ? (
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
					{tags?.map((tag, index) => {
						const { createdByUser, subjectEntity, objectEntity } = tag;
						if (!subjectEntity || !objectEntity) {
							return null;
						}
						return (
							<div className="mb-4 text-gray-500" key={index}>
								<div className="mb-1">
									<Link href={`/users/${createdByUser.id}`}>
										{createdByUser.username}
									</Link>
									{` tagged `}
									<Link href={EntityService.makeHrefForView(subjectEntity)}>
										{subjectEntity.name}
									</Link>
									{` with `}
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
