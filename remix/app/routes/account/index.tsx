import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import type { User } from "@prisma/client";
import { UserRole } from "@prisma/client";

import Layout from "~/components/Layout";
import { getSession } from "~/sessions.server";
import { db } from "~/utils/db.server";

interface LoaderData {
	currentUser: User;
}

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const currentUserId = String(session.get("userId") ?? "");
	const currentUser = await db.user.findUnique({
		where: { id: currentUserId },
	});
	if (!currentUser) {
		const params = new URLSearchParams();
		params.set("redirectTo", "/account");
		return redirect(`/login?${params.toString()}`);
	}
	return json<LoaderData>({ currentUser });
};

export default function AccountHome() {
	const { currentUser } = useLoaderData();

	return (
		<Layout>
			<h1 className="mb-6">Account</h1>
			<div className="flex flex-col space-y-2">
				<Link to="/reset-password">Change Password</Link>
				<Link to="/logout">Log Out </Link>
			</div>

			{currentUser.role === UserRole.Admin && (
				<div className="flex flex-col space-y-2 mt-8">
					<p className="italic">Admin</p>
					<Link to="/scripts/export-to-atom-csv">
						Export AtoM CSV (experimental)
					</Link>
				</div>
			)}
		</Layout>
	);
}
