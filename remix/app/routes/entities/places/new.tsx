import { useNavigate } from "@remix-run/react";

import type { Place } from "types";

import Layout from "~/components/Layout";
import RequireUser from "~/components/RequireUser";
import CreatePlaceForm from "~/components/CreatePlaceForm";

const NewPlace = () => {
	const navigate = useNavigate();

	const onCreateSuccess = (place: Place) => {
		navigate(`/entities/places/${place.slug}`);
	};

	return (
		<Layout>
			<RequireUser>
				<div className="max-w-md">
					<h1 className="mb-4">Create Place</h1>
					<CreatePlaceForm onSuccess={onCreateSuccess} />
				</div>
			</RequireUser>
		</Layout>
	);
};

export default NewPlace;
