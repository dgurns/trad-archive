import { Link, useLoaderData } from "@remix-run/react";
import { type Person } from "@prisma/client";

import EntityService from "~/services/Entity";

import Layout from "~/components/Layout";
import { db } from "~/utils/db.server";

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
