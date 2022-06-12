import { useEffect, useCallback, useState } from "react";
import type { LazyQueryHookOptions, LazyQueryResult } from "@apollo/client";
import { useLazyQuery, gql } from "@apollo/client";
import type { Tune } from "~/types";
import { SortBy } from "~/types";
import { EntityFragments } from "~/fragments";

export const TUNES_QUERY = gql`
	query Tunes($input: TunesInput!) {
		tunes(input: $input) {
			...Tune
		}
	}
	${EntityFragments.tune}
`;

interface QueryData {
	tunes: Tune[];
}
interface QueryVariables {
	input: {
		take?: number;
		skip?: number;
		sortBy?: SortBy;
	};
}
interface HookArgs {
	sortBy?: SortBy;
	resultsPerPage?: number;
	queryOptions?: LazyQueryHookOptions<QueryData, QueryVariables>;
}
type HookReturnValue = [
	Tune[] | undefined,
	LazyQueryResult<QueryData, {}>,
	() => void
];

const useTunes = ({
	sortBy = SortBy.AToZ,
	resultsPerPage = 20,
	queryOptions = {},
}: HookArgs = {}): HookReturnValue => {
	const [skip, setSkip] = useState(0);
	const [tunes, setTunes] = useState<Tune[] | undefined>();

	// Reset values when sortBy changes
	useEffect(() => {
		setTunes(undefined);
		setSkip(0);
	}, [sortBy]);

	const [getTunes, tunesQuery] = useLazyQuery<QueryData, QueryVariables>(
		TUNES_QUERY,
		{
			notifyOnNetworkStatusChange: true,
			...queryOptions,
		}
	);
	const { data, fetchMore } = tunesQuery;
	useEffect(() => {
		// Avoid bug with Apollo Client where it makes an extra network request
		// with original variables after `fetchMore` is called, thus leading to
		// `data` briefly being `undefined`.
		// https://github.com/apollographql/apollo-client/issues/6916
		if (data?.tunes) {
			setTunes(data.tunes);
		}
	}, [data]);

	useEffect(() => {
		getTunes({
			variables: {
				input: {
					sortBy,
					take: resultsPerPage + skip,
					skip: 0,
				},
			},
		});
	}, [getTunes, resultsPerPage, sortBy, skip]);

	const fetchNextPage = useCallback(async () => {
		const numToSkip = tunes?.length ?? 0;
		await fetchMore({
			variables: {
				input: {
					sortBy,
					take: resultsPerPage,
					skip: numToSkip,
				},
			},
		});
		setSkip(numToSkip);
	}, [fetchMore, resultsPerPage, tunes, sortBy]);

	return [tunes, tunesQuery, fetchNextPage];
};

export default useTunes;
