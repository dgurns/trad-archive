import compareAsc from "date-fns/compareAsc";
import { Tag } from "types";

enum SortStrategy {
	CreatedAtThenTimeMarker = "CREATED_AT_THEN_TIME_MARKER",
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
 * @param {Array<Tag>} tags
 * 	- The Tags you want to sort
 * @param {Enum} sortStrategy
 * 	- The sort strategy you want to apply. Default is
 *    'created-at-then-time-marker'
 * @returns {Array<Tag>}
 * 	- The sorted Tags
 */
const sort = (
	tags: Tag[],
	sortStrategy = SortStrategy.CreatedAtThenTimeMarker
) => {
	switch (sortStrategy) {
		case SortStrategy.CreatedAtThenTimeMarker:
			return sortByCreatedAtThenTimeMarker(tags);
		default:
			return tags;
	}
};

export default {
	sort,
};
