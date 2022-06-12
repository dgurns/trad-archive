import { useQuery } from "@apollo/client";
import { Link } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";

import type { Instrument } from "~/types";

import Layout from "~/components/Layout";
import { INSTRUMENT_QUERY } from "~/routes/entities/instruments/[slug]";
import Breadcrumb from "~/components/Breadcrumb";
import LoadingBlock from "~/components/LoadingBlock";

const InstrumentAbout = () => {
	const navigate = useNavigate();
	const { slug } = navigate.query;

	const { data, error } = useQuery<{
		instrument: Instrument;
	}>(INSTRUMENT_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const isLoading = !data && !error;
	const { name, description, aliases } = data?.instrument ?? {};

	return (
		<Layout pageTitle={`Trad Archive - ${name} - About`}>
			{isLoading && <LoadingBlock />}
			{error && <div className="text-red-500">{error.message}</div>}
			{data && (
				<>
					<Breadcrumb
						items={[
							{ label: "Instruments", href: "/entities/instruments" },
							{ label: name, href: `/entities/instruments/${slug}` },
							{ label: "About" },
						]}
						className="mb-6"
					/>
					{description && (
						<div className="mb-4">
							Description:
							<br />
							<span className="text-gray-500 whitespace-pre-wrap">
								{description}
							</span>
						</div>
					)}
					{aliases && (
						<div className="mb-4">
							Aliases:
							<br />
							<span className="text-gray-500">{aliases}</span>
						</div>
					)}
					<Link to={`/entities/instruments/${slug}/edit`}>Edit</Link>
				</>
			)}
		</Layout>
	);
};

export default InstrumentAbout;
