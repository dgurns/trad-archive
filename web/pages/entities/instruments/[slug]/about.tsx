import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";

import { Instrument } from "types";

import Layout from "components/Layout";
import { INSTRUMENT_QUERY } from "pages/entities/instruments/[slug]";
import Breadcrumb from "components/Breadcrumb";
import LoadingBlock from "components/LoadingBlock";

const InstrumentAbout = () => {
	const router = useRouter();
	const { slug } = router.query;

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
							<span className="text-gray-500 whitespace-pre">
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
					<Link href={`/entities/instruments/${slug}/edit`}>Edit</Link>
				</>
			)}
		</Layout>
	);
};

export default InstrumentAbout;
