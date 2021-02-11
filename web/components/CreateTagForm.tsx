import { useEffect, useState, useCallback } from 'react';
import { useMutation, gql } from '@apollo/client';

import { Entity, EntityType, Tag } from 'types';

import SearchEntities from 'components/SearchEntities';
import SelectRelationship from 'components/SelectRelationship';

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
  const [selectedEntity, setSelectedEntity] = useState<Entity>(null);
  const [selectedRelationshipId, setSelectedRelationshipId] = useState('');

  const [createTag, { loading, data, error }] = useMutation<
    { createTag: Tag },
    { input: CreateTagInput }
  >(CREATE_TAG_MUTATION, {
    errorPolicy: 'all',
  });

  // Once Tag has been created, call onSuccess prop
  useEffect(() => {
    if (data?.createTag) {
      onSuccess(data.createTag);
    }
  }, [data]);

  const onSelectRelationship = useCallback((relationshipId: string) => {
    setSelectedRelationshipId(relationshipId);
  }, []);

  const onAddTagClicked = useCallback(() => {
    const input = {
      relationshipId: selectedRelationshipId,
      subjectEntityType: entity.entityType,
      subjectEntityId: entity.id,
      objectEntityType: selectedEntity.entityType,
      objectEntityId: selectedEntity.id,
    };
    createTag({ variables: { input } });
  }, [selectedRelationshipId, entity, selectedEntity, createTag]);

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
          <div className="mb-4">
            What is the relationship between these two entities?
          </div>
          <SelectRelationship
            subjectEntity={entity}
            objectEntity={selectedEntity}
            onSelect={onSelectRelationship}
          />
          <button
            className="btn mt-4"
            onClick={onAddTagClicked}
            disabled={loading}
          >
            Add Tag
          </button>
          {error && <div className="text-red-600 mt-4">{error.message}</div>}
        </>
      )}
    </>
  );
};

export default CreateTagForm;
