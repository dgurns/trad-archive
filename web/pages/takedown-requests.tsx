import { useEffect, useMemo } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import compareDesc from "date-fns/compareDesc";

import { TakedownRequestFragments } from "fragments";
import {
	isApprovedTakedownRequest,
	isDeniedTakedownRequest,
	isPendingTakedownRequest,
	TakedownRequest,
	TakedownRequestStatus,
} from "types";
import EntityService from "services/Entity";
import DateTimeService from "services/DateTime";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";
import RequireAdmin from "components/RequireAdmin";

const TAKEDOWN_REQUESTS = gql`
	query TakedownRequests($input: TakedownRequestsInput!) {
		takedownRequests(input: $input) {
			...TakedownRequest
		}
	}
	${TakedownRequestFragments.takedownRequest}
`;

const UPDATE_TAKEDOWN_REQUEST_STATUS = gql`
	mutation UpdateTakedownRequestStatus(
		$input: UpdateTakedownRequestStatusInput!
	) {
		updateTakedownRequestStatus(input: $input) {
			...TakedownRequest
		}
	}
	${TakedownRequestFragments.takedownRequest}
`;

interface QueryData {
	takedownRequests: TakedownRequest[];
}
interface QueryVariables {
	input: {
		take?: number;
		skip?: number;
	};
}
interface MutationData {
	updateTakedownRequestStatus: TakedownRequest;
}
interface MutationVariables {
	input: {
		id: string;
		status: TakedownRequestStatus;
	};
}

const TakedownRequests = () => {
	const {
		loading: takedownRequestsLoading,
		data: takedownRequestsData,
		error: takedownRequestsError,
	} = useQuery<QueryData, QueryVariables>(TAKEDOWN_REQUESTS, {
		// Take a high number until we implement pagination
		variables: { input: { take: 200, skip: 0 } },
		fetchPolicy: "network-only",
	});

	const takedownRequests = useMemo(() => {
		if (!takedownRequestsData?.takedownRequests) {
			return [];
		}
		const sortedTakedownRequests = [...takedownRequestsData.takedownRequests];
		sortedTakedownRequests.sort((a, b) =>
			compareDesc(new Date(a.createdAt), new Date(b.createdAt))
		);
		return sortedTakedownRequests;
	}, [takedownRequestsData]);

	const [
		updateTakedownRequestStatus,
		{
			loading: updateTakedownRequestStatusLoading,
			error: updateTakedownRequestStatusError,
		},
	] = useMutation<MutationData, MutationVariables>(
		UPDATE_TAKEDOWN_REQUEST_STATUS,
		{ errorPolicy: "all" }
	);

	const onApproveClicked = (id: string) => {
		updateTakedownRequestStatus({
			variables: { input: { id, status: TakedownRequestStatus.Approved } },
		});
	};

	const onDenyClicked = (id: string) => {
		updateTakedownRequestStatus({
			variables: { input: { id, status: TakedownRequestStatus.Denied } },
		});
	};

	useEffect(() => {
		if (updateTakedownRequestStatusError) {
			window.alert(
				"Error updating Takedown Request status. Please reload the page and try again."
			);
		}
	}, [updateTakedownRequestStatusError]);

	return (
		<Layout>
			<RequireAdmin>
				<>
					<h1 className="mb-4">Takedown Requests</h1>
					{takedownRequestsLoading && <LoadingBlock />}
					{takedownRequestsError && (
						<div className="text-red-600">
							{takedownRequestsError.graphQLErrors.join(", ")}
						</div>
					)}
					{takedownRequests.length > 0 &&
						takedownRequests.map((takedownRequest, index) => {
							const {
								id,
								createdAt,
								createdByUser,
								entity,
								status,
								type,
								message,
							} = takedownRequest;

							return (
								<div className="mb-4" key={index}>
									Created {DateTimeService.formatDateYearTime(createdAt)} by{" "}
									{createdByUser.username}
									<br />
									Email: {createdByUser.email}
									<br />
									Entity:{" "}
									<a
										href={EntityService.makeHrefForView(entity)}
										target="_blank"
									>
										{entity.name}
									</a>
									<br />
									Takedown Type: {type}
									<br />
									Message: {message}
									<br />
									Status: {status}
									<br />
									{isApprovedTakedownRequest(takedownRequest) && (
										<button
											className="btn-text"
											disabled={updateTakedownRequestStatusLoading}
											onClick={() => onDenyClicked(id)}
										>
											Deny
										</button>
									)}
									{isDeniedTakedownRequest(takedownRequest) && (
										<button
											className="btn-text"
											disabled={updateTakedownRequestStatusLoading}
											onClick={() => onApproveClicked(id)}
										>
											Approve
										</button>
									)}
									{isPendingTakedownRequest(takedownRequest) && (
										<>
											<button
												className="btn-text mr-4"
												disabled={updateTakedownRequestStatusLoading}
												onClick={() => onApproveClicked(id)}
											>
												Approve
											</button>
											<button
												className="btn-text"
												disabled={updateTakedownRequestStatusLoading}
												onClick={() => onDenyClicked(id)}
											>
												Deny
											</button>
										</>
									)}
								</div>
							);
						})}
				</>
			</RequireAdmin>
		</Layout>
	);
};

export default TakedownRequests;
