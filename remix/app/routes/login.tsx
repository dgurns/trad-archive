import { useLocation, Link, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import bcrypt from "bcryptjs";

import { db } from "~/utils/db.server";
import { getSession, commitSession } from "~/sessions";
import Layout from "~/components/Layout";

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const url = new URL(request.url);
	const redirectTo = url.searchParams.get("redirectTo");
	if (session.has("userId")) {
		return redirect(redirectTo || "/");
	}

	const data = { error: session.get("error") };

	return json(data, {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};

export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const url = new URL(request.url);
	const redirectTo = url.searchParams.get("redirectTo");

	const formData = await request.formData();
	const email = String(formData.get("email") ?? "");
	const password = String(formData.get("password") ?? "");

	const user = await db.user.findUnique({ where: { email } });
	if (!user) {
		session.flash("error", "Could not find a user with this email");
		return redirect("/login", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}
	if (!user.passwordHashed) {
		session.flash(
			"error",
			"This user does not have a password. TODO: Redirect to /reset-password page"
		);
		return redirect("/login", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}

	const passwordIsValid = bcrypt.compareSync(password, user.passwordHashed);
	if (!passwordIsValid) {
		session.flash("error", "Incorrect password");
		return redirect("/login", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}

	// Email and password are valid; set the userId in a session cookie and
	// redirect
	session.set("userId", user.id);
	return redirect(redirectTo || "/", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};

export default function Login() {
	const { error } = useLoaderData();

	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const redirectTo = params.get("redirectTo");

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
						type="text"
						placeholder="Email"
						autoFocus
						required
						className="mb-4"
						name="email"
					/>
					<input
						type="password"
						placeholder="Password"
						required
						className="mb-4"
						name="password"
					/>
					<input
						type="submit"
						className="btn mb-4 w-auto"
						// disabled={loading}
						value="Log In"
					/>
				</form>
				{error && <div className="text-red-600 mb-4">{error}</div>}
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
