import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

import { EntityFragments } from "fragments";
import { Collection } from "types";
import useAudioItemsTaggedWithEntity from "hooks/useAudioItemsTaggedWithEntity";
import TagService from "services/Tag";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";
import AudioItemComponent from "components/AudioItem";
import TagWithRelationshipToObject from "components/TagWithRelationshipToObject";
import AddTagButton from "components/AddTagButton";
import EditTagsButton from "components/EditTagsButton";

const COLLECTION_QUERY = gql`
	query Collection($slug: String!) {
		collection(slug: $slug) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;

const ViewCollectionBySlug = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data: collectionData, error: collectionError } = useQuery<{
		collection: Collection;
	}>(COLLECTION_QUERY, {
		variables: { slug },
		skip: !slug,
		fetchPolicy: "cache-and-network",
	});

	const [
		audioItems = [],
		{ loading: audioItemsLoading, error: audioItemsError },
		fetchNextPageOfAudioItems,
	] = useAudioItemsTaggedWithEntity({ entity: collectionData?.collection });

	let statusMessage;
	if (!collectionData && !collectionError) {
		statusMessage = <LoadingBlock />;
	} else if (!collectionData && collectionError) {
		statusMessage = `Error fetching Collection with slug ${slug}`;
	}

	if (statusMessage) {
		return <Layout>{statusMessage}</Layout>;
	}

	const { collection } = collectionData;
	const { name, entityType, aliases, description, tags, itmaAtomSlug } =
		collection;
	const sortedTags = TagService.sort(tags);

	const shouldShowAudioItems = audioItems.length > 0;
	const noAudioItemsFound =
		!audioItemsLoading && !audioItemsError && audioItems.length === 0;

	return (
		<Layout>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-1 flex-col mb-8">
					<h1 className="mb-6">Audio Items Tagged with "{name}"</h1>
					{shouldShowAudioItems && (
						<>
							{audioItems.map((audioItem, index) => (
								<AudioItemComponent audioItem={audioItem} key={index} />
							))}
							{!audioItemsLoading && (
								<button
									className="btn-text"
									onClick={fetchNextPageOfAudioItems}
								>
									Load More
								</button>
							)}
						</>
					)}
					{audioItemsLoading && <LoadingBlock />}
					{noAudioItemsFound && <div className="text-gray-500">None yet</div>}
					{audioItemsError && (
						<div className="text-red-600">Error fetching Audio Items</div>
					)}
				</div>
				<div className="flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300">
					<h3 className="mb-4">About {name}</h3>
					<div className="mb-4">
						Entity Type:
						<br />
						<span className="text-gray-500">{entityType}</span>
					</div>
					<div className="mb-4">
						Aliases:
						<br />
						<span className="text-gray-500">{aliases}</span>
					</div>
					{itmaAtomSlug && (
						<div className="mb-4">
							View on ITMA:
							<br />
							<a
								href={`https://itma-atom.arkivum.net/index.php/${slug}`}
								target="_blank"
							>
								{name}
							</a>
						</div>
					)}
					<div className="mb-4">
						Description:
						<br />
						<span className="text-gray-500">{description}</span>
					</div>
					<Link href={`/entities/collections/${slug}/edit`}>Edit</Link>

					<h3 className="mt-8 mb-4">Tags</h3>
					{sortedTags.map((tag, index) => (
						<TagWithRelationshipToObject
							tag={tag}
							key={index}
							className="mb-4"
						/>
					))}
					<div>
						<AddTagButton entity={collection} />
						{tags.length > 0 && (
							<>
								<span className="text-gray-500 px-2">/</span>
								<EditTagsButton entity={collection} />
							</>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ViewCollectionBySlug;
