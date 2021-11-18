import Link from "next/link";

import useInstruments from "hooks/useInstruments";
import EntityService from "services/Entity";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";

const Instruments = () => {
	const [instruments, { loading, error }, fetchNextPage] = useInstruments({
		resultsPerPage: 50,
	});

	return (
		<Layout pageTitle={`Trad Archive - Instruments`}>
			<h1 className="mb-6">Instruments</h1>
			{!loading && error && (
				<div className="text-red-600">Error fetching Instruments</div>
			)}
			{!loading && instruments?.length === 0 && (
				<div className="text-gray-500">No Instruments found</div>
			)}
			{instruments?.length > 0 && (
				<ul>
					{instruments.map((instrument, index) => (
						<li className="mb-2" key={index}>
							<Link href={EntityService.makeHrefForView(instrument)}>
								{instrument.name}
							</Link>
						</li>
					))}
				</ul>
			)}
			<div className="mt-6">
				{loading && <LoadingBlock />}
				{!loading && instruments?.length > 0 && (
					<button className="btn-text" onClick={fetchNextPage}>
						Load More
					</button>
				)}
			</div>
		</Layout>
	);
};

export default Instruments;
