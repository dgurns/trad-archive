import { useEffect, useCallback, useState } from "react";
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
	resultsPerPage = 10,
	queryOptions = {},
}: HookArgs = {}): [
	AudioItem[] | undefined,
	LazyQueryResult<QueryData, {}>,
	() => void
] => {
	// Reset the skip value when sortBy changes
	const [skip, setSkip] = useState(0);
	useEffect(() => {
		setSkip(0);
	}, [sortBy]);

	const [getAudioItems, audioItemsQuery] = useLazyQuery<
		QueryData,
		QueryVariables
	>(AUDIO_ITEMS_QUERY, {
		notifyOnNetworkStatusChange: true,
		...queryOptions,
	});
	const { data, fetchMore } = audioItemsQuery;
	const audioItems = data?.audioItems;

	useEffect(() => {
		getAudioItems({
			variables: {
				input: {
					sortBy,
					take: resultsPerPage + skip,
					skip: 0,
					status: EntityStatus.Published,
				},
			},
		});
	}, [getAudioItems, resultsPerPage, sortBy, skip]);

	const fetchNextPage = useCallback(async () => {
		await fetchMore({
			variables: {
				input: {
					sortBy,
					take: resultsPerPage,
					status: EntityStatus.Published,
					skip: audioItems?.length ?? 0,
				},
			},
		});
		setSkip(audioItems?.length ?? 0);
	}, [fetchMore, resultsPerPage, audioItems, sortBy]);

	return [audioItems, audioItemsQuery, fetchNextPage];
};

export default useAudioItems;
