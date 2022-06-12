import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { useMutation, gql } from "@apollo/client";

import useCurrentUser from "~/hooks/useCurrentUser";
import Layout from "~/components/Layout";
import type { User } from "~/types";
import { UserFragments } from "~/fragments";

const SIGN_UP_MUTATION = gql`
	mutation SignUp($input: SignUpInput!) {
		signUp(input: $input) {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;
interface MutationData {
	signUp: User;
}

const SignUp = () => {
	const navigate = useNavigate();
	const { redirectTo } = navigate.query;
	const [currentUser] = useCurrentUser();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [validationError, setValidationError] = useState("");

	const [signUp, { loading, data, error }] = useMutation<MutationData>(
		SIGN_UP_MUTATION,
		{
			errorPolicy: "all",
		}
	);
	const onSignUp = (event) => {
		event.preventDefault();
		setValidationError("");
		const cleanedEmail = email.trim().toLowerCase();
		signUp({
			variables: {
				input: { email: cleanedEmail, username, redirectTo },
			},
		});
	};

	useEffect(() => {
		if (data?.signUp) {
			navigate("/auto-login");
		}
	}, [data, navigate]);

	if (currentUser) {
		navigate(typeof redirectTo === "string" ? redirectTo : "/");
	}

	const logInLinkQueryParams = redirectTo ? { redirectTo } : undefined;

	return (
		<Layout>
			<h1 className="mb-6">
				{redirectTo ? "Create an account to continue" : "Create your account"}
			</h1>
			<div className="flex flex-col align-start max-w-xs">
				<form onSubmit={onSignUp}>
					<input
						placeholder="Your email"
						autoFocus
						className="mb-2"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<input
						placeholder="Your full name"
						className="mb-4"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
					<input
						type="submit"
						className="btn mb-4 w-auto"
						disabled={loading}
						value="Sign Up"
					/>
				</form>

				{validationError && (
					<div className="text-red-600 mb-4">{validationError}</div>
				)}
				{error && <div className="text-red-600 mb-4">{error.message}</div>}

				<div>
					Already have an account?{" "}
					<Link to={{ pathname: "/login", query: logInLinkQueryParams }}>
						Log in
					</Link>
				</div>
			</div>
		</Layout>
	);
};

export default SignUp;
