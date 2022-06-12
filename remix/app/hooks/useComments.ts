import { useEffect, useCallback } from "react";
import type {
	LazyQueryResult,
	LazyQueryHookOptions,
	QueryLazyOptions,
} from "@apollo/client";
import { useLazyQuery, gql } from "@apollo/client";
import type { Comment } from "~/types";
import { CommentFragments } from "~/fragments";

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
interface HookReturnValue {
	comments: Comment[];
	getComments: (options?: QueryLazyOptions<QueryVariables>) => void;
	commentsQuery: LazyQueryResult<QueryData, QueryVariables>;
	fetchNextPageOfComments: () => void;
}

const useComments = ({
	resultsPerPage = 10,
	queryOptions = {},
}: HookArgs = {}): HookReturnValue => {
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
	}, [getComments, resultsPerPage]);

	const comments = data?.comments;

	const fetchNextPageOfComments = useCallback(() => {
		fetchMore({
			variables: {
				input: {
					take: resultsPerPage,
					skip: comments.length ?? 0,
				},
			},
		});
	}, [fetchMore, resultsPerPage, comments]);

	return {
		comments: commentsQuery.data?.comments,
		getComments,
		commentsQuery,
		fetchNextPageOfComments,
	};
};

export default useComments;
