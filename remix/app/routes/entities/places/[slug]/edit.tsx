import { useNavigate } from "@remix-run/react";
import { useQuery, gql } from "@apollo/client";

import type { Place } from "types";
import { EntityFragments } from "fragments";

import Layout from "~/components/Layout";
import LoadingBlock from "~/components/LoadingBlock";
import RequireUser from "~/components/RequireUser";
import EditPlaceForm from "~/components/EditPlaceForm";

const PLACE_QUERY = gql`
	query Place($slug: String!) {
		place(slug: $slug) {
			...Place
		}
	}
	${EntityFragments.place}
`;

const EditPlace = () => {
	const navigate = useNavigate();
	const { slug } = navigate.query;

	const { data, error } = useQuery(PLACE_QUERY, {
		variables: { slug },
		skip: !slug,
	});

	const onEditSuccess = (place: Place) => {
		navigate(`/entities/places/${place.slug}`);
	};

	let statusMessage;
	if (!data && !error) {
		statusMessage = <LoadingBlock />;
	} else if (!data && error) {
		statusMessage = `Error fetching Place with slug ${slug}`;
	}

	if (statusMessage) {
		return <Layout>{statusMessage}</Layout>;
	}

	const { place } = data;

	return (
		<Layout>
			<RequireUser>
				<div className="max-w-md">
					<h1 className="mb-4">Edit Place: {place.name}</h1>
					<EditPlaceForm place={place} onSuccess={onEditSuccess} />
				</div>
			</RequireUser>
		</Layout>
	);
};

export default EditPlace;
