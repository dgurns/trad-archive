import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";

import { Place } from "types";
import TagService from "services/Tag";
import { API_URL } from "apolloClient";
import { PLACE_QUERY } from "pages/entities/places/[slug]";

import Layout from "components/Layout";
import Breadcrumb from "components/Breadcrumb";
import TagWithRelationshipToObject from "components/TagWithRelationshipToObject";
import AddTagButton from "components/AddTagButton";
import EditTagsButton from "components/EditTagsButton";

// Attempt to reuse instance of server side Apollo Client between runs of
// getStaticProps, to avoid creating a new DB connection on every request
let serverSideApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export async function getServerSideProps(context) {
	let place: Place | undefined;

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
			place: Place;
		}>({
			query: PLACE_QUERY,
			variables: { slug: context.params.slug },
		});
		place = data.place;
	} catch {
		//
	}
	return {
		props: {
			place,
		},
	};
}

interface Props {
	place: Place;
}

const PlaceTags = ({ place }: Props) => {
	if (!place) {
		return <Layout>Error fetching Place</Layout>;
	}

	const { name, slug, tags } = place;
	const sortedTags = TagService.sort(tags);

	return (
		<Layout pageTitle={`Trad Archive - ${name} - Tags`}>
			<Breadcrumb
				items={[
					{ label: "Places", href: "/entities/places" },
					{ label: name, href: `/entities/places/${slug}` },
					{ label: "Tags" },
				]}
				className="mb-6"
			/>

			{sortedTags.map((tag, index) => (
				<TagWithRelationshipToObject tag={tag} key={index} className="mb-4" />
			))}
			<div>
				<AddTagButton
					entity={place}
					onSuccess={() => window.location.reload()}
				/>
				{sortedTags.length > 0 && (
					<>
						<span className="text-gray-500 px-2">/</span>
						<EditTagsButton
							entity={place}
							onSuccess={() => window.location.reload()}
						/>
					</>
				)}
			</div>
		</Layout>
	);
};

export default PlaceTags;
