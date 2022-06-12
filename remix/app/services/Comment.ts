import compareDesc from "date-fns/compareDesc";

import type { Comment } from "~/types";

const sortByCreatedAtDesc = (comments: Comment[]) => {
	let sortedComments = [...comments];
	sortedComments.sort((a, b) => {
		return compareDesc(new Date(a.createdAt), new Date(b.createdAt));
	});
	return sortedComments;
};

const CommentService = {
	sortByCreatedAtDesc,
};
export default CommentService;
