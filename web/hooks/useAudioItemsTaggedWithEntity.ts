import { useEffect } from 'react';
import { useLazyQuery, gql, LazyQueryResult } from '@apollo/client';
import { Entity, EntityType, AudioItem } from 'types';
import { EntityFragments } from 'fragments';

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

const useAudioItemsTaggedWithEntity = (
  entity?: Entity
): [AudioItem[] | undefined, LazyQueryResult<QueryData, QueryVariables>] => {
  const [makeQuery, query] = useLazyQuery<QueryData, QueryVariables>(
    AUDIO_ITEMS_TAGGED_WITH_ENTITY_QUERY
  );

  useEffect(() => {
    if (entity) {
      makeQuery({
        variables: {
          input: { entityType: entity.entityType, entityId: entity.id },
        },
      });
    }
  }, [makeQuery, entity]);

  const audioItems = query.data?.audioItemsTaggedWithEntity;

  return [audioItems, query];
};

export default useAudioItemsTaggedWithEntity;
