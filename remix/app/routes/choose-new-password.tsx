import {
	type ActionFunction,
	type LoaderFunction,
	json,
	redirect,
} from "@remix-run/node";
import {
	Link,
	useLoaderData,
	useTransition,
	useSearchParams,
} from "@remix-run/react";
import bcrypt from "bcryptjs";
import isAfter from "date-fns/isAfter";

import { db } from "~/utils/db.server";
import { getSession, commitSession } from "~/sessions.server";
import Layout from "~/components/Layout";

interface LoaderData {
	validationError: string | null;
	error: string | null;
}

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const validationError = session.get("validationError") || null;
	let error: string | null = null;

	const url = new URL(request.url);
	const params = url.searchParams;
	const userEmail = params.get("userEmail") ?? "";
	const tokenUnhashed = params.get("tokenUnhashed") ?? "";

	const user = await db.user.findUnique({ where: { email: userEmail } });
	if (!user || !user.autoLoginTokenHashed || !user.autoLoginTokenExpiry) {
		return redirect("/reset-password");
	}

	// Check token. If valid, set user on session and redirect to homepage.
	const tokenIsMatch = await bcrypt.compare(
		tokenUnhashed,
		user.autoLoginTokenHashed
	);
	const expiryIsValid = isAfter(
		new Date(user.autoLoginTokenExpiry),
		new Date()
	);
	if (!tokenIsMatch || !expiryIsValid) {
		error =
			"Reset password link is invalid or expired. Please request another one.";
	}

	return json(
		{ validationError, error },
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		}
	);
};

export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const { searchParams } = new URL(request.url);

	const formData = await request.formData();
	const email = String(formData.get("email") ?? "");
	const password = String(formData.get("password") ?? "");
	const passwordConfirm = String(formData.get("password_confirm") ?? "");
	if (password !== passwordConfirm) {
		session.flash("validationError", "Passwords don't match");
		return redirect(`/choose-new-password?${searchParams.toString()}`, {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}

	const user = await db.user.findUnique({ where: { email } });
	if (!user) {
		return redirect("/reset-password");
	}

	// Update the user in DB, set in session cookie, and redirect to homepage
	const newPasswordHashed = bcrypt.hashSync(password, 10);
	await db.user.update({
		where: { email },
		data: {
			passwordHashed: newPasswordHashed,
			autoLoginTokenHashed: null,
			autoLoginTokenExpiry: null,
		},
	});
	session.set("userId", user.id);
	return redirect("/", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};

export default function ChooseNewPassword() {
	const transition = useTransition();
	const { error, validationError } = useLoaderData<LoaderData>();
	const [searchParams] = useSearchParams();
	const email = searchParams.get("userEmail") ?? "";

	return (
		<Layout>
			<h1 className="mb-6">Choose a new password</h1>

			{error ? (
				<div>
					<p className="text-red-600 mb-6">{error}</p>
					<Link to="/reset-password">Reset Password</Link>
				</div>
			) : (
				<div className="flex flex-col align-start max-w-xs">
					<form method="post" className="space-y-4 mb-6">
						<input
							type="password"
							placeholder="New password"
							autoFocus
							required
							name="password"
						/>
						<input
							type="password"
							placeholder="New password (again)"
							required
							name="password_confirm"
						/>
						<input type="hidden" name="email" value={email} />

						<input
							type="submit"
							className="btn w-auto"
							disabled={transition.state === "submitting"}
							value="Save"
						/>
					</form>

					{validationError && (
						<div className="text-red-600">{validationError}</div>
					)}
				</div>
			)}
		</Layout>
	);
}
