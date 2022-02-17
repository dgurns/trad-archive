import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { Collection } from "types";
import TagService from "services/Tag";
import { COLLECTION_QUERY } from "pages/entities/collections/[slug]";

import Layout from "components/Layout";
import Breadcrumb from "components/Breadcrumb";
import LoadingBlock from "components/LoadingBlock";
import TagWithRelationshipToObject from "components/TagWithRelationshipToObject";
import AddTagButton from "components/AddTagButton";
import EditTagsButton from "components/EditTagsButton";

const CollectionTags = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data, error, refetch } = useQuery<{
		collection: Collection;
	}>(COLLECTION_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const isLoading = !data && !error;
	const { collection } = data ?? {};
	const { name, tags } = collection ?? {};
	const sortedTags = TagService.sort(tags);

	return (
		<Layout pageTitle={`Trad Archive - ${name} - Tags`}>
			{isLoading && <LoadingBlock />}
			{error && <div className="text-red-500">{error.message}</div>}
			{data && (
				<>
					<Breadcrumb
						items={[
							{ label: "Collections", href: "/entities/collections" },
							{ label: name, href: `/entities/collections/${slug}` },
							{ label: "Tags" },
						]}
						className="mb-6"
					/>

					{sortedTags.map((tag, index) => (
						<TagWithRelationshipToObject
							tag={tag}
							key={index}
							className="mb-4"
						/>
					))}
					<div>
						<AddTagButton entity={collection} onSuccess={refetch} />
						{sortedTags.length > 0 && (
							<>
								<span className="text-gray-500 px-2">/</span>
								<EditTagsButton entity={collection} onSuccess={refetch} />
							</>
						)}
					</div>
				</>
			)}
		</Layout>
	);
};

export default CollectionTags;
