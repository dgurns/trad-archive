import { useEffect, useCallback } from "react";
import { useLazyQuery, gql, LazyQueryResult } from "@apollo/client";
import { AudioItem, EntityStatus } from "types";
import { EntityFragments } from "fragments";

export const AUDIO_ITEMS_QUERY = gql`
	query AudioItems($input: AudioItemsInput!) {
		audioItems(input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;

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
interface HookArgs {
	resultsPerPage?: number;
}

const useAudioItems = ({ resultsPerPage }: HookArgs = {}): [
	AudioItem[] | undefined,
	LazyQueryResult<QueryData, {}>,
	() => void
] => {
	const [getAudioItems, audioItemsQuery] = useLazyQuery<
		QueryData,
		QueryVariables
	>(AUDIO_ITEMS_QUERY, { notifyOnNetworkStatusChange: true });
	const { data, fetchMore } = audioItemsQuery;

	useEffect(() => {
		getAudioItems({
			variables: {
				input: {
					take: resultsPerPage,
					status: EntityStatus.Published,
				},
			},
		});
	}, [getAudioItems]);

	const audioItems = data?.audioItems;

	const fetchNextPage = useCallback(() => {
		fetchMore({
			variables: {
				input: {
					take: resultsPerPage,
					skip: audioItems.length ?? 0,
				},
			},
		});
	}, [fetchMore, resultsPerPage, audioItems]);

	return [audioItemsQuery.data?.audioItems, audioItemsQuery, fetchNextPage];
};

export default useAudioItems;
