import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

import { EntityFragments } from "fragments";
import { Collection, PerPage, ViewAs } from "types";
import useAudioItemsTaggedWithEntity from "hooks/useAudioItemsTaggedWithEntity";
import useFilters from "hooks/useFilters";
import TagService from "services/Tag";

import Layout from "components/Layout";
import Breadcrumb from "components/Breadcrumb";
import LoadingBlock from "components/LoadingBlock";
import AudioItem from "components/AudioItem";
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
	const { collection } = collectionData ?? {};
	const { name, aliases, description, tags, itmaAtomSlug } = collection ?? {};
	const sortedTags = TagService.sort(tags);

	const [totalAudioItems, setTotalAudioItems] = useState<number | undefined>();

	const { Filters, filtersProps, page, perPage, viewAs } = useFilters({
		defaultPage: 1,
		totalItems: totalAudioItems,
		defaultPerPage: PerPage.Twenty,
		defaultViewAs: ViewAs.Card,
	});

	const {
		audioItems = [],
		total,
		query: { loading: audioItemsLoading, error: audioItemsError },
	} = useAudioItemsTaggedWithEntity({
		entity: collection,
		page,
		perPage: perPage as number,
	});
	useEffect(() => {
		if (typeof total === "number") {
			setTotalAudioItems(total);
		}
	}, [total]);

	const aboutMarkup = useMemo(
		() => (
			<>
				{itmaAtomSlug && (
					<div className="mb-4">
						<div className="italic text-gray-500">
							This was sourced from ITMA's AtoM archive
						</div>
						<a
							href={`https://itma-atom.arkivum.net/index.php/${itmaAtomSlug}`}
							target="_blank"
						>
							View on AtoM <i className="material-icons text-sm">launch</i>
						</a>
					</div>
				)}
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
				<Link href={`/entities/collections/${slug}/edit`}>Edit</Link>
			</>
		),
		[aliases, description, slug, itmaAtomSlug]
	);

	const tagsMarkup = useMemo(
		() => (
			<>
				{sortedTags.map((tag, index) => (
					<TagWithRelationshipToObject tag={tag} key={index} className="mb-4" />
				))}
				<div>
					<AddTagButton entity={collection} />
					{sortedTags.length > 0 && (
						<>
							<span className="text-gray-500 px-2">/</span>
							<EditTagsButton entity={collection} />
						</>
					)}
				</div>
			</>
		),
		[sortedTags, collection]
	);

	let statusMessage;
	if (!collectionData && !collectionError) {
		statusMessage = <LoadingBlock />;
	} else if (!collectionData && collectionError) {
		statusMessage = `Error fetching Collection with slug ${slug}`;
	}

	if (statusMessage) {
		return <Layout>{statusMessage}</Layout>;
	}

	return (
		<Layout pageTitle={`Trad Archive - ${name}`}>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-1 flex-col mb-8">
					<Breadcrumb
						items={[
							{ label: "Collections", href: "/entities/collections" },
							{ label: name },
						]}
						className="mb-2"
					/>
					<div className="flex flex-row mb-6">
						<span className="text-gray-500">
							{totalAudioItems ?? ""} Audio Items
						</span>
						<Link href={`/entities/collections/${slug}/about`}>
							<a className="ml-4">About</a>
						</Link>
						<Link href={`/entities/collections/${slug}/tags`}>
							<a className="ml-4">Tags</a>
						</Link>
					</div>

					{!totalAudioItems && audioItemsLoading && <LoadingBlock />}

					{totalAudioItems > 0 && (
						<>
							<Filters {...filtersProps} className="mb-6" />
							{audioItemsLoading ? (
								<LoadingBlock />
							) : (
								audioItems.map((audioItem, index) => (
									<AudioItem
										viewAs={viewAs}
										audioItem={audioItem}
										key={index}
										className={viewAs === ViewAs.List ? "mb-4" : "mb-6"}
									/>
								))
							)}
						</>
					)}

					{audioItemsError && (
						<div className="text-red-600">Error fetching Audio Items</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default ViewCollectionBySlug;
