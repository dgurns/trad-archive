import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import DateTimeService from "~/services/DateTime";
import { db } from "~/utils/db.server";

import Layout from "~/components/Layout";
import Breadcrumb from "~/components/Breadcrumb";
import type { User } from "@prisma/client";

interface LoaderData {
	user: User;
}

export const loader: LoaderFunction = async ({ params }) => {
	const user = await db.user.findUnique({ where: { id: params.id } });
	if (!user) {
		throw new Response("Not Found", {
			status: 404,
			statusText: "Could not find a user with this ID",
		});
	}
	return json<LoaderData>({ user });
};

const ViewUserById = () => {
	const { user } = useLoaderData<LoaderData>();
	const { username, createdAt } = user;

	return (
		<Layout>
			<div className="flex flex-col-reverse md:flex-row">
				<div className="flex flex-1 flex-col pb-8">
					<Breadcrumb
						className="mb-6"
						items={[{ label: "Users" }, { label: username }]}
					/>

					<div className="flex-col mb-8">
						<div>
							Account Created:
							<br />
							<span className="text-gray-500">
								{DateTimeService.formatDateYear(createdAt)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ViewUserById;
