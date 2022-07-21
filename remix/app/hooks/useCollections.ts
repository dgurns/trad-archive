import { useEffect, useCallback, useState } from "react";
import type { LazyQueryResult, LazyQueryHookOptions } from "@apollo/client";
import { useLazyQuery, gql } from "@apollo/client";
import type { Collection } from "~/types";
import { SortBy } from "~/types";
import { EntityFragments } from "~/fragments";

export const COLLECTIONS_QUERY = gql`
	query Collections($input: CollectionsInput!) {
		collections(input: $input) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;

interface QueryData {
	collections: Collection[];
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
	Collection[] | undefined,
	LazyQueryResult<QueryData, {}>,
	() => void
];

const useCollections = ({
	sortBy = SortBy.AToZ,
	resultsPerPage = 20,
	queryOptions = {},
}: HookArgs = {}): HookReturnValue => {
	const [skip, setSkip] = useState(0);
	const [collections, setCollections] = useState<Collection[] | undefined>();

	const [getCollections, collectionsQuery] = useLazyQuery<
		QueryData,
		QueryVariables
	>(COLLECTIONS_QUERY, {
		notifyOnNetworkStatusChange: true,
		...queryOptions,
	});
	const { data, fetchMore } = collectionsQuery;
	useEffect(() => {
		// Avoid bug with Apollo Client where it makes an extra network request
		// with original variables after `fetchMore` is called, thus leading to
		// `data` briefly being `undefined`.
		// https://github.com/apollographql/apollo-client/issues/6916
		if (data?.collections) {
			setCollections(data.collections);
		}
	}, [data]);

	useEffect(() => {
		getCollections({
			variables: {
				input: {
					take: resultsPerPage + skip,
					skip: 0,
					sortBy,
				},
			},
		});
	}, [getCollections, resultsPerPage, sortBy]);

	const fetchNextPageOfCollections = useCallback(async () => {
		const numToSkip = collections?.length ?? 0;
		await fetchMore({
			variables: {
				input: {
					take: resultsPerPage,
					skip: numToSkip,
					sortBy,
				},
			},
		});
		setSkip(numToSkip);
	}, [fetchMore, resultsPerPage, collections, sortBy]);

	return [collections, collectionsQuery, fetchNextPageOfCollections];
};

export default useCollections;
