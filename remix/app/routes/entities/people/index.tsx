import { Link } from "@remix-run/react";

import usePeople from "~/hooks/usePeople";
import EntityService from "~/services/Entity";

import Layout from "~/components/Layout";
import LoadingBlock from "~/components/LoadingBlock";

const People = () => {
	const [people, { loading, error }, fetchNextPage] = usePeople({
		resultsPerPage: 50,
	});

	return (
		<Layout pageTitle={`Trad Archive - People`}>
			<h1 className="mb-6">People</h1>
			{!loading && error && (
				<div className="text-red-600">Error fetching People</div>
			)}
			{!loading && people?.length === 0 && (
				<div className="text-gray-500">No People found</div>
			)}
			{people?.length > 0 && (
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
			<div className="mt-6">
				{loading && <LoadingBlock />}
				{!loading && people?.length > 0 && (
					<button className="btn-text" onClick={fetchNextPage}>
						Load More
					</button>
				)}
			</div>
		</Layout>
	);
};

export default People;
