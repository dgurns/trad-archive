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

import Layout from "components/Layout";
import AudioItemComponent from "components/AudioItem";
import LoadingBlock from "components/LoadingBlock";

const AUDIO_ITEM_RESULTS = 10;
const COMMENT_RESULTS = 2;
const TAG_RESULTS = 5;
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
	let audioItems: AudioItem[] | null = null;
	let comments: Comment[] | null = null;
	let tags: Tag[] | null = null;

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
							take: AUDIO_ITEM_RESULTS,
							status: EntityStatus.Published,
						},
					},
				}
			),
			serverSideApolloClient.query<{ comments: Comment[] }, QueryVariables>({
				query: COMMENTS_QUERY,
				variables: {
					input: {
						take: COMMENT_RESULTS,
					},
				},
			}),
			serverSideApolloClient.query<{ tags: Tag[] }, QueryVariables>({
				query: TAGS_QUERY,
				variables: {
					input: {
						take: TAG_RESULTS,
					},
				},
			}),
		]);

		audioItems = audioItemsQuery?.data.audioItems;
		comments = commentsQuery?.data.comments;
		tags = tagsQuery?.data.tags;
	} catch {
		//
	}

	return {
		props: {
			prefetchedAudioItems: audioItems,
			prefetchedComments: comments,
			prefetchedTags: tags,
		},
		revalidate: 1,
	};
}

interface Props {
	prefetchedAudioItems: AudioItem[] | null;
	prefetchedTags: Tag[] | null;
	prefetchedComments: Comment[] | null;
}

export default function Home({
	prefetchedAudioItems,
	prefetchedTags,
	prefetchedComments,
}: Props) {
	const [audioItems = prefetchedAudioItems, { loading, error }, fetchNextPage] =
		useAudioItems({
			resultsPerPage: AUDIO_ITEM_RESULTS,
		});

	const [latestComments = prefetchedComments] = useComments({
		resultsPerPage: COMMENT_RESULTS,
	});
	const [latestTags = prefetchedTags] = useTags({
		resultsPerPage: TAG_RESULTS,
	});

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
					{latestComments?.map((comment, index) => {
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
					{latestTags?.map((tag, index) => {
						const { createdByUser, subjectEntity, objectEntity } = tag;
						return (
							<div className="mb-4 text-gray-500" key={index}>
								<div className="mb-1">
									<Link href={`/users/${createdByUser.id}`}>
										{createdByUser.username}
									</Link>
									{` tagged `}
									<Link href={EntityService.makeHrefForView(subjectEntity)}>
										{subjectEntity?.name}
									</Link>
									{` with `}
									<Link href={EntityService.makeHrefForView(objectEntity)}>
										{objectEntity?.name}
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
