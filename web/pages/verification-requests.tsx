import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, gql } from "@apollo/client";
import compareDesc from "date-fns/compareDesc";

import { VerificationRequestFragments } from "fragments";
import {
	isApprovedVerificationRequest,
	isDeniedVerificationRequest,
	isPendingVerificationRequest,
	VerificationRequest,
	VerificationRequestStatus,
} from "types";
import EntityService from "services/Entity";
import DateTimeService from "services/DateTime";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";
import RequireAdmin from "components/RequireAdmin";

const VERIFICATION_REQUESTS = gql`
	query VerificationRequests($input: VerificationRequestsInput!) {
		verificationRequests(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;

const UPDATE_VERIFICATION_REQUEST_STATUS = gql`
	mutation UpdateVerificationRequestStatus(
		$input: UpdateVerificationRequestStatusInput!
	) {
		updateVerificationRequestStatus(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;

interface QueryData {
	verificationRequests: VerificationRequest[];
}
interface QueryVariables {
	input: {
		take?: number;
		skip?: number;
		status?: VerificationRequestStatus;
	};
}
interface MutationData {
	updateVerificationRequestStatus: VerificationRequest;
}
interface MutationVariables {
	input: {
		id: string;
		status: VerificationRequestStatus;
	};
}

const VerificationRequests = () => {
	const [statusToFetch, setStatusToFetch] = useState<
		VerificationRequestStatus | undefined
	>(VerificationRequestStatus.Pending);

	const onChangeStatusToFetch = (event) => {
		const updatedStatus = event.target.value;
		if (!updatedStatus) {
			setStatusToFetch(undefined);
		} else {
			setStatusToFetch(event.target.value as VerificationRequestStatus);
		}
	};

	const {
		loading: verificationRequestsLoading,
		data: verificationRequestsData,
		error: verificationRequestsError,
	} = useQuery<QueryData, QueryVariables>(VERIFICATION_REQUESTS, {
		// Take a high number until we implement pagination
		variables: { input: { take: 200, skip: 0, status: statusToFetch } },
		fetchPolicy: "network-only",
	});

	const verificationRequests = useMemo(() => {
		if (!verificationRequestsData?.verificationRequests) {
			return [];
		}
		const sortedVerificationRequests = [
			...verificationRequestsData.verificationRequests,
		];
		sortedVerificationRequests.sort((a, b) =>
			compareDesc(new Date(a.createdAt), new Date(b.createdAt))
		);
		return sortedVerificationRequests;
	}, [verificationRequestsData]);

	const [
		updateVerificationRequestStatus,
		{
			loading: updateVerificationRequestStatusLoading,
			error: updateVerificationRequestStatusError,
		},
	] = useMutation<MutationData, MutationVariables>(
		UPDATE_VERIFICATION_REQUEST_STATUS,
		{ errorPolicy: "all" }
	);

	const onApproveClicked = (id: string) => {
		updateVerificationRequestStatus({
			variables: { input: { id, status: VerificationRequestStatus.Approved } },
		});
	};

	const onDenyClicked = (id: string) => {
		updateVerificationRequestStatus({
			variables: { input: { id, status: VerificationRequestStatus.Denied } },
		});
	};

	useEffect(() => {
		if (updateVerificationRequestStatusError) {
			window.alert(
				"Error updating Verification Request status. Please reload the page and try again."
			);
		}
	}, [updateVerificationRequestStatusError]);

	return (
		<Layout>
			<RequireAdmin>
				<>
					<h1 className="mb-4">Verification Requests</h1>

					<select
						className="mb-6 flex max-w-xs"
						value={statusToFetch}
						onChange={onChangeStatusToFetch}
					>
						<option value={VerificationRequestStatus.Pending}>Pending</option>
						<option value={VerificationRequestStatus.Approved}>Approved</option>
						<option value={VerificationRequestStatus.Denied}>Denied</option>
						<option value="">All</option>
					</select>

					{verificationRequestsLoading && <LoadingBlock />}
					{verificationRequestsError && (
						<div className="text-red-600">
							{verificationRequestsError.graphQLErrors.join(", ")}
						</div>
					)}
					{!verificationRequestsLoading &&
						verificationRequests?.map((verificationRequest, index) => {
							const { id, person, createdAt, createdByUser, status } =
								verificationRequest;

							return (
								<div className="mb-4" key={index}>
									Created {DateTimeService.formatDateYearTime(createdAt)}
									<br />
									User{" "}
									<Link href={`/users/${createdByUser.id}`}>
										<a target="_blank">{createdByUser.username}</a>
									</Link>{" "}
									is asking to be verified as Person{" "}
									<Link href={EntityService.makeHrefForView(person)}>
										<a target="_blank">{person.name}</a>
									</Link>
									<br />
									Proof: <a href="">Image</a>
									<br />
									Email: {createdByUser.email}
									<br />
									Status: {status}
									<br />
									{isApprovedVerificationRequest(verificationRequest) && (
										<button
											className="btn-text"
											disabled={updateVerificationRequestStatusLoading}
											onClick={() => onDenyClicked(id)}
										>
											Deny
										</button>
									)}
									{isDeniedVerificationRequest(verificationRequest) && (
										<button
											className="btn-text"
											disabled={updateVerificationRequestStatusLoading}
											onClick={() => onApproveClicked(id)}
										>
											Approve
										</button>
									)}
									{isPendingVerificationRequest(verificationRequest) && (
										<>
											<button
												className="btn-text mr-4"
												disabled={updateVerificationRequestStatusLoading}
												onClick={() => onApproveClicked(id)}
											>
												Approve
											</button>
											<button
												className="btn-text"
												disabled={updateVerificationRequestStatusLoading}
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

export default VerificationRequests;
