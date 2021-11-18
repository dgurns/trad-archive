import Link from "next/link";

import useCollections from "hooks/useCollections";
import EntityService from "services/Entity";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";

const Collections = () => {
	const [collections, { loading, error }, fetchNextPage] = useCollections({
		resultsPerPage: 50,
	});

	return (
		<Layout pageTitle={`Trad Archive - Collections`}>
			<h1 className="mb-6">Collections</h1>
			{!loading && error && (
				<div className="text-red-600">Error fetching Collections</div>
			)}
			{!loading && collections?.length === 0 && (
				<div className="text-gray-500">No Collections found</div>
			)}
			{collections?.length > 0 && (
				<ul>
					{collections.map((collection, index) => (
						<li className="mb-2" key={index}>
							<Link href={EntityService.makeHrefForView(collection)}>
								{collection.name}
							</Link>
						</li>
					))}
				</ul>
			)}
			<div className="mt-6">
				{loading && <LoadingBlock />}
				{!loading && collections?.length > 0 && (
					<button className="btn-text" onClick={fetchNextPage}>
						Load More
					</button>
				)}
			</div>
		</Layout>
	);
};

export default Collections;
