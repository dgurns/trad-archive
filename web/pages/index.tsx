import { apolloClient } from "apolloClient";
import { AudioItem } from "types";
import useAudioItems, { AUDIO_ITEMS_QUERY } from "hooks/useAudioItems";

import Layout from "components/Layout";
import AudioItemComponent from "components/AudioItem";
import LoadingBlock from "components/LoadingBlock";

const RESULTS_PER_PAGE = 10;

interface AudioItemsQueryData {
	audioItems: AudioItem[];
}
interface AudioItemsQueryVariables {
	input: {
		take: number;
		skip: number;
	};
}
export async function getStaticProps() {
	const { data } = await apolloClient.query<
		AudioItemsQueryData,
		AudioItemsQueryVariables
	>({
		query: AUDIO_ITEMS_QUERY,
		variables: {
			input: {
				take: RESULTS_PER_PAGE,
				skip: 0,
			},
		},
	});
	return {
		props: {
			prefetchedAudioItems: data?.audioItems ?? null,
		},
		revalidate: 1,
	};
}

interface Props {
	prefetchedAudioItems: AudioItem[] | null;
}

export default function Home({ prefetchedAudioItems }: Props) {
	const [
		audioItems = prefetchedAudioItems,
		{ loading, error },
		fetchNextPage,
	] = useAudioItems({
		resultsPerPage: RESULTS_PER_PAGE,
	});

	if (!audioItems && !error) {
		return (
			<Layout>
				<LoadingBlock />
			</Layout>
		);
	} else if (!audioItems && error) {
		return (
			<Layout>
				<div className="text-red-600">{error.message}</div>
			</Layout>
		);
	} else if (!audioItems?.length) {
		return (
			<Layout>
				<div className="text-gray-500">No Audio Items found</div>
			</Layout>
		);
	}

	return (
		<Layout>
			{audioItems.map((audioItem, index) => (
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
		</Layout>
	);
}
