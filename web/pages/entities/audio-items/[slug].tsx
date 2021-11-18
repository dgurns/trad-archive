import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

import { EntityFragments } from "fragments";
import { AudioItem } from "types";
import TagService from "services/Tag";

import Layout from "components/Layout";
import AudioItemComponent from "components/AudioItem";
import LoadingBlock from "components/LoadingBlock";
import AddTagButton from "components/AddTagButton";
import EditTagsButton from "components/EditTagsButton";
import TagWithRelationshipToObject from "components/TagWithRelationshipToObject";

const AUDIO_ITEM_QUERY = gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;

const ViewAudioItemBySlug = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data: audioItemData, error: audioItemError } = useQuery<{
		audioItem: AudioItem;
	}>(AUDIO_ITEM_QUERY, {
		variables: { slug },
		skip: !slug,
		fetchPolicy: "cache-and-network",
	});

	const { audioItem } = audioItemData ?? {};
	const { name, aliases, tags, itmaAtomSlug } = audioItem ?? {};

	// Sort Tags so that non-time-marker Tags appear first in order of createdAt
	// ASC, followed by the rest in order of time marker ASC.
	const sortedTags = useMemo(() => {
		if (!Array.isArray(tags)) {
			return [];
		}
		return TagService.sort(tags);
	}, [tags]);

	const aboutMarkup = useMemo(
		() => (
			<>
				{aliases && (
					<div className="mb-4">
						Aliases:
						<br />
						<span className="text-gray-500">{aliases}</span>
					</div>
				)}
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
				<Link href={`/entities/audio-items/${slug}/edit`}>Edit</Link>
			</>
		),
		[aliases, slug]
	);

	const tagsMarkup = useMemo(
		() => (
			<>
				{sortedTags.map((tag, index) => (
					<TagWithRelationshipToObject tag={tag} key={index} className="mb-4" />
				))}
				<div>
					<AddTagButton entity={audioItem} />
					{sortedTags.length > 0 && (
						<>
							<span className="text-gray-500 px-2">/</span>
							<EditTagsButton entity={audioItem} />
						</>
					)}
				</div>
			</>
		),
		[sortedTags, audioItem]
	);

	let statusMessage;
	if (!audioItemData && !audioItemError) {
		statusMessage = <LoadingBlock />;
	} else if (!audioItemData && audioItemError) {
		statusMessage = `Error fetching Audio Item with slug ${slug}`;
	} else if (!audioItem) {
		statusMessage = "Could not find this Audio Item";
	}

	if (statusMessage) {
		return <Layout>{statusMessage}</Layout>;
	}

	return (
		<Layout pageTitle={`Trad Archive - ${name}`}>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-1 flex-col">
					<div className="flex flex-row items-center mb-1">
						<Link href="/">
							<a className="mr-1">Audio Items</a>
						</Link>
						<i className="material-icons text-gray-500 text-base">
							keyboard_arrow_right
						</i>
					</div>
					<h1 className="mb-6">{name}</h1>

					<div className="flex-col mb-8 md:hidden">{aboutMarkup}</div>

					<AudioItemComponent
						audioItem={audioItem}
						showTitle={false}
						className="mb-8"
					/>
				</div>

				<div className="hidden md:flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300">
					<h3 className="mb-4">About</h3>
					{aboutMarkup}
					<h3 className="mt-8 mb-4">Tags</h3>
					{tagsMarkup}
				</div>
			</div>
		</Layout>
	);
};

export default ViewAudioItemBySlug;
