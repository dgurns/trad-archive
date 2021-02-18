import { useEffect } from 'react';
import { useLazyQuery, gql, LazyQueryResult } from '@apollo/client';
import { Tag, Entity, EntityType, AudioItem } from 'types';
import { TagFragments } from 'fragments';

export const TAGS_FROM_ENTITY_QUERY = gql`
  query TagsFromEntity($input: TagsFromEntityInput!) {
    tagsFromEntity(input: $input) {
      ...Tag
    }
  }
  ${TagFragments.tag}
`;

interface QueryData {
  tagsFromEntity?: Tag[];
}
interface QueryVariables {
  input: {
    entityType: EntityType;
    entityId: string;
  };
}

const useTagsFromEntity = (
  entity?: Entity
): [Tag[] | undefined, LazyQueryResult<QueryData, QueryVariables>] => {
  const [makeQuery, query] = useLazyQuery<QueryData, QueryVariables>(
    TAGS_FROM_ENTITY_QUERY,
    {
      variables: {
        input: {
          entityType: entity?.entityType,
          entityId: entity?.id,
        },
      },
    }
  );

  useEffect(() => {
    if (entity) {
      makeQuery();
    }
  }, [makeQuery, entity]);

  const tags = query.data?.tagsFromEntity;

  return [tags, query];
};

export default useTagsFromEntity;
