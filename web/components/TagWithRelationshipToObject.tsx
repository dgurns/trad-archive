import Link from "next/link";

import { Tag } from "types";
import EntityService from "services/Entity";
import DateTimeService from "services/DateTime";

interface Props {
	tag: Tag;
	className?: string;
}

// TagWithRelationshipToObject renders a Tag in the format "taught PERSON Billy
// McComiskey", displaying the relationship from the subject entity to an object
// entity.
const TagWithRelationshipToObject = ({ tag, className }: Props) => {
	const { relationship, objectEntity, subjectTimeMarkerSeconds } = tag;

	if (!objectEntity) {
		return null;
	}

	return (
		<div className={`text-gray-500 ${className ?? ""}`}>
			<em>{relationship.name}</em>
			<br />
			<span className="uppercase text-sm">{objectEntity.entityType}</span>
			<br />
			<Link href={EntityService.makeHrefForView(objectEntity)}>
				{objectEntity.name}
			</Link>
			<br />
			{subjectTimeMarkerSeconds && (
				<em>
					{`at ${DateTimeService.formatSecondsAsDuration(
						subjectTimeMarkerSeconds
					)}`}
				</em>
			)}
		</div>
	);
};

export default TagWithRelationshipToObject;
