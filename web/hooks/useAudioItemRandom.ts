import { useQuery, gql, QueryHookOptions, QueryResult } from "@apollo/client";
import { AudioItem } from "types";
import { EntityFragments } from "fragments";

export const AUDIO_ITEM_RANDOM_QUERY = gql`
	query AudioItemRandom {
		audioItemRandom {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;

interface QueryData {
	audioItemRandom: AudioItem;
}
interface HookArgs {
	slug?: string;
	queryOptions?: QueryHookOptions<QueryData>;
}

const useAudioItemRandom = ({ queryOptions = {} }: HookArgs = {}): [
	AudioItem | undefined,
	QueryResult<QueryData, {}>
] => {
	const audioItemRandomQuery = useQuery<QueryData>(AUDIO_ITEM_RANDOM_QUERY, {
		fetchPolicy: "network-only",
		...queryOptions,
	});
	const { data } = audioItemRandomQuery;
	const audioItemRandom = data?.audioItemRandom;

	return [audioItemRandom, audioItemRandomQuery];
};

export default useAudioItemRandom;
