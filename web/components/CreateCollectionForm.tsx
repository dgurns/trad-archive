import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";

import { Collection } from "types";
import { EntityFragments } from "fragments";
import EntityService from "services/Entity";

const CREATE_COLLECTION_MUTATION = gql`
	mutation CreateCollection($input: CreateCollectionInput!) {
		createCollection(input: $input) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;

interface CreateCollectionInput {
	slug: string;
	aliases?: string;
	description?: string;
}
interface Props {
	onSuccess?: (collection: Collection) => void;
}

const CreateCollectionForm = ({ onSuccess }: Props) => {
	const [createCollection, { loading, error, data }] = useMutation<
		{ createCollection: Collection },
		{ input: CreateCollectionInput }
	>(CREATE_COLLECTION_MUTATION, { errorPolicy: "all" });

	const [name, setName] = useState("");
	const [slug, setSlug] = useState("");
	const [aliases, setAliases] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		const proposedSlug = EntityService.cleanSlug(name ?? "");
		setSlug(proposedSlug);
	}, [name]);

	const onCreateCollection = async (event) => {
		event.preventDefault();
		const input = {
			name,
			slug,
			aliases,
			description,
		};
		try {
			await createCollection({ variables: { input } });
		} catch {
			//
		}
	};

	useEffect(() => {
		if (data?.createCollection) {
			if (onSuccess) {
				return onSuccess(data.createCollection);
			}
			window.alert("Collection created successfully!");
			setName("");
			setSlug("");
			setAliases("");
			setDescription("");
		}
	}, [data]);

	return (
		<>
			<div className="flex flex-col align-start">
				<div className="text-gray-500 mb-8">
					A Collection is a logical grouping of other entities. For example,
					"O'Neill's Music of Ireland" would be a Collection of Tunes. Or the
					"Alen MacWeeney Collection" would be a Collection of AudioItems.
				</div>

				<form onSubmit={onCreateCollection}>
					<input
						placeholder="Name"
						autoFocus
						className="mb-2"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
					<input
						placeholder="URL slug (ie. alan-macweeney-collection)"
						className="mb-2"
						value={slug}
						onChange={(event) => setSlug(event.target.value)}
					/>
					<div className="text-sm text-gray-400 mb-2 ml-2">
						This will be used for the URL of this Collection, for example{" "}
						{`https://trad-archive.com/entities/collections/${
							slug || "alan-macweeney-collection"
						}`}
					</div>
					<input
						placeholder="Aliases"
						className="mb-2"
						value={aliases}
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
						rows={5}
						onChange={(event) => setDescription(event.target.value)}
					/>
					<input
						type="submit"
						className="btn mb-4 w-auto"
						disabled={loading}
						value="Create"
					/>
				</form>
			</div>

			{error && <div className="text-red-600">{error.message}</div>}
		</>
	);
};

export default CreateCollectionForm;
