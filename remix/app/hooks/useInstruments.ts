import { useEffect, useCallback, useState } from "react";
import type { LazyQueryHookOptions, LazyQueryResult } from "@apollo/client";
import { useLazyQuery, gql } from "@apollo/client";
import type { Instrument } from "~/types";
import { SortBy } from "~/types";
import { EntityFragments } from "~/fragments";

export const INSTRUMENTS_QUERY = gql`
	query Instruments($input: InstrumentsInput!) {
		instruments(input: $input) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;

interface QueryData {
	instruments: Instrument[];
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
	Instrument[] | undefined,
	LazyQueryResult<QueryData, {}>,
	() => void
];

const useInstruments = ({
	sortBy = SortBy.AToZ,
	resultsPerPage = 20,
	queryOptions = {},
}: HookArgs = {}): HookReturnValue => {
	const [skip, setSkip] = useState(0);
	const [instruments, setInstruments] = useState<Instrument[] | undefined>();

	// Reset values when sortBy changes
	useEffect(() => {
		setInstruments(undefined);
		setSkip(0);
	}, [sortBy]);

	const [getInstruments, instrumentsQuery] = useLazyQuery<
		QueryData,
		QueryVariables
	>(INSTRUMENTS_QUERY, {
		notifyOnNetworkStatusChange: true,
		...queryOptions,
	});
	const { data, fetchMore } = instrumentsQuery;
	useEffect(() => {
		// Avoid bug with Apollo Client where it makes an extra network request
		// with original variables after `fetchMore` is called, thus leading to
		// `data` briefly being `undefined`.
		// https://github.com/apollographql/apollo-client/issues/6916
		if (data?.instruments) {
			setInstruments(data.instruments);
		}
	}, [data]);

	useEffect(() => {
		getInstruments({
			variables: {
				input: {
					sortBy,
					take: resultsPerPage + skip,
					skip: 0,
				},
			},
		});
	}, [getInstruments, resultsPerPage, sortBy, skip]);

	const fetchNextPage = useCallback(async () => {
		const numToSkip = instruments?.length ?? 0;
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
	}, [fetchMore, resultsPerPage, instruments, sortBy]);

	return [instruments, instrumentsQuery, fetchNextPage];
};

export default useInstruments;
