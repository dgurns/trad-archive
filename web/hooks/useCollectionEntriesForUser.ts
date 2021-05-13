import { useEffect } from "react";
import { useLazyQuery, gql, LazyQueryResult } from "@apollo/client";
import { CollectionEntry } from "types";
import { CollectionEntryFragments } from "fragments";
import useCurrentUser from "hooks/useCurrentUser";

const COLLECTION_ENTRIES_FOR_USER_QUERY = gql`
	query CollectionEntriesForUser {
		collectionEntriesForUser {
			...CollectionEntry
		}
	}
	${CollectionEntryFragments.collectionEntry}
`;

interface QueryData {
	collectionEntriesForUser: CollectionEntry[];
}

const useCollectionEntriesForUser = (): [
	CollectionEntry[] | undefined,
	LazyQueryResult<QueryData, {}>
] => {
	const [currentUser] = useCurrentUser();

	const [makeQuery, query] = useLazyQuery<QueryData, {}>(
		COLLECTION_ENTRIES_FOR_USER_QUERY,
		{ fetchPolicy: "cache-first" }
	);

	useEffect(() => {
		if (currentUser) {
			makeQuery();
		}
	}, [makeQuery, currentUser]);

	const collectionEntriesForUser = query.data?.collectionEntriesForUser;

	return [collectionEntriesForUser, query];
};

export default useCollectionEntriesForUser;
