import { useEffect, useState, useCallback } from 'react';
import { useMutation, gql } from '@apollo/client';

import { Entity, EntityType, Person, Instrument, Tag } from 'types';

import SearchEntities from 'components/SearchEntities';
import SelectRelationship from 'components/SelectRelationship';
import Modal from 'components/Modal';
import CreatePersonForm from 'components/CreatePersonForm';
import CreateInstrumentForm from 'components/CreateInstrumentForm';

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
  const [searchEntitiesResults, setSearchEntitiesResults] = useState<
    Entity[] | undefined
  >();
  const [selectedEntity, setSelectedEntity] = useState<Entity>(null);
  const [selectedRelationshipId, setSelectedRelationshipId] = useState('');

  const [createPersonModalIsVisible, setCreatePersonModalIsVisible] = useState(
    false
  );
  const [
    createInstrumentModalIsVisible,
    setCreateInstrumentModalIsVisible,
  ] = useState(false);

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

  const onSearchEntitiesResults = useCallback((entities: Entity[]) => {
    setSearchEntitiesResults(entities);
  }, []);

  const onSelectEntity = useCallback(
    (selectedEntityFromResults: Entity) => {
      if (selectedEntityFromResults.id === entity.id) {
        return window.alert('Cannot tag an entity with itself');
      }
      setSelectedEntity(selectedEntityFromResults);
    },
    [entity]
  );

  const onNewPersonCreated = useCallback((person: Person) => {
    setCreatePersonModalIsVisible(false);
    setSelectedEntity(person);
  }, []);

  const onNewInstrumentCreated = useCallback((instrument: Instrument) => {
    setCreateInstrumentModalIsVisible(false);
    setSelectedEntity(instrument);
  }, []);

  const onSelectRelationship = useCallback(
    (relationshipId: string) => {
      setSelectedRelationshipId(relationshipId);
    },
    [setSelectedRelationshipId]
  );

  const onCreateTagClicked = useCallback(() => {
    const input = {
      relationshipId: selectedRelationshipId,
      subjectEntityType: entity.entityType,
      subjectEntityId: entity.id,
      objectEntityType: selectedEntity.entityType,
      objectEntityId: selectedEntity.id,
    };
    createTag({ variables: { input } });
  }, [selectedRelationshipId, entity, selectedEntity, createTag]);

  const shouldShowCreateNewPrompt = Boolean(searchEntitiesResults);

  return (
    <>
      {!selectedEntity ? (
        <>
          <SearchEntities
            onResults={onSearchEntitiesResults}
            onSelect={onSelectEntity}
          />
          {shouldShowCreateNewPrompt && (
            <div className="mt-4 ml-2 text-gray-500">
              Can't find it? Create new:{' '}
              <button
                className="btn-text"
                onClick={() => setCreatePersonModalIsVisible(true)}
              >
                Person
              </button>
              {', '}
              <button
                className="btn-text"
                onClick={() => setCreateInstrumentModalIsVisible(true)}
              >
                Instrument
              </button>
            </div>
          )}
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
            onClick={onCreateTagClicked}
            disabled={loading || !selectedRelationshipId}
          >
            Save
          </button>
          {error && <div className="text-red-600 mt-4">{error.message}</div>}
        </>
      )}

      <Modal
        title="Create New Person"
        isVisible={createPersonModalIsVisible}
        onClose={() => setCreatePersonModalIsVisible(false)}
      >
        <CreatePersonForm onSuccess={onNewPersonCreated} />
      </Modal>

      <Modal
        title="Create New Instrument"
        isVisible={createInstrumentModalIsVisible}
        onClose={() => setCreateInstrumentModalIsVisible(false)}
      >
        <CreateInstrumentForm onSuccess={onNewInstrumentCreated} />
      </Modal>
    </>
  );
};

export default CreateTagForm;
