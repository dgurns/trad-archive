import {
	type ActionFunction,
	type LoaderFunction,
	json,
	redirect,
} from "@remix-run/node";
import { Link, useLoaderData, useTransition } from "@remix-run/react";
import sendgrid from "@sendgrid/mail";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import addMinutes from "date-fns/addMinutes";

import { db } from "~/utils/db.server";
import { getSession, commitSession } from "~/sessions.server";
import Layout from "~/components/Layout";

interface LoaderData {
	error: string | null;
	confirmation: string | null;
}

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const error = session.get("error") || null;
	const confirmation = session.get("confirmation") || null;
	return json(
		{ error, confirmation },
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		}
	);
};

export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const formData = await request.formData();
	const email = String(formData.get("email") ?? "");

	const user = await db.user.findUnique({ where: { email } });
	if (!user) {
		session.flash("error", "Could not find a user with that email");
		return redirect("/reset-password", {
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		});
	}

	// create an auto-login token for the user and save hashed version in DB
	const autoLoginTokenUnhashed = uuid();
	const autoLoginTokenHashed = await bcrypt.hash(autoLoginTokenUnhashed, 10);
	const autoLoginTokenExpiry = addMinutes(new Date(), 10);
	await db.user.update({
		where: { id: user.id },
		data: { autoLoginTokenHashed, autoLoginTokenExpiry },
	});

	// email a link with unhashed auto-login token to the user
	sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? "");

	const params = new URLSearchParams({
		tokenUnhashed: autoLoginTokenUnhashed,
		userEmail: email,
	});
	const origin = new URL(request.url).origin;
	const url = `${origin}/choose-new-password?${params.toString()}`;

	const data = {
		to: user.email,
		from: "no-reply@tradarchive.com",
		subject: "Reset your password for Trad Archive",
		text: `Hi ${user.username}, click this link to reset your password for Trad Archive: ${url} . This link will be valid for the next 10 minutes. If you didn't request this, you can ignore this email.`,
		html: `
			Hi ${user.username},
			<br /><br />
			<a href="${url}">Click here to reset your password for Trad Archive</a>
			<br /><br />
			This link will be valid for the next 10 minutes.
			<br /><br />
			- - -
			<br /><br />
			If it doesn't work, copy and paste this URL into your browser:
			<br /><br />
			<em>${url}</em>
		`,
	};

	await sendgrid.send(data);

	session.flash(
		"confirmation",
		"Check your email for a link to reset your password"
	);
	return redirect("/reset-password", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
};

export default function ResetPassword() {
	const transition = useTransition();
	const { error, confirmation } = useLoaderData<LoaderData>();

	return (
		<Layout>
			<h1 className="mb-4">Reset your password</h1>

			{confirmation ? (
				<div className="flex flex-row items-center">
					<i className="material-icons mr-1">mail_outline</i>
					{confirmation}
				</div>
			) : (
				<>
					<p className="text-gray-500 mb-4">
						We'll send you an email with a link to reset your password.
					</p>
					<div className="flex flex-col align-start max-w-xs">
						<form method="post" className="space-y-4 mb-6">
							<input
								type="text"
								placeholder="Email"
								autoFocus
								required
								name="email"
							/>

							<input
								type="submit"
								className="btn w-auto"
								disabled={transition.state === "submitting"}
								value="Send Email"
							/>
						</form>

						{error && <div className="text-red-600 mb-6">{error}</div>}

						<p>
							<Link to="/login">Go Back</Link>
						</p>
					</div>
				</>
			)}
		</Layout>
	);
}
