import { useEffect, useCallback, useState } from "react";
import type { LazyQueryHookOptions, LazyQueryResult } from "@apollo/client";
import { useLazyQuery, gql } from "@apollo/client";
import type { AudioItem } from "~/types";
import { EntityStatus, SortBy } from "~/types";
import { EntityFragments } from "~/fragments";

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
	const [skip, setSkip] = useState(0);
	const [audioItems, setAudioItems] = useState<AudioItem[] | undefined>();

	// Reset values when sortBy changes
	useEffect(() => {
		setAudioItems(undefined);
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
	useEffect(() => {
		// Avoid bug with Apollo Client where it makes an extra network request
		// with original variables after `fetchMore` is called, thus leading to
		// `data` briefly being `undefined`.
		// https://github.com/apollographql/apollo-client/issues/6916
		if (data?.audioItems) {
			setAudioItems(data.audioItems);
		}
	}, [data]);

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
		const numToSkip = audioItems?.length ?? 0;
		await fetchMore({
			variables: {
				input: {
					sortBy,
					take: resultsPerPage,
					status: EntityStatus.Published,
					skip: numToSkip,
				},
			},
		});
		setSkip(numToSkip);
	}, [fetchMore, resultsPerPage, audioItems, sortBy]);

	return [audioItems, audioItemsQuery, fetchNextPage];
};

export default useAudioItems;
