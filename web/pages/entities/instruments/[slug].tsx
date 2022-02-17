import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import { EntityFragments } from "fragments";
import { Instrument } from "types";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";
import ViewEntityAndAudioItems from "components/ViewEntityAndAudioItems";

export const INSTRUMENT_QUERY = gql`
	query Instrument($slug: String!) {
		instrument(slug: $slug) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;

const ViewInstrumentBySlug = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data: instrumentData, error: instrumentError } = useQuery<{
		instrument: Instrument;
	}>(INSTRUMENT_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const { instrument } = instrumentData ?? {};

	let statusMessage;
	if (!instrumentData && !instrumentError) {
		statusMessage = <LoadingBlock />;
	} else if (!instrumentData && instrumentError) {
		statusMessage = `Error fetching Instrument with slug ${slug}`;
	}

	if (statusMessage) {
		return <Layout>{statusMessage}</Layout>;
	}

	return (
		<Layout pageTitle={`Trad Archive - ${instrument.name}`}>
			<ViewEntityAndAudioItems entity={instrument} />
		</Layout>
	);
};

export default ViewInstrumentBySlug;
