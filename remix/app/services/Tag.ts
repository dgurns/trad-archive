import compareAsc from "date-fns/compareAsc";
import compareDesc from "date-fns/compareDesc";
import type {
	AudioItem,
	Collection,
	Instrument,
	Person,
	Place,
	Tune,
} from "@prisma/client";
import type { TagWithRelations } from "~/types";

enum TagSortStrategy {
	CreatedAtThenTimeMarker = "CREATED_AT_THEN_TIME_MARKER",
	CreatedAtDesc = "CREATED_AT_DESC",
}

/**
 * Sort with the following logic:
 *   1) Tags without time markers, sorted by `createdAt` ASC
 *   2) Tags with time markers, sorted by time marker ASC
 */
const sortByCreatedAtThenTimeMarker = (tags: TagWithRelations[]) => {
	const sortedTags = [...(tags ?? [])];
	sortedTags.sort((a, b) => {
		if (
			typeof a.subjectTimeMarkerSeconds !== "number" &&
			typeof b.subjectTimeMarkerSeconds !== "number"
		) {
			return compareAsc(new Date(a.createdAt), new Date(b.createdAt));
		}
		if (
			typeof a.subjectTimeMarkerSeconds !== "number" &&
			typeof b.subjectTimeMarkerSeconds === "number"
		) {
			return -1;
		}
		return (
			(a.subjectTimeMarkerSeconds ?? 0) - (b.subjectTimeMarkerSeconds ?? 0)
		);
	});
	return sortedTags;
};

/**
 * Sort Tags by `createdAt` DESC
 */
const sortByCreatedAtDesc = (tags: TagWithRelations[]) => {
	const sortedTags = [...(tags ?? [])];
	sortedTags.sort((a, b) => {
		return compareDesc(new Date(a.createdAt), new Date(b.createdAt));
	});
	return sortedTags;
};

const sort = (
	tags: TagWithRelations[] = [],
	sortStrategy = TagSortStrategy.CreatedAtThenTimeMarker
) => {
	switch (sortStrategy) {
		case TagSortStrategy.CreatedAtThenTimeMarker:
			return sortByCreatedAtThenTimeMarker(tags);
		case TagSortStrategy.CreatedAtDesc:
			return sortByCreatedAtDesc(tags);
		default:
			return tags;
	}
};

const getObjectEntity = (
	tag: TagWithRelations
): AudioItem | Collection | Instrument | Person | Place | Tune | null => {
	return (
		tag.objectAudioItem ??
		tag.objectCollection ??
		tag.objectInstrument ??
		tag.objectPerson ??
		tag.objectPlace ??
		tag.objectTune
	);
};

export default {
	TagSortStrategy,
	sort,
	getObjectEntity,
};
