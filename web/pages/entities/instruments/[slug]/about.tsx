import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import Link from "next/link";

import { Instrument } from "types";
import { API_URL } from "apolloClient";

import Layout from "components/Layout";
import { INSTRUMENT_QUERY } from "pages/entities/instruments/[slug]";
import Breadcrumb from "components/Breadcrumb";

// Attempt to reuse instance of server side Apollo Client between runs of
// getStaticProps, to avoid creating a new DB connection on every request
let serverSideApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export async function getServerSideProps(context) {
	let instrument: Instrument | undefined;

	try {
		if (!serverSideApolloClient) {
			serverSideApolloClient = new ApolloClient({
				uri: API_URL,
				credentials: "include",
				cache: new InMemoryCache(),
				defaultOptions: {
					query: {
						// Force server-side queries to get the latest data each time
						fetchPolicy: "no-cache",
					},
				},
			});
		}

		const { data } = await serverSideApolloClient.query<{
			instrument: Instrument;
		}>({
			query: INSTRUMENT_QUERY,
			variables: { slug: context.params.slug },
		});
		instrument = data.instrument;
	} catch {
		//
	}
	return {
		props: {
			instrument,
		},
	};
}

interface Props {
	instrument: Instrument;
}

const InstrumentAbout = ({ instrument }: Props) => {
	if (!instrument) {
		return <Layout>Error fetching Instrument</Layout>;
	}

	const { name, slug, description, aliases } = instrument;

	return (
		<Layout pageTitle={`Trad Archive - ${name} - About`}>
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
					<span className="text-gray-500">{description}</span>
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
		</Layout>
	);
};

export default InstrumentAbout;
