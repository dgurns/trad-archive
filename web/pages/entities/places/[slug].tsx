import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import { EntityFragments } from "fragments";
import { Place } from "types";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";
import ViewEntityAndAudioItems from "components/ViewEntityAndAudioItems";

export const PLACE_QUERY = gql`
	query Place($slug: String!) {
		place(slug: $slug) {
			...Place
		}
	}
	${EntityFragments.place}
`;

const ViewPlaceBySlug = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data: placeData, error: placeError } = useQuery<{
		place: Place;
	}>(PLACE_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const { place } = placeData ?? {};

	let statusMessage;
	if (!placeData && !placeError) {
		statusMessage = <LoadingBlock />;
	} else if (!placeData && placeError) {
		statusMessage = `Error fetching Place with slug ${slug}`;
	}

	if (statusMessage) {
		return <Layout>{statusMessage}</Layout>;
	}

	return (
		<Layout pageTitle={`Trad Archive - ${place.name}`}>
			<ViewEntityAndAudioItems entity={place} />
		</Layout>
	);
};

export default ViewPlaceBySlug;
