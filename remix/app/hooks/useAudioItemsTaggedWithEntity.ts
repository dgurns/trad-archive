import type { QueryResult, QueryHookOptions } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import type { Entity, EntityType, AudioItem } from "~/types";
import { EntityFragments } from "~/fragments";

export const AUDIO_ITEMS_TAGGED_WITH_ENTITY_QUERY = gql`
	query AudioItemsTaggedWithEntity($input: AudioItemsTaggedWithEntityInput!) {
		audioItemsTaggedWithEntity(input: $input) {
			audioItems {
				...AudioItem
			}
			total
		}
	}
	${EntityFragments.audioItem}
`;

interface QueryData {
	audioItemsTaggedWithEntity?: {
		audioItems: AudioItem[];
		total: number;
	};
}
interface QueryVariables {
	input: {
		entityType: EntityType;
		entityId: string;
		take?: number;
		skip?: number;
	};
}
interface HookArgs {
	entity?: Entity;
	page?: number;
	perPage?: number;
	queryOptions?: QueryHookOptions<QueryData, QueryVariables>;
}
interface HookReturnValue {
	audioItems: AudioItem[] | undefined;
	total: number | undefined;
	query: QueryResult<QueryData, QueryVariables>;
}

const useAudioItemsTaggedWithEntity = ({
	entity,
	page = 1,
	perPage = 10,
	queryOptions = {},
}: HookArgs): HookReturnValue => {
	const query = useQuery<QueryData, QueryVariables>(
		AUDIO_ITEMS_TAGGED_WITH_ENTITY_QUERY,
		{
			variables: {
				input: {
					entityType: entity?.entityType,
					entityId: entity?.id,
					skip: (page - 1) * perPage,
					take: perPage,
				},
			},
			skip: !entity,
			...queryOptions,
		}
	);
	const { data } = query;
	const audioItems = data?.audioItemsTaggedWithEntity?.audioItems;
	const total = data?.audioItemsTaggedWithEntity?.total;

	return {
		audioItems,
		total,
		query,
	};
};

export default useAudioItemsTaggedWithEntity;
