import { useEffect, useCallback, useState } from "react";
import {
	useLazyQuery,
	gql,
	LazyQueryHookOptions,
	LazyQueryResult,
} from "@apollo/client";
import { Place, SortBy } from "types";
import { EntityFragments } from "fragments";

export const PLACES_QUERY = gql`
	query Places($input: PlacesInput!) {
		places(input: $input) {
			...Place
		}
	}
	${EntityFragments.place}
`;

interface QueryData {
	places: Place[];
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
	Place[] | undefined,
	LazyQueryResult<QueryData, {}>,
	() => void
];

const usePlaces = ({
	sortBy = SortBy.AToZ,
	resultsPerPage = 20,
	queryOptions = {},
}: HookArgs = {}): HookReturnValue => {
	const [skip, setSkip] = useState(0);
	const [places, setPlaces] = useState<Place[] | undefined>();

	// Reset values when sortBy changes
	useEffect(() => {
		setPlaces(undefined);
		setSkip(0);
	}, [sortBy]);

	const [getPlaces, placesQuery] = useLazyQuery<QueryData, QueryVariables>(
		PLACES_QUERY,
		{
			notifyOnNetworkStatusChange: true,
			...queryOptions,
		}
	);
	const { data, fetchMore } = placesQuery;
	useEffect(() => {
		// Avoid bug with Apollo Client where it makes an extra network request
		// with original variables after `fetchMore` is called, thus leading to
		// `data` briefly being `undefined`.
		// https://github.com/apollographql/apollo-client/issues/6916
		if (data?.places) {
			setPlaces(data.places);
		}
	}, [data]);

	useEffect(() => {
		getPlaces({
			variables: {
				input: {
					sortBy,
					take: resultsPerPage + skip,
					skip: 0,
				},
			},
		});
	}, [getPlaces, resultsPerPage, sortBy, skip]);

	const fetchNextPage = useCallback(async () => {
		const numToSkip = places?.length ?? 0;
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
	}, [fetchMore, resultsPerPage, places, sortBy]);

	return [places, placesQuery, fetchNextPage];
};

export default usePlaces;
