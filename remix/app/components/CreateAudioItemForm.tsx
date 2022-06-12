import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";

import type { AudioItem } from "~/types";
import { EntityFragments } from "~/fragments";
import EntityService from "~/services/Entity";

const CREATE_AUDIO_ITEM_MUTATION = gql`
	mutation CreateAudioItem($input: CreateAudioItemInput!) {
		createAudioItem(input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;

interface Props {
	onSuccess?: (audioItem: AudioItem) => void;
}
interface CreateAudioItemInput {
	name: string;
	urlSource: string;
	slug: string;
	aliases?: string;
	description?: string;
}

const CreateAudioItemForm = ({ onSuccess }: Props) => {
	const [createAudioItem, { loading, error, data }] = useMutation<
		{ createAudioItem: AudioItem },
		{ input: CreateAudioItemInput }
	>(CREATE_AUDIO_ITEM_MUTATION, { errorPolicy: "all" });

	const [name, setName] = useState("");
	const [urlSource, setUrlSource] = useState("");
	const [slug, setSlug] = useState("");
	const [aliases, setAliases] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		const proposedSlug = EntityService.cleanSlug(name ?? "");
		setSlug(proposedSlug);
	}, [name]);

	const onCreateAudioItem = (event) => {
		event.preventDefault();
		createAudioItem({
			variables: { input: { name, urlSource, slug, aliases, description } },
		});
	};

	useEffect(() => {
		if (data?.createAudioItem) {
			if (onSuccess) {
				return onSuccess(data.createAudioItem);
			}
			window.alert("Audio Item created successfully!");
			setName("");
			setUrlSource("");
			setSlug("");
			setAliases("");
			setDescription("");
		}
	}, [data]);

	return (
		<>
			<div className="flex flex-col align-start">
				<form onSubmit={onCreateAudioItem}>
					<input
						placeholder="Name"
						autoFocus
						className="mb-2"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
					<input
						placeholder="URL of Source File (ie. https://www.example.com/file.mp3)"
						className="mb-2"
						value={urlSource}
						onChange={(event) => setUrlSource(event.target.value)}
					/>
					<input
						placeholder="URL slug (ie. finbarr-dwyer-live-at-dolans)"
						className="mb-2"
						value={slug}
						onChange={(event) => setSlug(event.target.value)}
					/>
					<div className="text-sm text-gray-400 mb-2 ml-2">
						This will be used for the URL of this AudioItem, for example{" "}
						{`https://trad-archive.com/entities/audio-items/${
							slug || "finbarr-dwyer-live-at-dolans"
						}`}
					</div>
					<input
						placeholder="Aliases"
						className="mb-2"
						value={aliases}
						onChange={(event) => setAliases(event.target.value)}
					/>
					<div className="text-sm text-gray-400 mb-2 ml-2">
						A list of comma-separated aliases for this AudioItem. For example:{" "}
						<em>Finbarr and Brian, Finbarr '08 at Dolan's</em>
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

			{error && <div className="text-red-600 mb-4">{error.message}</div>}
		</>
	);
};

export default CreateAudioItemForm;
