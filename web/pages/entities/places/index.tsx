import Link from "next/link";

import usePlaces from "hooks/usePlaces";
import EntityService from "services/Entity";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";

const Places = () => {
	const [places, { loading, error }, fetchNextPage] = usePlaces({
		resultsPerPage: 50,
	});

	return (
		<Layout pageTitle={`Trad Archive - Places`}>
			<h1 className="mb-6">Places</h1>
			{!loading && error && (
				<div className="text-red-600">Error fetching Places</div>
			)}
			{!loading && places?.length === 0 && (
				<div className="text-gray-500">No Places found</div>
			)}
			{places?.length > 0 && (
				<ul>
					{places.map((place, index) => (
						<li className="mb-2" key={index}>
							<Link href={EntityService.makeHrefForView(place)}>
								{place.name}
							</Link>
						</li>
					))}
				</ul>
			)}
			<div className="mt-6">
				{loading && <LoadingBlock />}
				{!loading && places?.length > 0 && (
					<button className="btn-text" onClick={fetchNextPage}>
						Load More
					</button>
				)}
			</div>
		</Layout>
	);
};

export default Places;
