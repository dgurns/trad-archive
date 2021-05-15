import { useMemo } from "react";
import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import Link from "next/link";

import { API_URL } from "apolloClient";
import { AudioItem, Tag, Comment, EntityStatus } from "types";
import useAudioItems, { AUDIO_ITEMS_QUERY } from "hooks/useAudioItems";
import useComments, { COMMENTS_QUERY } from "hooks/useComments";
import useTags, { TAGS_QUERY } from "hooks/useTags";
import EntityService from "services/Entity";
import CommentService from "services/Comment";

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
// getStaticProps, to avoid creating a new database connection on every request
let serverSideApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

// getStaticProps enables us to incrementally render a static homepage on the
// server side. It regenerates with the latest data on each new request, at most
// once per second.
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
	const [fetchedAudioItems, { loading, error }, fetchNextPage] = useAudioItems({
		resultsPerPage: NUM_AUDIO_ITEMS_TO_FETCH,
	});
	const [fetchedComments] = useComments({
		resultsPerPage: NUM_COMMENTS_TO_FETCH,
		queryOptions: {
			fetchPolicy: "cache-and-network",
		},
	});
	const [fetchedTags] = useTags({
		resultsPerPage: NUM_TAGS_TO_FETCH,
		queryOptions: {
			fetchPolicy: "cache-and-network",
		},
	});

	const audioItems = fetchedAudioItems ?? prefetchedAudioItems;
	const comments = useMemo(() => {
		const data = fetchedComments ?? prefetchedComments;
		if (!data) {
			return undefined;
		}
		return CommentService.sortByCreatedAtDesc(data);
	}, [fetchedComments, prefetchedComments]);
	const tags = fetchedTags ?? prefetchedTags;

	return (
		<Layout>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-1 flex-col pb-8">
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
					<h2 className="mb-4">Latest Comments</h2>
					{comments?.map((comment, index) => {
						const { createdByUser, parentAudioItem, text } = comment;
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

					<h2 className="mt-4 mb-4">Latest Tags</h2>
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
