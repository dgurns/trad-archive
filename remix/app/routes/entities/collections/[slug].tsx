import { useNavigate } from "@remix-run/react";
import { useQuery, gql } from "@apollo/client";

import { EntityFragments } from "~/fragments";
import type { Collection } from "~/types";

import Layout from "~/components/Layout";
import LoadingBlock from "~/components/LoadingBlock";
import ViewEntityAndAudioItems from "~/components/ViewEntityAndAudioItems";

export const COLLECTION_QUERY = gql`
	query Collection($slug: String!) {
		collection(slug: $slug) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;

const ViewCollectionBySlug = () => {
	const navigate = useNavigate();
	const { slug } = navigate.query;

	const { data: collectionData, error: collectionError } = useQuery<{
		collection: Collection;
	}>(COLLECTION_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const { collection } = collectionData ?? {};

	let statusMessage;
	if (!collectionData && !collectionError) {
		statusMessage = <LoadingBlock />;
	} else if (!collectionData && collectionError) {
		statusMessage = `Error fetching Collection with slug ${slug}`;
	}

	if (statusMessage) {
		return <Layout>{statusMessage}</Layout>;
	}

	return (
		<Layout pageTitle={`Trad Archive - ${collection.name}`}>
			<ViewEntityAndAudioItems entity={collection} />
		</Layout>
	);
};

export default ViewCollectionBySlug;
