import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

import { EntityFragments } from "fragments";
import { Person } from "types";
import useAudioItemsTaggedWithEntity from "hooks/useAudioItemsTaggedWithEntity";
import TagService from "services/Tag";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";
import AudioItemComponent from "components/AudioItem";
import TagWithRelationshipToObject from "components/TagWithRelationshipToObject";
import AddTagButton from "components/AddTagButton";
import EditTagsButton from "components/EditTagsButton";

const PERSON_QUERY = gql`
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

	const { data: personData, error: personError } = useQuery<{ person: Person }>(
		PERSON_QUERY,
		{
			variables: { slug },
			skip: !slug,
			fetchPolicy: "cache-and-network",
		}
	);

	const [
		audioItems = [],
		{ loading: audioItemsLoading, error: audioItemsError },
		fetchNextPageOfAudioItems,
	] = useAudioItemsTaggedWithEntity({ entity: personData?.person });

	let statusMessage;
	if (!personData && !personError) {
		statusMessage = <LoadingBlock />;
	} else if (!personData && personError) {
		statusMessage = `Error fetching Person with slug ${slug}`;
	}

	if (statusMessage) {
		return <Layout>{statusMessage}</Layout>;
	}

	const { person } = personData;
	const { name, entityType, aliases, description, tags } = person;
	const sortedTags = TagService.sort(tags);

	const shouldShowAudioItems = audioItems.length > 0;
	const noAudioItemsFound =
		!audioItemsLoading && !audioItemsError && audioItems.length === 0;

	return (
		<Layout>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-1 flex-col mb-8">
					<h2 className="mb-4">Audio Items Tagged with "{name}"</h2>
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
					<h2 className="mb-4">About {name}</h2>
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
					<div className="mb-4">
						Description:
						<br />
						<span className="text-gray-500">{description}</span>
					</div>
					<Link href={`/entities/people/${slug}/edit`}>Edit</Link>
					<h2 className="mt-8 mb-4">Tags</h2>
					{sortedTags.map((tag, index) => (
						<TagWithRelationshipToObject
							tag={tag}
							key={index}
							className="mb-4"
						/>
					))}
					<div>
						<AddTagButton entity={person} />
						{tags.length > 0 && (
							<>
								<span className="text-gray-500 px-2">/</span>
								<EditTagsButton entity={person} />
							</>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ViewPersonBySlug;
