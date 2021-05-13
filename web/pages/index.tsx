import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import Link from "next/link";

import { API_URL } from "apolloClient";
import { AudioItem, EntityStatus } from "types";
import useAudioItems, { AUDIO_ITEMS_QUERY } from "hooks/useAudioItems";
import useComments from "hooks/useComments";
import useTags from "hooks/useTags";
import EntityService from "services/Entity";

import Layout from "components/Layout";
import AudioItemComponent from "components/AudioItem";
import LoadingBlock from "components/LoadingBlock";

const RESULTS_PER_PAGE = 10;

interface QueryData {
	audioItems: AudioItem[];
}
interface QueryVariables {
	input: {
		take?: number;
		skip?: number;
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

	try {
		if (!serverSideApolloClient) {
			serverSideApolloClient = new ApolloClient({
				uri: API_URL,
				credentials: "include",
				cache: new InMemoryCache(),
			});
		}
		const { data: audioItemsData } = await serverSideApolloClient.query<
			QueryData,
			QueryVariables
		>({
			query: AUDIO_ITEMS_QUERY,
			variables: {
				input: {
					take: RESULTS_PER_PAGE,
					status: EntityStatus.Published,
					skip: 0,
				},
			},
		});
		audioItems = audioItemsData.audioItems;
	} catch {
		//
	}
	return {
		props: {
			prefetchedAudioItems: audioItems,
		},
		revalidate: 1,
	};
}

interface Props {
	prefetchedAudioItems: AudioItem[] | null;
}

export default function Home({ prefetchedAudioItems }: Props) {
	const [audioItems = prefetchedAudioItems, { loading, error }, fetchNextPage] =
		useAudioItems({
			resultsPerPage: RESULTS_PER_PAGE,
		});

	const [latestComments] = useComments({
		resultsPerPage: 2,
		queryOptions: {
			fetchPolicy: "no-cache",
		},
	});
	const [latestTags] = useTags({
		resultsPerPage: 5,
		queryOptions: {
			fetchPolicy: "no-cache",
		},
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
							<div className="mb-4" key={index}>
								<div className="text-gray-500">
									<Link href={`/users/${createdByUser.id}`}>
										{createdByUser.username}
									</Link>
									{` commented on `}
									<Link href={EntityService.makeHrefForView(parentAudioItem)}>
										{parentAudioItem.name}
									</Link>
								</div>
								<div className="whitespace-pre-line">{text}</div>
							</div>
						);
					})}

					<h2 className="mt-4 mb-4">Latest Tags</h2>
					{latestTags?.map((tag, index) => {
						const { createdByUser, subjectEntity, objectEntity } = tag;
						return (
							<div className="mb-4" key={index}>
								<div className="text-gray-500 mb-1">
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
