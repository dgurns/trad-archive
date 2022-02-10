import { useEffect } from "react";
import { useLazyQuery, gql, LazyQueryResult } from "@apollo/client";
import { SavedItem } from "types";
import { SavedItemFragments } from "fragments";
import useCurrentUser from "hooks/useCurrentUser";

const SAVED_ITEMS_FOR_USER_QUERY = gql`
	query SavedItemsForUser {
		savedItemsForUser {
			...SavedItem
		}
	}
	${SavedItemFragments.savedItem}
`;

interface QueryData {
	savedItemsForUser: SavedItem[];
}

const useSavedItemsForUser = (): [
	SavedItem[] | undefined,
	LazyQueryResult<QueryData, {}>
] => {
	const [currentUser] = useCurrentUser();

	const [makeQuery, query] = useLazyQuery<QueryData, {}>(
		SAVED_ITEMS_FOR_USER_QUERY,
		{ fetchPolicy: "cache-first" }
	);

	useEffect(() => {
		if (currentUser) {
			makeQuery();
		}
	}, [makeQuery, currentUser]);

	const savedItemsForUser = query.data?.savedItemsForUser;

	return [savedItemsForUser, query];
};

export default useSavedItemsForUser;
