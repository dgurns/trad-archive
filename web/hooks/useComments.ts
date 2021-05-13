import { useEffect, useCallback } from "react";
import {
	useLazyQuery,
	gql,
	LazyQueryResult,
	LazyQueryHookOptions,
} from "@apollo/client";
import { Comment } from "types";
import { CommentFragments } from "fragments";

export const COMMENTS_QUERY = gql`
	query Comments($input: CommentsInput!) {
		comments(input: $input) {
			...Comment
		}
	}
	${CommentFragments.comment}
`;

interface QueryData {
	comments: Comment[];
}
interface QueryVariables {
	input: {
		take?: number;
		skip?: number;
	};
}
interface HookArgs {
	resultsPerPage?: number;
	queryOptions?: LazyQueryHookOptions<QueryData, QueryVariables>;
}

const useComments = ({
	resultsPerPage = 10,
	queryOptions = {},
}: HookArgs = {}): [
	Comment[] | undefined,
	LazyQueryResult<QueryData, {}>,
	() => void
] => {
	const [getComments, commentsQuery] = useLazyQuery<QueryData, QueryVariables>(
		COMMENTS_QUERY,
		{
			notifyOnNetworkStatusChange: true,
			...queryOptions,
		}
	);
	const { data, fetchMore } = commentsQuery;

	useEffect(() => {
		getComments({
			variables: {
				input: {
					take: resultsPerPage,
				},
			},
		});
	}, [getComments]);

	const comments = data?.comments;

	const fetchNextPage = useCallback(() => {
		fetchMore({
			variables: {
				input: {
					take: resultsPerPage,
					skip: comments.length ?? 0,
				},
			},
		});
	}, [fetchMore, resultsPerPage, comments]);

	return [commentsQuery.data?.comments, commentsQuery, fetchNextPage];
};

export default useComments;
