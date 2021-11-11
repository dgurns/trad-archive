import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMutation, gql } from "@apollo/client";

import useCurrentUser from "hooks/useCurrentUser";
import Layout from "components/Layout";
import { User } from "types";
import { UserFragments } from "fragments";

const LOG_IN_MUTATION = gql`
	mutation LogIn($input: LogInInput!) {
		logIn(input: $input) {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;
interface MutationData {
	logIn: User;
}

const Login = () => {
	const router = useRouter();
	const { redirectTo } = router.query;
	const [currentUser] = useCurrentUser();

	const [email, setEmail] = useState("");

	const [logIn, { loading, data, error }] = useMutation<MutationData>(
		LOG_IN_MUTATION,
		{
			errorPolicy: "all",
		}
	);

	const onLogIn = (event) => {
		event.preventDefault();
		const cleanedEmail = email.trim().toLowerCase();
		logIn({
			variables: { input: { email: cleanedEmail, redirectTo } },
		});
	};

	useEffect(() => {
		if (data?.logIn) {
			router.push("/auto-login");
		}
	}, [data, router]);

	if (currentUser) {
		router.push(typeof redirectTo === "string" ? redirectTo : "/");
	}

	const signUpLinkQueryParams = redirectTo ? { redirectTo } : undefined;

	return (
		<Layout>
			<h1 className="mb-6">
				Log in to {redirectTo ? "continue" : "Trad Archive"}
			</h1>
			<div className="flex flex-col align-start max-w-xs">
				<form onSubmit={onLogIn}>
					<input
						placeholder="Your email"
						autoFocus
						className="mb-4"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<input
						type="submit"
						className="btn mb-4 w-auto"
						disabled={loading}
						value="Log In"
					/>
				</form>
				{error && <div className="text-red-600 mb-4">{error.message}</div>}
				<div>
					Don't have an account yet?{" "}
					<Link href={{ pathname: "/signup", query: signUpLinkQueryParams }}>
						Sign Up
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
