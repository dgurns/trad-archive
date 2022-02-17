import { useMemo, useState, useCallback, useEffect } from "react";
import Link from "next/link";

import { Tag, Entity } from "types";
import EntityService from "services/Entity";
import TagService from "services/Tag";

import AddTagButton from "components/AddTagButton";
import EditTagsButton from "components/EditTagsButton";

interface TagProps {
	tag: Tag;
}
const TagLink = ({ tag }: TagProps) => {
	const [tooltipIsVisible, setTooltipIsVisible] = useState(false);
	const [timeoutFunc, setTimeoutFunc] = useState<NodeJS.Timeout>();

	const onMouseEnter = useCallback(() => {
		setTimeoutFunc(setTimeout(() => setTooltipIsVisible(true), 400));
	}, []);

	const onMouseLeave = useCallback(() => {
		if (timeoutFunc) {
			clearTimeout(timeoutFunc);
			setTimeoutFunc(undefined);
		}
		setTooltipIsVisible(false);
	}, [timeoutFunc]);

	// Clean up the timeout function when component unmounts
	useEffect(() => {
		return () => {
			if (timeoutFunc) {
				clearTimeout(timeoutFunc);
				setTimeoutFunc(undefined);
			}
		};
	}, [timeoutFunc]);

	const { objectEntity, relationship } = tag;
	const href = EntityService.makeHrefForView(objectEntity);
	return (
		<Link href={href}>
			<a
				className="relative block p-1 px-2 mb-2 no-underline border border-teal-600 rounded hover:border-teal-800"
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				{objectEntity.name}
				<div
					className={`${
						tooltipIsVisible ? "flex" : "hidden"
					} absolute -top-8 left-0 text-center px-2 py-1 text-sm whitespace-nowrap bg-gray-700 rounded text-white`}
				>
					{relationship.name} {objectEntity.entityType.toUpperCase()}
				</div>
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
		const tagsWithoutTimeMarkers = tags.filter(
			(tag) => typeof tag.subjectTimeMarkerSeconds !== "number"
		);
		return TagService.sort(tagsWithoutTimeMarkers);
	}, [tags]);

	return (
		<div className="flex flex-row items-center flex-wrap">
			{sortedTags.map((tag, index) => (
				<div className="mr-2" key={index}>
					<TagLink tag={tag} />
				</div>
			))}

			<div className={tags?.length > 0 ? "mb-2 ml-1" : undefined}>
				<AddTagButton entity={entity} />
			</div>

			{tags?.length > 0 && (
				<div className="flex ml-1 mb-2">
					<span className="text-gray-500 mr-1">/</span>
					<EditTagsButton entity={entity} />
				</div>
			)}
		</div>
	);
};

export default Tags;
