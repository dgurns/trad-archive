import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";

import { Instrument } from "types";
import TagService from "services/Tag";
import { API_URL } from "apolloClient";
import { INSTRUMENT_QUERY } from "pages/entities/instruments/[slug]";

import Layout from "components/Layout";
import Breadcrumb from "components/Breadcrumb";
import TagWithRelationshipToObject from "components/TagWithRelationshipToObject";
import AddTagButton from "components/AddTagButton";
import EditTagsButton from "components/EditTagsButton";

// Attempt to reuse instance of server side Apollo Client between runs of
// getStaticProps, to avoid creating a new DB connection on every request
let serverSideApolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export async function getServerSideProps(context) {
	let instrument: Instrument | undefined;

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
			instrument: Instrument;
		}>({
			query: INSTRUMENT_QUERY,
			variables: { slug: context.params.slug },
		});
		instrument = data.instrument;
	} catch {
		//
	}
	return {
		props: {
			instrument,
		},
	};
}

interface Props {
	instrument: Instrument;
}

const InstrumentTags = ({ instrument }: Props) => {
	if (!instrument) {
		return <Layout>Error fetching Instrument</Layout>;
	}

	const { name, slug, tags } = instrument;
	const sortedTags = TagService.sort(tags);

	return (
		<Layout pageTitle={`Trad Archive - ${name} - Tags`}>
			<Breadcrumb
				items={[
					{ label: "Instruments", href: "/entities/instruments" },
					{ label: name, href: `/entities/instruments/${slug}` },
					{ label: "Tags" },
				]}
				className="mb-6"
			/>

			{sortedTags.map((tag, index) => (
				<TagWithRelationshipToObject tag={tag} key={index} className="mb-4" />
			))}
			<div>
				<AddTagButton
					entity={instrument}
					onSuccess={() => window.location.reload()}
				/>
				{sortedTags.length > 0 && (
					<>
						<span className="text-gray-500 px-2">/</span>
						<EditTagsButton
							entity={instrument}
							onSuccess={() => window.location.reload()}
						/>
					</>
				)}
			</div>
		</Layout>
	);
};

export default InstrumentTags;
