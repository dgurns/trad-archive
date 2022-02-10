import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";

import { Collection } from "types";
import TagService from "services/Tag";
import { API_URL } from "apolloClient";
import { COLLECTION_QUERY } from "pages/entities/collections/[slug]";

import Layout from "components/Layout";
import Breadcrumb from "components/Breadcrumb";
import TagWithRelationshipToObject from "components/TagWithRelationshipToObject";
import AddTagButton from "components/AddTagButton";
import EditTagsButton from "components/EditTagsButton";

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

const CollectionTags = ({ collection }: Props) => {
	if (!collection) {
		return <Layout>Error fetching Collection</Layout>;
	}

	const { name, slug, tags } = collection;
	const sortedTags = TagService.sort(tags);

	return (
		<Layout pageTitle={`Trad Archive - ${name} - Tags`}>
			<Breadcrumb
				items={[
					{ label: "Collections", href: "/entities/collections" },
					{ label: name, href: `/entities/collections/${slug}` },
					{ label: "Tags" },
				]}
				className="mb-6"
			/>

			{sortedTags.map((tag, index) => (
				<TagWithRelationshipToObject tag={tag} key={index} className="mb-4" />
			))}
			<div>
				<AddTagButton
					entity={collection}
					onSuccess={() => window.location.reload()}
				/>
				{sortedTags.length > 0 && (
					<>
						<span className="text-gray-500 px-2">/</span>
						<EditTagsButton
							entity={collection}
							onSuccess={() => window.location.reload()}
						/>
					</>
				)}
			</div>
		</Layout>
	);
};

export default CollectionTags;
