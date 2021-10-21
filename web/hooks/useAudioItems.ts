import { useEffect, useCallback } from "react";
import {
	useLazyQuery,
	gql,
	LazyQueryHookOptions,
	LazyQueryResult,
} from "@apollo/client";
import { AudioItem, EntityStatus, SortBy } from "types";
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
		sortBy?: SortBy;
	};
}
interface HookArgs {
	sortBy?: SortBy;
	resultsPerPage?: number;
	queryOptions?: LazyQueryHookOptions<QueryData, QueryVariables>;
}

const useAudioItems = ({
	sortBy = SortBy.RecentlyTagged,
	resultsPerPage,
	queryOptions = {},
}: HookArgs = {}): [
	AudioItem[] | undefined,
	LazyQueryResult<QueryData, {}>,
	() => void
] => {
	const [getAudioItems, audioItemsQuery] = useLazyQuery<
		QueryData,
		QueryVariables
	>(AUDIO_ITEMS_QUERY, {
		notifyOnNetworkStatusChange: true,
		...queryOptions,
	});
	const { data, fetchMore } = audioItemsQuery;

	useEffect(() => {
		getAudioItems({
			variables: {
				input: {
					sortBy,
					take: resultsPerPage,
					status: EntityStatus.Published,
				},
			},
		});
	}, [getAudioItems, resultsPerPage, sortBy]);

	const audioItems = data?.audioItems;

	const fetchNextPage = useCallback(() => {
		fetchMore({
			variables: {
				input: {
					sortBy,
					take: resultsPerPage,
					status: EntityStatus.Published,
					skip: audioItems?.length ?? 0,
				},
			},
		});
	}, [fetchMore, resultsPerPage, audioItems, sortBy]);

	return [audioItems, audioItemsQuery, fetchNextPage];
};

export default useAudioItems;
