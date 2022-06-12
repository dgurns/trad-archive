import { useQuery } from "@apollo/client";
import { useNavigate } from "@remix-run/react";

import type { Person } from "~/types";
import TagService from "~/services/Tag";
import { PERSON_QUERY } from "~/routes/entities/people/[slug]";

import Layout from "~/components/Layout";
import Breadcrumb from "~/components/Breadcrumb";
import LoadingBlock from "~/components/LoadingBlock";
import TagWithRelationshipToObject from "~/components/TagWithRelationshipToObject";
import AddTagButton from "~/components/AddTagButton";
import EditTagsButton from "~/components/EditTagsButton";

const PersonTags = () => {
	const navigate = useNavigate();
	const { slug } = navigate.query;

	const { data, error, refetch } = useQuery<{
		person: Person;
	}>(PERSON_QUERY, {
		variables: { slug },
		skip: !slug,
	});
	const isLoading = !data && !error;
	const { person } = data ?? {};
	const { name, tags } = person ?? {};
	const sortedTags = TagService.sort(tags);

	return (
		<Layout pageTitle={`Trad Archive - ${name} - Tags`}>
			{isLoading && <LoadingBlock />}
			{error && <div className="text-red-500">{error.message}</div>}
			{data && (
				<>
					<Breadcrumb
						items={[
							{ label: "People", href: "/entities/people" },
							{ label: name, href: `/entities/people/${slug}` },
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
						<AddTagButton entity={person} onSuccess={refetch} />
						{sortedTags.length > 0 && (
							<>
								<span className="text-gray-500 px-2">/</span>
								<EditTagsButton entity={person} onSuccess={refetch} />
							</>
						)}
					</div>
				</>
			)}
		</Layout>
	);
};

export default PersonTags;
