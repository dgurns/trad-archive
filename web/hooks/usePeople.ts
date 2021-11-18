import { useEffect, useCallback, useState } from "react";
import {
	useLazyQuery,
	gql,
	LazyQueryHookOptions,
	LazyQueryResult,
} from "@apollo/client";
import { Person, SortBy } from "types";
import { EntityFragments } from "fragments";

export const PEOPLE_QUERY = gql`
	query People($input: PeopleInput!) {
		people(input: $input) {
			...Person
		}
	}
	${EntityFragments.person}
`;

interface QueryData {
	people: Person[];
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
	Person[] | undefined,
	LazyQueryResult<QueryData, {}>,
	() => void
];

const usePeople = ({
	sortBy = SortBy.AToZ,
	resultsPerPage = 20,
	queryOptions = {},
}: HookArgs = {}): HookReturnValue => {
	const [skip, setSkip] = useState(0);
	const [people, setPeople] = useState<Person[] | undefined>();

	// Reset values when sortBy changes
	useEffect(() => {
		setPeople(undefined);
		setSkip(0);
	}, [sortBy]);

	const [getPeople, peopleQuery] = useLazyQuery<QueryData, QueryVariables>(
		PEOPLE_QUERY,
		{
			notifyOnNetworkStatusChange: true,
			...queryOptions,
		}
	);
	const { data, fetchMore } = peopleQuery;
	useEffect(() => {
		// Avoid bug with Apollo Client where it makes an extra network request
		// with original variables after `fetchMore` is called, thus leading to
		// `data` briefly being `undefined`.
		// https://github.com/apollographql/apollo-client/issues/6916
		if (data?.people) {
			setPeople(data.people);
		}
	}, [data]);

	useEffect(() => {
		getPeople({
			variables: {
				input: {
					sortBy,
					take: resultsPerPage + skip,
					skip: 0,
				},
			},
		});
	}, [getPeople, resultsPerPage, sortBy, skip]);

	const fetchNextPage = useCallback(async () => {
		const numToSkip = people?.length ?? 0;
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
	}, [fetchMore, resultsPerPage, people, sortBy]);

	return [people, peopleQuery, fetchNextPage];
};

export default usePeople;
