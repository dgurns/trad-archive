import { useNavigate } from "@remix-run/react";

import type { Collection } from "~/types";

import Layout from "~/components/Layout";
import RequireUser from "~/components/RequireUser";
import CreateCollectionForm from "~/components/CreateCollectionForm";

const NewCollection = () => {
	const navigate = useNavigate();

	const onCreateSuccess = (collection: Collection) => {
		navigate(`/entities/collections/${collection.slug}`);
	};

	return (
		<Layout>
			<RequireUser>
				<div className="max-w-md">
					<h1 className="mb-4">Create Collection</h1>
					<CreateCollectionForm onSuccess={onCreateSuccess} />
				</div>
			</RequireUser>
		</Layout>
	);
};

export default NewCollection;
