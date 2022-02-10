import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import Link from "next/link";

import { Collection } from "types";
import { API_URL } from "apolloClient";

import Layout from "components/Layout";
import { COLLECTION_QUERY } from "pages/entities/collections/[slug]";
import Breadcrumb from "components/Breadcrumb";

// Attempt to reuse instance of server side Apollo Client between runs of
// getStaticProps, to avoid creating a new DB connection on every request
let serverSideApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export async function getServerSideProps(context) {
	let collection: Collection | undefined;

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
			collection: Collection;
		}>({
			query: COLLECTION_QUERY,
			variables: { slug: context.params.slug },
		});
		collection = data.collection;
	} catch {
		//
	}
	return {
		props: {
			collection,
		},
	};
}

interface Props {
	collection: Collection;
}

const CollectionAbout = ({ collection }: Props) => {
	if (!collection) {
		return <Layout>Error fetching Collection</Layout>;
	}

	const { name, slug, itmaAtomSlug, description, aliases } = collection;

	return (
		<Layout pageTitle={`Trad Archive - ${name} - About`}>
			<Breadcrumb
				items={[
					{ label: "Collections", href: "/entities/collections" },
					{ label: name, href: `/entities/collections/${slug}` },
					{ label: "About" },
				]}
				className="mb-6"
			/>

			{itmaAtomSlug && (
				<div className="mb-4">
					<div className="italic text-gray-500">
						This was sourced from ITMA's AtoM archive
					</div>
					<a
						href={`https://itma-atom.arkivum.net/index.php/${itmaAtomSlug}`}
						target="_blank"
					>
						View on AtoM <i className="material-icons text-sm">launch</i>
					</a>
				</div>
			)}
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
			<Link href={`/entities/collections/${slug}/edit`}>Edit</Link>
		</Layout>
	);
};

export default CollectionAbout;
