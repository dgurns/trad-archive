import { Link, useLoaderData } from "@remix-run/react";
import { type Instrument } from "@prisma/client";

import EntityService from "~/services/Entity";

import Layout from "~/components/Layout";
import { db } from "~/utils/db.server";

export function meta() {
	return {
		title: "Trad Archive - Instruments",
	};
}

export function loader(): Promise<Instrument[]> {
	return db.instrument.findMany({
		orderBy: {
			name: "asc",
		},
	});
}

const Instruments = () => {
	const instruments = useLoaderData<Instrument[]>();

	return (
		<Layout>
			<h1 className="mb-6">Instruments</h1>
			{instruments.length === 0 && (
				<div className="text-gray-500">No Instruments found</div>
			)}
			{instruments.length > 0 && (
				<ul>
					{instruments.map((instrument, index) => (
						<li className="mb-2" key={index}>
							<Link to={EntityService.makeHrefForView(instrument)}>
								{instrument.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</Layout>
	);
};

export default Instruments;
