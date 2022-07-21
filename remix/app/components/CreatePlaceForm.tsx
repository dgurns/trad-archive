import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";

import type { Place } from "~/types";
import { EntityFragments } from "~/fragments";
import EntityService from "~/services/Entity";

const CREATE_PLACE_MUTATION = gql`
	mutation CreatePlace($input: CreatePlaceInput!) {
		createPlace(input: $input) {
			...Place
		}
	}
	${EntityFragments.place}
`;
interface CreatePlaceInput {
	slug: string;
	aliases?: string;
	description?: string;
	latitude: number;
	longitude: number;
}
interface Props {
	onSuccess?: (place: Place) => void;
}
const CreatePlaceForm = ({ onSuccess }: Props) => {
	const [createPlace, { loading, error, data }] = useMutation<
		{ createPlace: Place },
		{ input: CreatePlaceInput }
	>(CREATE_PLACE_MUTATION, { errorPolicy: "all" });

	const [name, setName] = useState("");
	const [slug, setSlug] = useState("");
	const [aliases, setAliases] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		const proposedSlug = EntityService.cleanSlug(name ?? "");
		setSlug(proposedSlug);
	}, [name]);

	const onCreatePlace = async (event) => {
		event.preventDefault();
		const input = {
			name,
			slug,
			aliases,
			latitude: parseFloat(latitude),
			longitude: parseFloat(longitude),
			description,
		};
		try {
			await createPlace({ variables: { input } });
		} catch {
			//
		}
	};

	useEffect(() => {
		if (data?.createPlace) {
			if (onSuccess) {
				return onSuccess(data.createPlace);
			}
			window.alert("Place created successfully!");
			setName("");
			setSlug("");
			setAliases("");
			setLatitude("");
			setLongitude("");
			setDescription("");
		}
	}, [data]);

	return (
		<>
			<div className="flex flex-col align-start">
				<form onSubmit={onCreatePlace}>
					<input
						placeholder="Name"
						autoFocus
						className="mb-2"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
					<input
						placeholder="URL slug (ie. galway-city)"
						className="mb-2"
						value={slug}
						onChange={(event) => setSlug(event.target.value)}
					/>
					<div className="text-sm text-gray-400 mb-2 ml-2">
						This will be used for the URL of this Place, for example{" "}
						{`https://trad-archive.com/entities/places/${
							slug || "galway-city"
						}`}
					</div>
					<input
						placeholder="Aliases"
						className="mb-2"
						value={aliases}
						onChange={(event) => setAliases(event.target.value)}
					/>
					<div className="text-sm text-gray-400 mb-2 ml-2">
						A list of comma-separated aliases for this Place. For example:{" "}
						<em>Gaillimh, The City of Tribes</em>
					</div>
					<input
						placeholder="Latitude"
						className="mb-2"
						value={latitude}
						onChange={(event) => setLatitude(event.target.value)}
					/>
					<input
						placeholder="Longitude"
						className="mb-2"
						value={longitude}
						onChange={(event) => setLongitude(event.target.value)}
					/>
					<div className="text-sm text-gray-400 mb-2 ml-2">
						To find the latitude and longitude, visit{" "}
						<a
							href={`https://www.google.com/maps/place/${name}`}
							target="_blank"
							rel="noreferrer"
						>
							{name ? `${name} on ` : ""}Google Maps (will open in new tab)
						</a>{" "}
						and right-click on the exact location you'd like. You'll see numbers
						like "53.2838294,-9.1888286". Click to copy them to your clipboard.
						The first one is latitude, and the second is longitude.
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

export default CreatePlaceForm;
