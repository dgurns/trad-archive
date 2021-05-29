import { useEffect, useCallback } from "react";
import {
	useLazyQuery,
	gql,
	LazyQueryResult,
	QueryLazyOptions,
	LazyQueryHookOptions,
} from "@apollo/client";
import { Tag } from "types";
import { TagFragments } from "fragments";

export const TAGS_QUERY = gql`
	query Tags($input: TagsInput!) {
		tags(input: $input) {
			...Tag
		}
	}
	${TagFragments.tag}
`;

interface QueryData {
	tags: Tag[];
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
	tags: Tag[];
	getTags: (options?: QueryLazyOptions<QueryVariables>) => void;
	tagsQuery: LazyQueryResult<QueryData, QueryVariables>;
	fetchNextPageOfTags: () => void;
}

const useTags = ({
	resultsPerPage = 10,
	queryOptions = {},
}: HookArgs = {}): HookReturnValue => {
	const [getTags, tagsQuery] = useLazyQuery<QueryData, QueryVariables>(
		TAGS_QUERY,
		{
			notifyOnNetworkStatusChange: true,
			...queryOptions,
		}
	);
	const { data, fetchMore } = tagsQuery;

	useEffect(() => {
		getTags({
			variables: {
				input: {
					take: resultsPerPage,
				},
			},
		});
	}, [getTags]);

	const tags = data?.tags;

	const fetchNextPageOfTags = useCallback(() => {
		fetchMore({
			variables: {
				input: {
					take: resultsPerPage,
					skip: tags.length ?? 0,
				},
			},
		});
	}, [fetchMore, resultsPerPage, tags]);

	return {
		tags: tagsQuery.data?.tags,
		getTags,
		tagsQuery,
		fetchNextPageOfTags,
	};
};

export default useTags;
