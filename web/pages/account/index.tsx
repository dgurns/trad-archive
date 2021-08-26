import { useMemo } from "react";
import Link from "next/link";

import {
	isApprovedUserVerificationRequest,
	isPendingUserVerificationRequest,
} from "types";
import EntityService from "services/Entity";
import useUserVerificationRequestsForUser from "hooks/useUserVerificationRequestsForUser";

import Layout from "components/Layout";
import RequireUser from "components/RequireUser";

const AccountHome = () => {
	const [verificationRequests = [], { loading, data, error }] =
		useUserVerificationRequestsForUser();

	const verifyYourselfMarkup = useMemo(() => {
		if (!loading && error) {
			return "Error fetching verification status. Please reload.";
		} else if (loading) {
			return "Loading verification status...";
		}
		const approvedRequest = verificationRequests.find((request) =>
			isApprovedUserVerificationRequest(request)
		);
		if (approvedRequest) {
			return (
				<span>
					You are verified as{" "}
					<Link href={EntityService.makeHrefForView(approvedRequest.person)}>
						{approvedRequest.person.name}
					</Link>
				</span>
			);
		}
		const pendingRequest = verificationRequests.find((request) =>
			isPendingUserVerificationRequest(request)
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
