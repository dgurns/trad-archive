import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import Link from "next/link";

import { Tune } from "types";
import { API_URL } from "apolloClient";

import Layout from "components/Layout";
import { TUNE_QUERY } from "pages/entities/tunes/[slug]";
import Breadcrumb from "components/Breadcrumb";

// Attempt to reuse instance of server side Apollo Client between runs of
// getStaticProps, to avoid creating a new DB connection on every request
let serverSideApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export async function getServerSideProps(context) {
	let tune: Tune | undefined;

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
			tune: Tune;
		}>({
			query: TUNE_QUERY,
			variables: { slug: context.params.slug },
		});
		tune = data.tune;
	} catch {
		//
	}
	return {
		props: {
			tune,
		},
	};
}

interface Props {
	tune: Tune;
}

const TuneAbout = ({ tune }: Props) => {
	if (!tune) {
		return <Layout>Error fetching Tune</Layout>;
	}

	const { name, slug, aliases, theSessionTuneId, type, mode, meter, abc } =
		tune;

	return (
		<Layout pageTitle={`Trad Archive - ${name} - About`}>
			<Breadcrumb
				items={[
					{ label: "Tunes", href: "/entities/tunes" },
					{ label: name, href: `/entities/tunes/${slug}` },
					{ label: "About" },
				]}
				className="mb-6"
			/>

			<>
				{theSessionTuneId && (
					<div className="mb-4">
						<div className="italic text-gray-500">
							We source all of our Tune data from a wonderful community project
							called The Session.
						</div>
						<a
							href={`https://thesession.org/tunes/${theSessionTuneId}`}
							target="_blank"
						>
							View or Edit This Tune on The Session{" "}
							<i className="material-icons text-sm">launch</i>
						</a>
					</div>
				)}
				{aliases && (
					<div className="mb-4">
						Aliases:
						<br />
						<span className="text-gray-500">{aliases}</span>
					</div>
				)}
				{type && (
					<div className="mb-4">
						Type:
						<br />
						<span className="text-gray-500">{type}</span>
					</div>
				)}
				{meter && (
					<div className="mb-4">
						Meter:
						<br />
						<span className="text-gray-500">{meter}</span>
					</div>
				)}
				{mode && (
					<div className="mb-4">
						Mode:
						<br />
						<span className="text-gray-500">{mode}</span>
					</div>
				)}
				{abc && (
					<div className="mb-4">
						ABC:
						<br />
						<span className="text-gray-500">{abc}</span>
					</div>
				)}
			</>
			<Link href={`/entities/tunes/${slug}/edit`}>Edit</Link>
		</Layout>
	);
};

export default TuneAbout;
