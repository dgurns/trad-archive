import { useEffect, useCallback } from "react";
import {
	useLazyQuery,
	gql,
	LazyQueryResult,
	LazyQueryHookOptions,
} from "@apollo/client";
import { Entity, EntityType, AudioItem } from "types";
import { EntityFragments } from "fragments";

export const AUDIO_ITEMS_TAGGED_WITH_ENTITY_QUERY = gql`
	query AudioItemsTaggedWithEntity($input: AudioItemsTaggedWithEntityInput!) {
		audioItemsTaggedWithEntity(input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;

interface QueryData {
	audioItemsTaggedWithEntity?: AudioItem[];
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
	resultsPerPage?: number;
	queryOptions?: LazyQueryHookOptions<QueryData, QueryVariables>;
}

const useAudioItemsTaggedWithEntity = ({
	entity,
	resultsPerPage = 15,
	queryOptions = {},
}: HookArgs): [
	AudioItem[] | undefined,
	LazyQueryResult<QueryData, QueryVariables>,
	() => void
] => {
	const [makeQuery, query] = useLazyQuery<QueryData, QueryVariables>(
		AUDIO_ITEMS_TAGGED_WITH_ENTITY_QUERY,
		{
			notifyOnNetworkStatusChange: true,
			fetchPolicy: "cache-and-network",
			...queryOptions,
		}
	);
	const { data, fetchMore } = query;

	useEffect(() => {
		if (entity) {
			makeQuery({
				variables: {
					input: {
						entityType: entity.entityType,
						entityId: entity.id,
						take: resultsPerPage,
					},
				},
			});
		}
	}, [makeQuery, entity]);

	const audioItems = data?.audioItemsTaggedWithEntity;

	const fetchNextPage = useCallback(() => {
		fetchMore({
			variables: {
				input: {
					entityType: entity.entityType,
					entityId: entity.id,
					take: resultsPerPage,
					skip: audioItems.length ?? 0,
				},
			},
		});
	}, [fetchMore, resultsPerPage, entity, audioItems]);

	return [audioItems, query, fetchNextPage];
};

export default useAudioItemsTaggedWithEntity;
