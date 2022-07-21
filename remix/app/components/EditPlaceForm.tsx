import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "@remix-run/react";
import type { Place } from "~/types";
import { EntityFragments } from "~/fragments";

const UPDATE_PLACE_MUTATION = gql`
	mutation UpdatePlace($slug: String!, $input: UpdatePlaceInput!) {
		updatePlace(slug: $slug, input: $input) {
			...Place
		}
	}
	${EntityFragments.place}
`;
interface UpdatePlaceVariables {
	slug: string;
	input: {
		aliases?: string;
		description?: string;
		latitude?: number;
		longitude?: number;
	};
}
interface Props {
	place: Place;
	onSuccess?: (place: Place) => void;
}
const EditPlaceForm = ({ place, onSuccess }: Props) => {
	const navigate = useNavigate();

	const [updatePlace, { loading, error, data }] = useMutation<
		{ updatePlace: Place },
		UpdatePlaceVariables
	>(UPDATE_PLACE_MUTATION, {
		errorPolicy: "all",
	});

	const [name, setName] = useState(place.name);
	const [aliases, setAliases] = useState(place.aliases);
	const [latitude, setLatitude] = useState(place.latitude.toString());
	const [longitude, setLongitude] = useState(place.longitude.toString());
	const [description, setDescription] = useState(place.description);

	const onUpdatePlace = (event) => {
		event.preventDefault();
		const input = {
			name,
			aliases,
			latitude: parseFloat(latitude),
			longitude: parseFloat(longitude),
			description,
		};
		updatePlace({ variables: { slug: place.slug, input } });
	};

	useEffect(() => {
		if (data?.updatePlace) {
			if (onSuccess) {
				return onSuccess(data.updatePlace);
			}
			window.alert("Place updated successfully!");
		}
	}, [data, navigate]);

	return (
		<>
			<div className="flex flex-col align-start">
				<form onSubmit={onUpdatePlace}>
					<input
						placeholder="Name"
						className="mb-2"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
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
						To view the current latitude and longitude coordinates, visit{" "}
						<a
							href={`https://www.google.com/maps/@?api=1&map_action=map&zoom=12&center=${latitude},${longitude}`}
							target="_blank"
							rel="noreferrer"
						>
							{latitude},{longitude} on Google Maps (will open in new tab)
						</a>
						. To pick new coordinates, right-click on the exact location you'd
						like, and you'll see numbers like "53.2838294,-9.1888286". Click to
						copy them to your clipboard. The first one is latitude, and the
						second is longitude.
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

export default EditPlaceForm;
