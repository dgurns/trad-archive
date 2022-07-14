import { Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import type { User } from "@prisma/client";

import Layout from "~/components/Layout";
import { getSession } from "~/sessions";
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
	return (
		<Layout>
			<h1 className="mb-4">Account</h1>
			<Link to="/logout">Log Out </Link>
		</Layout>
	);
}
