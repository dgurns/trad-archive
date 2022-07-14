import {
	useLocation,
	Link,
	useLoaderData,
	useTransition,
} from "@remix-run/react";
import bcrypt from "bcryptjs";

import Layout from "~/components/Layout";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { commitSession, getSession } from "~/sessions";
import { db } from "~/utils/db.server";

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
	const fullName = String(formData.get("full_name") ?? "");
	const password = String(formData.get("password") ?? "");
	const passwordConfirm = String(formData.get("password_confirm") ?? "");

	// Check for an existing user with this email
	const user = await db.user.findUnique({ where: { email } });
	if (user) {
		session.flash(
			"error",
			"There is already a user with this email address. Try logging in?"
		);
		return redirect("/signup", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}

	// Validate inputs
	const emailValidityRegex = new RegExp(
		/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	);
	const emailIsValid = emailValidityRegex.test(email);
	if (!emailIsValid) {
		session.flash("error", "Email is not valid");
		return redirect("/signup", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}
	const fullNameIsValid = fullName.split(" ").length >= 2;
	if (!fullNameIsValid) {
		session.flash("error", "Please enter your full name");
		return redirect("/signup", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}
	const passwordsMatch = password === passwordConfirm;
	if (!passwordsMatch) {
		session.flash("error", "Passwords don't match");
		return redirect("/signup", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}
	const passwordIsValid = password.length >= 8;
	if (!passwordIsValid) {
		session.flash("error", "Password must be at least 8 characters long");
		return redirect("/signup", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}

	// Everything is valid - create the user and set it in a cookie
	const passwordHashed = bcrypt.hashSync(password, 10);
	const newUser = await db.user.create({
		data: {
			email,
			username: fullName,
			passwordHashed,
		},
	});
	session.set("userId", newUser.id);
	return redirect(redirectTo || "/", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};

export default function SignUp() {
	const { error } = useLoaderData();
	const { state } = useTransition();

	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const redirectTo = params.get("redirectTo");

	const logInLinkQueryParams = new URLSearchParams(
		redirectTo ? { redirectTo } : undefined
	);

	return (
		<Layout>
			<h1 className="mb-6">
				{redirectTo ? "Create an account to continue" : "Create your account"}
			</h1>
			<div className="flex flex-col align-start max-w-xs">
				<form method="post" className="space-y-4 mb-4">
					<input
						type="text"
						name="email"
						placeholder="Your email"
						autoFocus
						required
					/>
					<input
						type="text"
						name="full_name"
						placeholder="Your full name"
						required
					/>
					<input
						type="password"
						name="password"
						required
						placeholder="Choose a password"
					/>
					<input
						type="password"
						name="password_confirm"
						required
						placeholder="Password (again)"
					/>
					<input
						type="submit"
						className="btn mb-4 w-auto"
						disabled={state !== "idle"}
						value="Sign Up"
					/>
				</form>

				{error && <div className="text-red-600 mb-4">{error}</div>}

				<div>
					Already have an account?{" "}
					<Link to={`/login?${logInLinkQueryParams.toString()}`}>Log in</Link>
				</div>
			</div>
		</Layout>
	);
}
