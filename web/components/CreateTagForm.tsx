import { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

import { Entity, EntityType, Tag, Relationship } from 'types';
import { RelationshipFragments } from 'fragments';

import SearchEntities from 'components/SearchEntities';
import LoadingCircle from './LoadingCircle';

const SEARCH_RELATIONSHIPS_QUERY = gql`
  query SearchRelationships(
    $subjectEntityType: String!
    $objectEntityType: String!
  ) {
    searchRelationships(
      subjectEntityType: $subjectEntityType
      objectEntityType: $objectEntityType
    ) {
      ...Relationship
    }
  }
  ${RelationshipFragments.relationship}
`;
const CREATE_TAG_MUTATION = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
    }
  }
`;

interface CreateTagInput {
  relationshipId: string;
  subjectEntityType: EntityType;
  subjectEntityId: string;
  objectEntityType: EntityType;
  objectEntityId: string;
}
interface Props {
  entity: Entity;
  onSuccess: (tag: Tag) => void;
}
const CreateTagForm = ({ entity, onSuccess }: Props) => {
  const [error, setError] = useState('');

  const [selectedEntity, setSelectedEntity] = useState<Entity>(null);
  const [selectedRelationshipId, setSelectedRelationshipId] = useState('');

  const {
    loading: relationshipsLoading,
    data: relationshipsData,
    error: relationshipsError,
  } = useQuery<{ searchRelationships: Relationship[] }>(
    SEARCH_RELATIONSHIPS_QUERY,
    {
      variables: {
        subjectEntityType: entity.entityType,
        objectEntityType: selectedEntity?.entityType,
      },
      skip: !selectedEntity,
    }
  );

  useEffect(() => {
    if (relationshipsError) {
      setError(relationshipsError.message);
    }
  }, [relationshipsError, setError]);

  const [
    createTag,
    { loading: createTagLoading, data: createTagData, error: createTagError },
  ] = useMutation<{ createTag: Tag }, { input: CreateTagInput }>(
    CREATE_TAG_MUTATION,
    {
      errorPolicy: 'all',
    }
  );

  // Once Tag has been created, call onSuccess prop
  useEffect(() => {
    if (createTagData?.createTag) {
      onSuccess(createTagData.createTag);
    }
  }, [createTagData]);

  useEffect(() => {
    if (createTagError) {
      setError(createTagError.message);
    }
  }, [createTagError, setError]);

  return (
    <>
      {!selectedEntity ? (
        <>
          <div className="mb-4">
            <SearchEntities onSelect={setSelectedEntity} />
          </div>
          <div className="ml-2 text-gray-500">
            Can't find it? <button className="btn-text">Create New</button>
          </div>
        </>
      ) : (
        <>
          <div className="font-bold mb-4">
            What is the relationship between these two entities?
          </div>
          <div className="mb-2">
            <span className="text-sm uppercase text-gray-500 pr-2">
              {entity.entityType}
            </span>
            {entity.name}
          </div>
          {relationshipsLoading ? (
            <LoadingCircle />
          ) : (
            <select className="mb-2">
              {relationshipsData.searchRelationships?.map(
                (relationship, index) => (
                  <option key={index}>{relationship.name}</option>
                )
              )}
            </select>
          )}
          <div>
            <span className="text-sm uppercase text-gray-500 pr-2">
              {selectedEntity.entityType}
            </span>
            {selectedEntity.name}
          </div>
        </>
      )}
    </>
  );
};

export default CreateTagForm;
