import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import Link from "next/link";

import { Place } from "types";
import { API_URL } from "apolloClient";

import Layout from "components/Layout";
import { PLACE_QUERY } from "pages/entities/places/[slug]";
import Breadcrumb from "components/Breadcrumb";

// Attempt to reuse instance of server side Apollo Client between runs of
// getStaticProps, to avoid creating a new DB connection on every request
let serverSideApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export async function getServerSideProps(context) {
	let place: Place | undefined;

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
			place: Place;
		}>({
			query: PLACE_QUERY,
			variables: { slug: context.params.slug },
		});
		place = data.place;
	} catch {
		//
	}
	return {
		props: {
			place,
		},
	};
}

interface Props {
	place: Place;
}

const PlaceAbout = ({ place }: Props) => {
	if (!place) {
		return <Layout>Error fetching Place</Layout>;
	}

	const { name, slug, description, aliases } = place;

	return (
		<Layout pageTitle={`Trad Archive - ${name} - About`}>
			<Breadcrumb
				items={[
					{ label: "Places", href: "/entities/places" },
					{ label: name, href: `/entities/places/${slug}` },
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
			<Link href={`/entities/places/${slug}/edit`}>Edit</Link>
		</Layout>
	);
};

export default PlaceAbout;
