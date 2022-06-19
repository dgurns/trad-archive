import { Link, useLoaderData } from "@remix-run/react";
import { type DataFunctionArgs } from "@remix-run/node";
import { type Tune } from "@prisma/client";

import EntityService from "~/services/Entity";
import useFilters from "~/hooks/useFilters";

import Layout from "~/components/Layout";
import { db } from "~/utils/db.server";

export function meta() {
	return {
		title: "Trad Archive - Tunes",
	};
}

const PER_PAGE = 100;

interface LoaderData {
	tunes: Tune[];
	totalTunes: number;
}

export async function loader({
	request,
}: DataFunctionArgs): Promise<LoaderData> {
	const url = new URL(request.url);
	const params = new URLSearchParams(url.search);
	const page = Number(params.get("page") ?? 1);
	const perPage = Number(params.get("perPage") ?? PER_PAGE);

	const [tunes, totalTunes] = await Promise.all([
		db.tune.findMany({
			take: perPage,
			skip: perPage * (page - 1),
			orderBy: {
				name: "asc",
			},
		}),
		db.tune.count(),
	]);

	return {
		tunes,
		totalTunes,
	};
}

const Tunes = () => {
	const { tunes, totalTunes } = useLoaderData<LoaderData>();

	const { Filters, filtersProps } = useFilters({
		totalItems: totalTunes,
		defaultPerPage: PER_PAGE,
	});

	return (
		<Layout>
			<h1>Tunes</h1>
			<Filters
				{...filtersProps}
				sortBy={undefined}
				viewAs={undefined}
				className="sticky left-0 right-0 py-4 bg-gray-100 top-[48px] mb-6"
			/>

			{tunes.length === 0 && (
				<div className="text-gray-500">No Tunes found</div>
			)}
			{tunes.length > 0 && (
				<ul>
					{tunes.map((tune, index) => (
						<li className="mb-2" key={index}>
							<Link to={EntityService.makeHrefForView(tune)}>{tune.name}</Link>
						</li>
					))}
				</ul>
			)}
		</Layout>
	);
};

export default Tunes;
