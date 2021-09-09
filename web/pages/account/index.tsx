import { useMemo } from "react";
import Link from "next/link";

import {
	isApprovedVerificationRequest,
	isPendingVerificationRequest,
} from "types";
import EntityService from "services/Entity";
import useVerificationRequestsForCurrentUser from "hooks/useVerificationRequestsForCurrentUser";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";

const AccountHome = () => {
	const [verificationRequests = [], { loading, data, error }] =
		useVerificationRequestsForCurrentUser();

	const verifyYourselfMarkup = useMemo(() => {
		if (!loading && error) {
			return (
				<span className="text-red-600">
					Error fetching verification status. Please reload.
				</span>
			);
		} else if (loading) {
			return (
				<span className="text-gray-500">Loading verification status...</span>
			);
		}
		const approvedRequest = verificationRequests.find((request) =>
			isApprovedVerificationRequest(request)
		);
		if (approvedRequest) {
			return (
				<span className="flex flex-row items-center">
					<i className="material-icons text-base">verified</i>
					<span className="ml-2 mr-1">You are verified as</span>
					<Link href={EntityService.makeHrefForView(approvedRequest.person)}>
						{approvedRequest.person.name}
					</Link>
				</span>
			);
		}
		const pendingRequest = verificationRequests.find((request) =>
			isPendingVerificationRequest(request)
		);
		if (pendingRequest) {
			return (
				<span>
					Your request to verify as {pendingRequest.person.name} is pending
				</span>
			);
		}
		return (
			<Link href="/account/verify">Verify Yourself and Link Person Tag</Link>
		);
	}, [data, loading, error, verificationRequests]);

	return (
		<Layout>
			<RequireUser>
				<h1 className="mb-4">Account</h1>
				{verifyYourselfMarkup}
				<Link href="/logout">
					<a className="block mt-2">Log Out</a>
				</Link>
			</RequireUser>
		</Layout>
	);
};

export default AccountHome;
