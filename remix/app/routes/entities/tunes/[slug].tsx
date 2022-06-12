import { useNavigate } from "@remix-run/react";
import { useQuery, gql } from "@apollo/client";

import { EntityFragments } from "~/fragments";
import type { Tune } from "~/types";

import Layout from "~/components/Layout";
import LoadingBlock from "~/components/LoadingBlock";
import ViewEntityAndAudioItems from "~/components/ViewEntityAndAudioItems";

export const TUNE_QUERY = gql`
	query Tune($slug: String!) {
		tune(slug: $slug) {
			...Tune
		}
	}
	${EntityFragments.tune}
`;

const ViewTuneBySlug = () => {
	const navigate = useNavigate();
	const { slug } = navigate.query;

	const { data: tuneData, error: tuneError } = useQuery<{
		tune: Tune;
	}>(TUNE_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const { tune } = tuneData ?? {};

	let statusMessage;
	if (!tuneData && !tuneError) {
		statusMessage = <LoadingBlock />;
	} else if (!tuneData && tuneError) {
		statusMessage = `Error fetching Tune with slug ${slug}`;
	}

	if (statusMessage) {
		return <Layout>{statusMessage}</Layout>;
	}

	return (
		<Layout pageTitle={`Trad Archive - ${tune.name}`}>
			<ViewEntityAndAudioItems entity={tune} />
		</Layout>
	);
};

export default ViewTuneBySlug;
