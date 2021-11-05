import { useEffect, useCallback, useState } from "react";
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
	resultsPerPage = 10,
	queryOptions = {},
}: HookArgs): [
	AudioItem[] | undefined,
	LazyQueryResult<QueryData, QueryVariables>,
	() => void
] => {
	const [skip, setSkip] = useState(0);
	const [audioItems, setAudioItems] = useState<AudioItem[] | undefined>();

	const [makeQuery, query] = useLazyQuery<QueryData, QueryVariables>(
		AUDIO_ITEMS_TAGGED_WITH_ENTITY_QUERY,
		{
			notifyOnNetworkStatusChange: true,
			...queryOptions,
		}
	);
	const { data, fetchMore } = query;
	useEffect(() => {
		// Avoid bug with Apollo Client where it makes an extra network request
		// with original variables after `fetchMore` is called, thus leading to
		// `data` briefly being `undefined`.
		// https://github.com/apollographql/apollo-client/issues/6916
		if (data?.audioItemsTaggedWithEntity) {
			setAudioItems(data.audioItemsTaggedWithEntity);
		}
	}, [data]);

	useEffect(() => {
		if (entity) {
			makeQuery({
				variables: {
					input: {
						entityType: entity.entityType,
						entityId: entity.id,
						take: resultsPerPage + skip,
					},
				},
			});
		}
	}, [makeQuery, entity, skip, resultsPerPage]);

	const fetchNextPage = useCallback(async () => {
		const numToSkip = audioItems?.length ?? 0;
		await fetchMore({
			variables: {
				input: {
					entityType: entity.entityType,
					entityId: entity.id,
					take: resultsPerPage,
					skip: numToSkip,
				},
			},
		});
		setSkip(numToSkip);
	}, [fetchMore, resultsPerPage, entity, audioItems]);

	return [audioItems, query, fetchNextPage];
};

export default useAudioItemsTaggedWithEntity;
