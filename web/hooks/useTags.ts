import { useEffect, useCallback } from "react";
import {
	useLazyQuery,
	gql,
	LazyQueryResult,
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

export interface TagsQueryData {
	tags: Tag[];
}
export interface TagsQueryVariables {
	input: {
		take?: number;
		skip?: number;
	};
}
interface HookArgs {
	resultsPerPage?: number;
	queryOptions?: LazyQueryHookOptions<TagsQueryData, TagsQueryVariables>;
}

const useTags = ({ resultsPerPage = 10, queryOptions = {} }: HookArgs = {}): [
	Tag[] | undefined,
	LazyQueryResult<TagsQueryData, {}>,
	() => void
] => {
	const [getTags, tagsQuery] = useLazyQuery<TagsQueryData, TagsQueryVariables>(
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

	const fetchNextPage = useCallback(() => {
		fetchMore({
			variables: {
				input: {
					take: resultsPerPage,
					skip: tags.length ?? 0,
				},
			},
		});
	}, [fetchMore, resultsPerPage, tags]);

	return [tagsQuery.data?.tags, tagsQuery, fetchNextPage];
};

export default useTags;
