import {
	useNavigate,
	useLocation,
	useActionData,
	Link,
} from "@remix-run/react";

import useCurrentUser from "~/hooks/useCurrentUser";
import Layout from "~/components/Layout";

export function SignUp() {
	const error = useActionData();

	const navigate = useNavigate();
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const redirectTo = params.get("redirectTo");
	const [currentUser] = useCurrentUser();

	if (currentUser) {
		navigate(typeof redirectTo === "string" ? redirectTo : "/");
	}

	const logInLinkQueryParams = new URLSearchParams(
		redirectTo ? { redirectTo } : undefined
	);

	return (
		<Layout>
			<h1 className="mb-6">
				{redirectTo ? "Create an account to continue" : "Create your account"}
			</h1>
			<div className="flex flex-col align-start max-w-xs">
				<form method="post">
					<input placeholder="Your email" autoFocus required className="mb-2" />
					<input placeholder="Your full name" required className="mb-4" />
					<input
						type="submit"
						className="btn mb-4 w-auto"
						// disabled={loading}
						value="Sign Up"
					/>
				</form>

				{error && <div className="text-red-600 mb-4">{error.message}</div>}

				<div>
					Already have an account?{" "}
					<Link to={`/login?${logInLinkQueryParams.toString()}`}>Log in</Link>
				</div>
			</div>
		</Layout>
	);
}
