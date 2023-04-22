import { Link, useLoaderData } from "@remix-run/react";
import { type Place } from "@prisma/client";

import EntityService from "~/services/Entity";

import Layout from "~/components/Layout";
import { db } from "~/utils/db.server";

export function meta() {
	return [
		{
			title: "Trad Archive - Places",
		},
	];
}

export function loader(): Promise<Place[]> {
	return db.place.findMany({
		orderBy: {
			name: "asc",
		},
	});
}

const Places = () => {
	const places = useLoaderData<Place[]>();

	return (
		<Layout>
			<h1 className="mb-6">Places</h1>
			{places.length === 0 && (
				<div className="text-gray-500">No Places found</div>
			)}
			{places.length > 0 && (
				<ul>
					{places.map((place, index) => (
						<li className="mb-2" key={index}>
							<Link to={EntityService.makeHrefForView(place)}>
								{place.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</Layout>
	);
};

export default Places;
