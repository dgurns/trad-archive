import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";

import { Person } from "types";
import TagService from "services/Tag";
import { API_URL } from "apolloClient";
import { PERSON_QUERY } from "pages/entities/people/[slug]";

import Layout from "components/Layout";
import Breadcrumb from "components/Breadcrumb";
import TagWithRelationshipToObject from "components/TagWithRelationshipToObject";
import AddTagButton from "components/AddTagButton";
import EditTagsButton from "components/EditTagsButton";

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

const PersonTags = ({ person }: Props) => {
	if (!person) {
		return <Layout>Error fetching Person</Layout>;
	}

	const { name, slug, tags } = person;
	const sortedTags = TagService.sort(tags);

	return (
		<Layout pageTitle={`Trad Archive - ${name} - Tags`}>
			<Breadcrumb
				items={[
					{ label: "People", href: "/entities/people" },
					{ label: name, href: `/entities/people/${slug}` },
					{ label: "Tags" },
				]}
				className="mb-6"
			/>

			{sortedTags.map((tag, index) => (
				<TagWithRelationshipToObject tag={tag} key={index} className="mb-4" />
			))}
			<div>
				<AddTagButton
					entity={person}
					onSuccess={() => window.location.reload()}
				/>
				{sortedTags.length > 0 && (
					<>
						<span className="text-gray-500 px-2">/</span>
						<EditTagsButton
							entity={person}
							onSuccess={() => window.location.reload()}
						/>
					</>
				)}
			</div>
		</Layout>
	);
};

export default PersonTags;
