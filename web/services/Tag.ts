import compareAsc from "date-fns/compareAsc";
import compareDesc from "date-fns/compareDesc";
import { Tag } from "types";

enum TagSortStrategy {
	CreatedAtThenTimeMarker = "CREATED_AT_THEN_TIME_MARKER",
	CreatedAtDesc = "CREATED_AT_DESC",
}

/**
 * Sort with the following logic:
 *   1) Tags without time markers, sorted by `createdAt` ASC
 *   2) Tags with time markers, sorted by time marker ASC
 */
const sortByCreatedAtThenTimeMarker = (tags: Tag[]) => {
	const sortedTags = [...tags];
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
		return a.subjectTimeMarkerSeconds - b.subjectTimeMarkerSeconds;
	});
	return sortedTags;
};

/**
 * Sort Tags by `createdAt` DESC
 */
const sortByCreatedAtDesc = (tags: Tag[]) => {
	const sortedTags = [...tags];
	sortedTags.sort((a, b) => {
		return compareDesc(new Date(a.createdAt), new Date(b.createdAt));
	});
	return sortedTags;
};

/**
 * @param {Array<Tag>} tags
 * 	- The Tags you want to sort
 * @param {Enum} sortStrategy
 * 	- The sort strategy you want to apply. Default is
 *    'created-at-then-time-marker'
 * @returns {Array<Tag>}
 * 	- The sorted Tags
 */
const sort = (
	tags: Tag[] = [],
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

export default {
	TagSortStrategy,
	sort,
};
