import { useActionData, useLocation, useNavigate } from "@remix-run/react";
import { Link } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { db } from "~/utils/db.server";
import useCurrentUser from "~/hooks/useCurrentUser";
import Layout from "~/components/Layout";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const email = String(formData.get("email") ?? "");
	if (!email) {
		return json("Must provide an email", {
			status: 401,
		});
	}

	const user = await db.user.findUnique({ where: { email } });
	if (!user) {
		return json("Could not find a user with that email address", {
			status: 401,
		});
	}

	// const { tokenUnhashed, tokenHashed, tokenExpiry } =
	// 	await AuthService.createAutoLoginToken();
	// user.autoLoginTokenHashed = tokenHashed;
	// user.autoLoginTokenExpiry = tokenExpiry;
	// await user.save();

	// await MailerService.sendEmailWithAutoLoginUrl({
	// 	user,
	// 	autoLoginTokenUnhashed: tokenUnhashed,
	// 	redirectTo,
	// });
};

export default function Login() {
	const error = useActionData();

	const navigate = useNavigate();
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const redirectTo = params.get("redirectTo");
	const [currentUser] = useCurrentUser();

	if (currentUser) {
		navigate(typeof redirectTo === "string" ? redirectTo : "/");
	}

	const signUpLinkQueryParams = new URLSearchParams(
		redirectTo ? { redirectTo } : undefined
	);

	return (
		<Layout>
			<h1 className="mb-6">
				Log in to {redirectTo ? "continue" : "Trad Archive"}
			</h1>
			<div className="flex flex-col align-start max-w-xs">
				<form method="post">
					<input
						placeholder="Your email"
						autoFocus
						required
						className="mb-4"
						name="email"
					/>
					<input
						type="submit"
						className="btn mb-4 w-auto"
						// disabled={loading}
						value="Log In"
					/>
				</form>
				{error && <div className="text-red-600 mb-4">{error.message}</div>}
				<div>
					Don't have an account yet?{" "}
					<Link to={`/signup?${signUpLinkQueryParams.toString()}`}>
						Sign Up
					</Link>
				</div>
			</div>
		</Layout>
	);
}
