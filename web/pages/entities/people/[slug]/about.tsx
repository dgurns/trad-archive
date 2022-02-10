import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import Link from "next/link";

import { Person } from "types";
import { API_URL } from "apolloClient";

import Layout from "components/Layout";
import { PERSON_QUERY } from "pages/entities/people/[slug]";
import Breadcrumb from "components/Breadcrumb";

// Attempt to reuse instance of server side Apollo Client between runs of
// getStaticProps, to avoid creating a new DB connection on every request
let serverSideApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export async function getServerSideProps(context) {
	let person: Person | undefined;

	try {
		if (!serverSideApolloClient) {
			serverSideApolloClient = new ApolloClient({
				uri: API_URL,
				credentials: "include",
				cache: new InMemoryCache(),
				defaultOptions: {
					query: {
						// Force server-side queries to get the latest data each time
						fetchPolicy: "no-cache",
					},
				},
			});
		}

		const { data } = await serverSideApolloClient.query<{
			person: Person;
		}>({
			query: PERSON_QUERY,
			variables: { slug: context.params.slug },
		});
		person = data.person;
	} catch {
		//
	}
	return {
		props: {
			person,
		},
	};
}

interface Props {
	person: Person;
}

const PersonAbout = ({ person }: Props) => {
	if (!person) {
		return <Layout>Error fetching Person</Layout>;
	}

	const { name, slug, description, aliases } = person;

	return (
		<Layout pageTitle={`Trad Archive - ${name} - About`}>
			<Breadcrumb
				items={[
					{ label: "People", href: "/entities/people" },
					{ label: name, href: `/entities/people/${slug}` },
					{ label: "About" },
				]}
				className="mb-6"
			/>

			{description && (
				<div className="mb-4">
					Description:
					<br />
					<span className="text-gray-500">{description}</span>
				</div>
			)}
			{aliases && (
				<div className="mb-4">
					Aliases:
					<br />
					<span className="text-gray-500">{aliases}</span>
				</div>
			)}
			<Link href={`/entities/people/${slug}/edit`}>Edit</Link>
		</Layout>
	);
};

export default PersonAbout;
