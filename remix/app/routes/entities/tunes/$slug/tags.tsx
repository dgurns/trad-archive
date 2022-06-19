import { useQuery } from "@apollo/client";
import { useNavigate } from "@remix-run/react";

import type { Tune } from "~/types";
import TagService from "~/services/Tag";

import Layout from "~/components/Layout";
import Breadcrumb from "~/components/Breadcrumb";
import LoadingBlock from "~/components/LoadingBlock";
import TagWithRelationshipToObject from "~/components/TagWithRelationshipToObject";
import AddTagButton from "~/components/AddTagButton";
import EditTagsButton from "~/components/EditTagsButton";

const TuneTags = () => {
	const navigate = useNavigate();
	const { slug } = navigate.query;

	const { tune } = data ?? {};
	const { name, tags } = tune ?? {};
	const sortedTags = TagService.sort(tags);

	return (
		<Layout pageTitle={`Trad Archive - ${name} - Tags`}>
			{data && (
				<>
					<Breadcrumb
						items={[
							{ label: "Tunes", href: "/entities/tunes" },
							{ label: name, href: `/entities/tunes/${slug}` },
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
						<AddTagButton entity={tune} onSuccess={refetch} />
						{sortedTags.length > 0 && (
							<>
								<span className="text-gray-500 px-2">/</span>
								<EditTagsButton entity={tune} onSuccess={refetch} />
							</>
						)}
					</div>
				</>
			)}
		</Layout>
	);
};

export default TuneTags;
