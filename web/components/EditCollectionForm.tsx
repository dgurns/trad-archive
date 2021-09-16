import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Collection } from "types";
import { EntityFragments } from "fragments";

const UPDATE_COLLECTION_MUTATION = gql`
	mutation UpdateCollection($slug: String!, $input: UpdateCollectionInput!) {
		updateCollection(slug: $slug, input: $input) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
interface UpdateCollectionVariables {
	slug: string;
	input: {
		aliases?: string;
		description?: string;
	};
}
interface Props {
	collection: Collection;
	onSuccess?: (collection: Collection) => void;
}
const EditCollectionForm = ({ collection, onSuccess }: Props) => {
	const router = useRouter();

	const [updateCollection, { loading, error, data }] = useMutation<
		{ updateCollection: Collection },
		UpdateCollectionVariables
	>(UPDATE_COLLECTION_MUTATION, {
		errorPolicy: "all",
	});

	const [name, setName] = useState(collection.name);
	const [aliases, setAliases] = useState(collection.aliases);
	const [description, setDescription] = useState(collection.description);

	const onUpdateCollection = (event) => {
		event.preventDefault();
		const input = {
			name,
			aliases,
			description,
		};
		updateCollection({ variables: { slug: collection.slug, input } });
	};

	useEffect(() => {
		if (data?.updateCollection) {
			if (onSuccess) {
				return onSuccess(data.updateCollection);
			}
			window.alert("Collection updated successfully!");
		}
	}, [data, router]);

	return (
		<>
			<div className="flex flex-col align-start">
				<form onSubmit={onUpdateCollection}>
					<input
						placeholder="Name"
						className="mb-2"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
					<input
						placeholder="Aliases"
						className="mb-2"
						value={aliases ?? ""}
						onChange={(event) => setAliases(event.target.value)}
					/>
					<div className="text-sm text-gray-400 mb-2 ml-2">
						A list of comma-separated aliases for this Collection. For example:{" "}
						<em>O'Neill's, 1000 Fiddle Tunes</em>
					</div>
					<textarea
						placeholder="Description"
						className="mb-2"
						value={description}
						rows={10}
						onChange={(event) => setDescription(event.target.value)}
					/>
					<input
						type="submit"
						className="btn mb-4 w-auto"
						disabled={loading}
						value="Save"
					/>
				</form>
			</div>

			{error && <div className="text-red-600">{error.message}</div>}
		</>
	);
};

export default EditCollectionForm;
