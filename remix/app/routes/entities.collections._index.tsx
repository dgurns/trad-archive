import { Link, useLoaderData } from "@remix-run/react";
import { type Collection } from "@prisma/client";

import EntityService from "~/services/Entity";

import Layout from "~/components/Layout";
import { db } from "~/utils/db.server";

export function meta() {
	return [
		{
			title: "Trad Archive - Collections",
		},
	];
}

export function loader(): Promise<Collection[]> {
	return db.collection.findMany({
		orderBy: {
			name: "asc",
		},
	});
}

const Collections = () => {
	const collections = useLoaderData<Collection[]>();

	return (
		<Layout>
			<h1 className="mb-6">Collections</h1>
			{collections.length === 0 && (
				<div className="text-gray-500">No Collections found</div>
			)}
			{collections.length > 0 && (
				<ul>
					{collections.map((collection, index) => (
						<li className="mb-2" key={index}>
							<Link to={EntityService.makeHrefForView(collection)}>
								{collection.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</Layout>
	);
};

export default Collections;
