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
  const [
    shouldCreateInverseRelationship,
    setShouldCreateInverseRelationship,
  ] = useState(false);
  const [
    selectedInverseRelationshipId,
    setSelectedInverseRelationshipId,
  ] = useState('');

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

  const onSelectEntity = useCallback(
    (selectedEntityFromResults: Entity) => {
      if (selectedEntityFromResults.id === entity.id) {
        return window.alert('Cannot tag an entity with itself');
      }
      setSelectedEntity(selectedEntityFromResults);
    },
    [entity]
  );

  const onNewEntityCreated = useCallback((entity: Entity) => {
    setSelectedEntity(entity);
  }, []);

  const onSelectRelationship = useCallback(
    (relationshipId: string) => {
      setSelectedRelationshipId(relationshipId);
    },
    [setSelectedRelationshipId]
  );

  const onSelectInverseRelationship = useCallback(
    (relationshipId: string) => {
      setSelectedInverseRelationshipId(relationshipId);
    },
    [setSelectedInverseRelationshipId]
  );

  const onCreateTagClicked = useCallback(async () => {
    const tagInput = {
      relationshipId: selectedRelationshipId,
      subjectEntityType: entity.entityType,
      subjectEntityId: entity.id,
      objectEntityType: selectedEntity.entityType,
      objectEntityId: selectedEntity.id,
    };
    createTag({ variables: { input: tagInput } });

    if (shouldCreateInverseRelationship && selectedInverseRelationshipId) {
      const inverseTagInput = {
        relationshipId: selectedInverseRelationshipId,
        subjectEntityType: selectedEntity.entityType,
        subjectEntityId: selectedEntity.id,
        objectEntityType: entity.entityType,
        objectEntityId: entity.id,
      };
      createTag({ variables: { input: inverseTagInput } });
    }
  }, [
    selectedRelationshipId,
    selectedInverseRelationshipId,
    entity,
    selectedEntity,
    createTag,
  ]);

  return (
    <>
      {!selectedEntity ? (
        <>
          <SearchEntities
            onSelect={onSelectEntity}
            onNewEntityCreated={onNewEntityCreated}
          />
        </>
      ) : (
        <>
          <div className="mb-6 text-gray-500">
            What is the relationship between these two entities?
          </div>
          <SelectRelationship
            subjectEntity={entity}
            objectEntity={selectedEntity}
            onSelect={onSelectRelationship}
          />
          {selectedRelationshipId && (
            <div className="mt-6 flex flex-row items-center justify-start">
              <input
                type="checkbox"
                id="reverse-relationship"
                checked={shouldCreateInverseRelationship}
                onChange={(event) =>
                  setShouldCreateInverseRelationship(event.target.checked)
                }
              />
              <label
                htmlFor="reverse-relationship"
                className="ml-2 text-gray-500"
              >
                Also create the inverse relationship
              </label>
            </div>
          )}
          {shouldCreateInverseRelationship && (
            <div className="mt-6">
              <SelectRelationship
                subjectEntity={selectedEntity}
                objectEntity={entity}
                onSelect={onSelectInverseRelationship}
              />
            </div>
          )}
          <button
            className="btn mt-8"
            onClick={onCreateTagClicked}
            disabled={loading || !selectedRelationshipId}
          >
            Save
          </button>
          {error && <div className="text-red-600 mt-4">{error.message}</div>}
        </>
      )}
    </>
  );
};

export default CreateTagForm;
