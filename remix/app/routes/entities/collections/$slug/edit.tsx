import { useNavigate } from "@remix-run/react";
import { useQuery, gql } from "@apollo/client";

import type { Collection } from "~/types";
import { EntityFragments } from "~/fragments";

import Layout from "~/components/Layout";
import LoadingBlock from "~/components/LoadingBlock";
import RequireUser from "~/components/RequireUser";
import EditCollectionForm from "~/components/EditCollectionForm";

const COLLECTION_QUERY = gql`
	query Collection($slug: String!) {
		collection(slug: $slug) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;

const CollectionEdit = () => {
	const navigate = useNavigate();
	const { slug } = navigate.query;

	const { data, error } = useQuery(COLLECTION_QUERY, {
		variables: { slug },
		skip: !slug,
	});

	const onEditSuccess = (collection: Collection) => {
		navigate(`/entities/collections/${collection.slug}/about`);
	};

	let statusMessage;
	if (!data && !error) {
		statusMessage = <LoadingBlock />;
	} else if (!data && error) {
		statusMessage = `Error fetching Collection with slug ${slug}`;
	}

	if (statusMessage) {
		return <Layout>{statusMessage}</Layout>;
	}

	const { collection } = data;

	return (
		<Layout>
			<RequireUser>
				<div className="max-w-md">
					<h1 className="mb-4">Edit Collection: {collection.name}</h1>
					<EditCollectionForm
						collection={collection}
						onSuccess={onEditSuccess}
					/>
				</div>
			</RequireUser>
		</Layout>
	);
};

export default CollectionEdit;
