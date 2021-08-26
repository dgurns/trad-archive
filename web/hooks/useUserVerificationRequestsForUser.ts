import { useEffect } from "react";
import { gql, LazyQueryResult, useLazyQuery } from "@apollo/client";

import { UserVerificationRequestFragments } from "fragments";
import { UserVerificationRequest } from "types";

const USER_VERIFICATION_REQUESTS_QUERY = gql`
	query UserVerificationRequestsForUser {
		userVerificationRequestsForUser {
			...UserVerificationRequest
		}
	}
	${UserVerificationRequestFragments.userVerificationRequest}
`;

interface QueryData {
	userVerificationRequestsForUser: UserVerificationRequest[];
}

const useUserVerificationRequestsForUser = (): [
	UserVerificationRequest[] | undefined,
	LazyQueryResult<QueryData, {}>
] => {
	const [makeQuery, query] = useLazyQuery<QueryData>(
		USER_VERIFICATION_REQUESTS_QUERY
	);

	useEffect(() => {
		makeQuery();
	}, [makeQuery]);

	const verificationRequests = query?.data?.userVerificationRequestsForUser;

	return [verificationRequests, query];
};

export default useUserVerificationRequestsForUser;
