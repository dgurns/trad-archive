import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMutation, gql } from "@apollo/client";

import { UserFragments } from "fragments";
import { User } from "types";
import useCurrentUser from "hooks/useCurrentUser";

import Layout from "components/Layout";
import LoadingCircle from "components/LoadingCircle";

const AUTHENTICATE_WITH_AUTO_LOGIN_TOKEN = gql`
	mutation AuthenticateWithAutoLoginToken(
		$input: AuthenticateWithAutoLoginTokenInput!
	) {
		authenticateWithAutoLoginToken(input: $input) {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;

interface MutationData {
	authenticateWithAutoLoginToken: User;
}
interface MutationVars {
	input: {
		tokenUnhashed: string;
		userEmail: string;
	};
}

const AutoLogin = () => {
	const router = useRouter();
	const { tokenUnhashed, userEmail, redirectTo } = router.query;

	const [currentUser, { refetch: refetchCurrentUser }] = useCurrentUser();

	const [authenticateWithAutoLoginToken, { loading, data, error }] =
		useMutation<MutationData, MutationVars>(AUTHENTICATE_WITH_AUTO_LOGIN_TOKEN);

	// When a token and email are present in query params, attempt to authenticate
	useEffect(() => {
		if (typeof tokenUnhashed !== "string" || typeof userEmail !== "string") {
			return;
		}
		const authenticate = async () => {
			try {
				await authenticateWithAutoLoginToken({
					variables: { input: { tokenUnhashed, userEmail } },
				});
			} catch {
				//
			}
		};
		authenticate();
	}, [tokenUnhashed, authenticateWithAutoLoginToken]);

	// Once auto-login token is authenticated, a cookie will now be set with JWT.
	// Refetch current user with that cookie.
	useEffect(() => {
		if (data?.authenticateWithAutoLoginToken) {
			refetchCurrentUser();
		}
	}, [data, refetchCurrentUser]);

	// If the current user is logged in, redirect if applicable or go to homepage
	if (currentUser) {
		router.push(typeof redirectTo === "string" ? redirectTo : "/");
	}

	const checkYourEmailContent = (
		<>
			<h1 className="mb-3">Check your email</h1>
			<div className="flex flex-row mb-6">
				<i className="material-icons mr-2">mail_outline</i>
				We've emailed a magic link to you. Click it to log in.
			</div>
			<div className="text-gray-500">
				Didn't get it? Check your spam folder or{" "}
				<Link
					href={{
						pathname: "/login",
						query: redirectTo ? { redirectTo } : undefined,
					}}
				>
					send a new one
				</Link>
			</div>
		</>
	);

	const loadingContent = (
		<div className="flex flex-row items-center justify-center">
			<LoadingCircle className="mr-4" />
			<span className="text-gray-500">Authenticating...</span>
		</div>
	);

	const errorContent = (
		<>
			<div className="text-red-600 mb-4">
				Error: {error?.graphQLErrors?.map(({ message }) => message)}
			</div>
			<Link
				href={{
					pathname: "/login",
					query: redirectTo ? { redirectTo } : undefined,
				}}
			>
				Send a new login link
			</Link>
		</>
	);

	return (
		<Layout>
			{!loading && !error && checkYourEmailContent}
			{loading && loadingContent}
			{error && errorContent}
		</Layout>
	);
};

export default AutoLogin;
