import { useEffect } from "react";
import type { LazyQueryResult } from "@apollo/client";
import { gql, useLazyQuery } from "@apollo/client";

import { VerificationRequestFragments } from "~/fragments";
import type { VerificationRequest } from "~/types";

const VERIFICATION_REQUESTS_FOR_CURRENT_USER_QUERY = gql`
	query VerificationRequestsForCurrentUser {
		verificationRequestsForCurrentUser {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;

interface QueryData {
	verificationRequestsForCurrentUser: VerificationRequest[];
}

const useVerificationRequestsForCurrentUser = (): [
	VerificationRequest[] | undefined,
	LazyQueryResult<QueryData, {}>
] => {
	const [makeQuery, query] = useLazyQuery<QueryData>(
		VERIFICATION_REQUESTS_FOR_CURRENT_USER_QUERY
	);

	useEffect(() => {
		makeQuery();
	}, [makeQuery]);

	const verificationRequests = query?.data?.verificationRequestsForCurrentUser;

	return [verificationRequests, query];
};

export default useVerificationRequestsForCurrentUser;
