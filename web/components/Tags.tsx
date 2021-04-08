import { useMemo } from "react";
import Link from "next/link";
import compareAsc from "date-fns/compareAsc";

import { Tag, Entity } from "types";
import EntityService from "services/Entity";
import TagService from "services/Tag";

import AddTag from "components/AddTag";

interface TagProps {
	tag: Tag;
}
const TagLink = ({ tag }: TagProps) => {
	const { objectEntity } = tag;
	const href = EntityService.makeHrefForView(objectEntity);
	return (
		<Link href={href}>
			<a className="block p-1 px-2 mb-2 no-underline border border-teal-600 rounded hover:border-teal-800">
				{objectEntity.name}
			</a>
		</Link>
	);
};

interface TagsProps {
	entity: Entity;
}
const Tags = ({ entity }: TagsProps) => {
	const { tags } = entity;

	const sortedTags = useMemo(() => {
		if (!Array.isArray(tags)) {
			return [];
		}
		return TagService.sort(tags);
	}, [tags]);

	return (
		<div className="flex flex-row items-center flex-wrap">
			{sortedTags.map((tag, index) => (
				<div className="mr-2" key={index}>
					<TagLink tag={tag} />
				</div>
			))}
			<div className={tags?.length > 0 ? "mb-2 ml-1" : undefined}>
				<AddTag entity={entity} />
			</div>
		</div>
	);
};

export default Tags;
