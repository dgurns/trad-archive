import { useMemo, useState, useCallback, useEffect } from "react";
import { Link } from "@remix-run/react";

import type { TagWithRelations, AudioItemWithRelations } from "~/types";
import EntityService from "~/services/Entity";
import TagService from "~/services/Tag";

import AddTagButton from "~/components/AddTagButton";
import EditTagsButton from "~/components/EditTagsButton";

interface TagProps {
	tag: TagWithRelations;
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

	const { relationship } = tag;
	const objectEntity = TagService.getObjectEntity(tag);
	const href = EntityService.makeHrefForView(objectEntity);
	if (!objectEntity || !href) {
		return null;
	}
	return (
		<Link
			to={href}
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
				{relationship.name} {objectEntity.entityType?.toUpperCase()}
			</div>
		</Link>
	);
};

interface TagsProps {
	audioItem: AudioItemWithRelations;
}
const Tags = ({ audioItem }: TagsProps) => {
	const { tagsAsSubject } = audioItem;

	const sortedTags = useMemo(() => {
		if (!Array.isArray(tagsAsSubject)) {
			return [];
		}
		const tagsWithoutTimeMarkers = tagsAsSubject.filter(
			(tag) => typeof tag.subjectTimeMarkerSeconds !== "number"
		);
		return TagService.sort(tagsWithoutTimeMarkers);
	}, [tagsAsSubject]);

	return (
		<div className="flex flex-row items-center flex-wrap">
			{sortedTags.map((tag, index) => (
				<div className="mr-2" key={index}>
					<TagLink tag={tag} />
				</div>
			))}

			<div
				className={
					tagsAsSubject && tagsAsSubject.length > 0 ? "mb-2 ml-1" : undefined
				}
			>
				<AddTagButton entity={audioItem} />
			</div>

			{tagsAsSubject && tagsAsSubject.length > 0 && (
				<div className="flex ml-1 mb-2">
					<span className="text-gray-500 mr-1">/</span>
					<EditTagsButton entity={audioItem} />
				</div>
			)}
		</div>
	);
};

export default Tags;
