import compareAsc from "date-fns/compareAsc";
import { Tag } from "types";

/**
 * @param {Array<Tag>} tags
 * 	- The Tags you want to sort
 * @returns {Array<Tag>}
 * 	- The Tags sorted in the following order:
 * 		1) Tags without time markers, sorted by `createdAt` ASC
 * 		2) Tags with time markers, sorted by time marker ASC
 */
const sort = (tags: Tag[]) => {
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

export default {
	sort,
};
