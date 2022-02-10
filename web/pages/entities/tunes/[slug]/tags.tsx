import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";

import { Tune } from "types";
import TagService from "services/Tag";
import { API_URL } from "apolloClient";
import { TUNE_QUERY } from "pages/entities/tunes/[slug]";

import Layout from "components/Layout";
import Breadcrumb from "components/Breadcrumb";
import TagWithRelationshipToObject from "components/TagWithRelationshipToObject";
import AddTagButton from "components/AddTagButton";
import EditTagsButton from "components/EditTagsButton";

// Attempt to reuse instance of server side Apollo Client between runs of
// getStaticProps, to avoid creating a new DB connection on every request
let serverSideApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export async function getServerSideProps(context) {
	let tune: Tune | undefined;

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
			tune: Tune;
		}>({
			query: TUNE_QUERY,
			variables: { slug: context.params.slug },
		});
		tune = data.tune;
	} catch {
		//
	}
	return {
		props: {
			tune,
		},
	};
}

interface Props {
	tune: Tune;
}

const TuneTags = ({ tune }: Props) => {
	if (!tune) {
		return <Layout>Error fetching Tune</Layout>;
	}

	const { name, slug, tags } = tune;
	const sortedTags = TagService.sort(tags);

	return (
		<Layout pageTitle={`Trad Archive - ${name} - Tags`}>
			<Breadcrumb
				items={[
					{ label: "Tunes", href: "/entities/tunes" },
					{ label: name, href: `/entities/tunes/${slug}` },
					{ label: "Tags" },
				]}
				className="mb-6"
			/>

			{sortedTags.map((tag, index) => (
				<TagWithRelationshipToObject tag={tag} key={index} className="mb-4" />
			))}
			<div>
				<AddTagButton
					entity={tune}
					onSuccess={() => window.location.reload()}
				/>
				{sortedTags.length > 0 && (
					<>
						<span className="text-gray-500 px-2">/</span>
						<EditTagsButton
							entity={tune}
							onSuccess={() => window.location.reload()}
						/>
					</>
				)}
			</div>
		</Layout>
	);
};

export default TuneTags;
