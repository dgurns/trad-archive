import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/sessions";
import Layout from "~/components/Layout";

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	return redirect("/login", {
		headers: {
			"Set-Cookie": await destroySession(session),
		},
	});
};

const LogOut = () => (
	<Layout>
		<span className="text-gray-500">Logging out...</span>
	</Layout>
);

export default LogOut;
