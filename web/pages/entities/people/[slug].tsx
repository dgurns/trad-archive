import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import { EntityFragments } from "fragments";
import { Person } from "types";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";
import ViewEntityAndAudioItems from "components/ViewEntityAndAudioItems";

export const PERSON_QUERY = gql`
	query Person($slug: String!) {
		person(slug: $slug) {
			...Person
		}
	}
	${EntityFragments.person}
`;

const ViewPersonBySlug = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data: personData, error: personError } = useQuery<{
		person: Person;
	}>(PERSON_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const { person } = personData ?? {};

	let statusMessage;
	if (!personData && !personError) {
		statusMessage = <LoadingBlock />;
	} else if (!personData && personError) {
		statusMessage = `Error fetching Person with slug ${slug}`;
	}

	if (statusMessage) {
		return <Layout>{statusMessage}</Layout>;
	}

	return (
		<Layout pageTitle={`Trad Archive - ${person.name}`}>
			<ViewEntityAndAudioItems entity={person} />
		</Layout>
	);
};

export default ViewPersonBySlug;
