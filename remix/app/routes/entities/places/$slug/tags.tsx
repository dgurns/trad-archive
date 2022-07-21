import { useQuery } from "@apollo/client";
import { useNavigate } from "@remix-run/react";

import type { Place } from "~/types";
import TagService from "~/services/Tag";

import Layout from "~/components/Layout";
import Breadcrumb from "~/components/Breadcrumb";
import LoadingBlock from "~/components/LoadingBlock";
import TagWithRelationshipToObject from "~/components/TagWithRelationshipToObject";
import AddTagButton from "~/components/AddTagButton";
import EditTagsButton from "~/components/EditTagsButton";

const PlaceTags = () => {
	const navigate = useNavigate();
	const { slug } = navigate.query;

	const { place } = data ?? {};
	const { name, tags } = place ?? {};
	const sortedTags = TagService.sort(tags);

	return (
		<Layout pageTitle={`Trad Archive - ${name} - Tags`}>
			{data && (
				<>
					<Breadcrumb
						items={[
							{ label: "Places", href: "/entities/places" },
							{ label: name, href: `/entities/places/${slug}` },
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
						<AddTagButton entity={place} onSuccess={refetch} />
						{sortedTags.length > 0 && (
							<>
								<span className="text-gray-500 px-2">/</span>
								<EditTagsButton entity={place} onSuccess={refetch} />
							</>
						)}
					</div>
				</>
			)}
		</Layout>
	);
};

export default PlaceTags;