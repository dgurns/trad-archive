import { useEffect } from "react";
import type { LazyQueryResult } from "@apollo/client";
import { useLazyQuery, gql } from "@apollo/client";

import type { User } from "~/types";
import { UserFragments } from "~/fragments";

export const CURRENT_USER_QUERY = gql`
	query CurrentUser {
		currentUser {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;

interface QueryData {
	currentUser: User;
}

const useCurrentUser = (): [
	User | null | undefined,
	LazyQueryResult<QueryData, {}>
] => {
	const [getCurrentUser, currentUserQuery] =
		useLazyQuery<QueryData>(CURRENT_USER_QUERY);

	useEffect(() => {
		getCurrentUser();
	}, [getCurrentUser]);

	const currentUser = currentUserQuery.data?.currentUser;

	return [currentUser, currentUserQuery];
};

export default useCurrentUser;
