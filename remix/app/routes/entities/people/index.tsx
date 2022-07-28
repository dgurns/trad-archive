import { Link, useLoaderData } from "@remix-run/react";
import { type ActionFunction, json, redirect } from "@remix-run/node";
import { type Person } from "@prisma/client";

import EntityService from "~/services/Entity";

import Layout from "~/components/Layout";
import { db } from "~/utils/db.server";
import { getSession } from "~/sessions.server";

export function meta() {
	return {
		title: "Trad Archive - People",
	};
}

export function loader(): Promise<Person[]> {
	return db.person.findMany({
		orderBy: {
			name: "asc",
		},
	});
}

interface ActionData {
	error?: string;
	person?: Person;
}

export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get("Cookie"));
	const userId = String(session.get("userId") ?? "");
	const referer = String(request.headers.get("referer") ?? "");

	const redirectTo = encodeURIComponent(
		referer ? new URL(referer).pathname : "/"
	);
	if (!userId) {
		return redirect(`/login?redirectTo=${redirectTo}`);
	}

	const formData = await request.formData();
	const firstName = String(formData.get("first_name") ?? "");
	const middleName = String(formData.get("middle_name") ?? "");
	const lastName = String(formData.get("last_name") ?? "");
	const slug = String(formData.get("slug") ?? "");
	const description = String(formData.get("description") ?? "");
	const aliases = String(formData.get("aliases") ?? "");

	const name = middleName
		? `${firstName} ${middleName} ${lastName}`
		: `${firstName} ${lastName}`;
	const cleanedSlug = EntityService.cleanSlug(slug);

	let error;
	if (!firstName || !lastName || !slug) {
		error = "Must enter first name, last name, and slug";
	}
	if (error) {
		return json<ActionData>({ error }, { status: 400 });
	}

	const existing = await db.person.findFirst({ where: { slug: cleanedSlug } });
	if (existing) {
		return json<ActionData>(
			{
				error: `This slug is already being used for an existing Person: ${existing.name}`,
			},
			{ status: 400 }
		);
	}

	try {
		const person = await db.person.create({
			data: {
				firstName,
				middleName,
				lastName,
				name,
				slug: cleanedSlug,
				description,
				aliases,
				createdByUserId: userId,
				updatedByUserId: userId,
			},
		});
		return json<ActionData>({ person }, { status: 201 });
	} catch {
		return json<ActionData>(
			{ error: "Error creating Person" },
			{ status: 500 }
		);
	}
};

const People = () => {
	const people = useLoaderData<Person[]>();

	return (
		<Layout>
			<h1 className="mb-6">People</h1>
			{people.length === 0 && (
				<div className="text-gray-500">No People found</div>
			)}
			{people.length > 0 && (
				<ul>
					{people.map((person, index) => (
						<li className="mb-2" key={index}>
							<Link to={EntityService.makeHrefForView(person)}>
								{person.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</Layout>
	);
};

export default People;
