import { useEffect } from 'react';
import { useLazyQuery, gql, LazyQueryResult } from '@apollo/client';
import { Entity, EntityType, Tag } from 'types';
import { EntityFragments, RelationshipFragments } from 'fragments';

export const TAGS_FOR_ENTITY_QUERY = gql`
  query TagsForEntity($entityType: EntityType!, $entityId: String!) {
    tagsForEntity(entityType: $entityType, entityId: $entityId) {
      id
      relationship {
        ...Relationship
      }
      subjectAudioItem {
        ...AudioItem
      }
      subjectPerson {
        ...Person
      }
      subjectInstrument {
        ...Instrument
      }
    }
  }
  ${RelationshipFragments.relationship}
  ${EntityFragments.audioItem}
  ${EntityFragments.person}
  ${EntityFragments.instrument}
`;

interface QueryVariables {
  entityType: EntityType;
  entityId: string;
}

const useTagsForEntity = (
  entity?: Entity
): [
  Tag[] | undefined,
  LazyQueryResult<{ tagsForEntity: Tag[] }, QueryVariables>
] => {
  const [getTagsForEntity, tagsForEntityQuery] = useLazyQuery<
    { tagsForEntity: Tag[] },
    QueryVariables
  >(TAGS_FOR_ENTITY_QUERY, {
    variables: {
      entityType: entity?.entityType,
      entityId: entity?.id,
    },
  });

  useEffect(() => {
    if (entity) {
      getTagsForEntity();
    }
  }, [getTagsForEntity, entity]);

  return [tagsForEntityQuery.data?.tagsForEntity, tagsForEntityQuery];
};

export default useTagsForEntity;
