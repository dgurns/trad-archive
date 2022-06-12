import { Link } from "@remix-run/react";

import useTunes from "~/hooks/useTunes";
import EntityService from "~/services/Entity";

import Layout from "~/components/Layout";
import LoadingBlock from "~/components/LoadingBlock";

const Tunes = () => {
	const [tunes, { loading, error }, fetchNextPage] = useTunes({
		resultsPerPage: 50,
	});

	return (
		<Layout pageTitle={`Trad Archive - Tunes`}>
			<h1 className="mb-6">Tunes</h1>
			{!loading && error && (
				<div className="text-red-600">Error fetching Tunes</div>
			)}
			{!loading && tunes?.length === 0 && (
				<div className="text-gray-500">No Tunes found</div>
			)}
			{tunes?.length > 0 && (
				<ul>
					{tunes.map((tune, index) => (
						<li className="mb-2" key={index}>
							<Link to={EntityService.makeHrefForView(tune)}>{tune.name}</Link>
						</li>
					))}
				</ul>
			)}
			<div className="mt-6">
				{loading && <LoadingBlock />}
				{!loading && tunes?.length > 0 && (
					<button className="btn-text" onClick={fetchNextPage}>
						Load More
					</button>
				)}
			</div>
		</Layout>
	);
};

export default Tunes;
