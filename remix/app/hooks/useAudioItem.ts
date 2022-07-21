import { useEffect } from "react";
import type { LazyQueryHookOptions, LazyQueryResult } from "@apollo/client";
import { useLazyQuery, gql } from "@apollo/client";
import type { AudioItem } from "~/types";
import { EntityFragments } from "~/fragments";

export const AUDIO_ITEM_QUERY = gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;

interface QueryData {
	audioItem: AudioItem;
}
interface QueryVariables {
	slug: string;
}
interface HookArgs {
	slug?: string;
	queryOptions?: LazyQueryHookOptions<QueryData, QueryVariables>;
	skip?: boolean;
}

const useAudioItem = ({
	slug,
	queryOptions = {},
	skip = false,
}: HookArgs = {}): [
	AudioItem | undefined,
	LazyQueryResult<QueryData, QueryVariables>
] => {
	const [getAudioItem, audioItemQuery] = useLazyQuery<
		QueryData,
		QueryVariables
	>(AUDIO_ITEM_QUERY, queryOptions);
	const { data } = audioItemQuery;

	useEffect(() => {
		if (skip) {
			return;
		}
		if (slug) {
			getAudioItem({
				variables: {
					slug,
				},
			});
		}
	}, [getAudioItem, slug, skip]);

	const audioItem = data?.audioItem;

	return [audioItem, audioItemQuery];
};

export default useAudioItem;
