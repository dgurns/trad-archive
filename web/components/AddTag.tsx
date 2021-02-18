import { useState, useCallback } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

import { Entity, Tag } from 'types';
import { EntityFragments } from 'fragments';

import Modal from 'components/Modal';
import LoadingBlock from 'components/LoadingBlock';
import CreateTagForm from 'components/CreateTagForm';

const PARENT_ENTITY_QUERY = gql`
  query Entity($id: String!) {
    entity(id: $id) {
      ...AudioItem
      ...Person
      ...Instrument
    }
  }
  ${EntityFragments.audioItem}
  ${EntityFragments.person}
  ${EntityFragments.instrument}
`;

interface Props {
  entity: Entity;
  onSuccess?: (tag: Tag) => void;
}
const AddTag = ({ entity, onSuccess }: Props) => {
  const [addTagModalIsVisible, setAddTagModalIsVisible] = useState(false);

  const [getParentEntity, { loading: parentEntityLoading }] = useLazyQuery<{
    entity: Entity;
  }>(PARENT_ENTITY_QUERY, {
    variables: { id: entity.id },
    fetchPolicy: 'network-only',
  });

  const refetchParentEntityAndClose = useCallback(
    async (tag: Tag) => {
      await getParentEntity();
      setAddTagModalIsVisible(false);
      if (onSuccess) {
        onSuccess(tag);
      }
    },
    [getParentEntity, setAddTagModalIsVisible, entity]
  );

  return (
    <>
      <button
        className="btn-text"
        onClick={() => setAddTagModalIsVisible(true)}
      >
        + Add Tag
      </button>

      <Modal
        title="Add Tag"
        isVisible={addTagModalIsVisible}
        onClose={() => setAddTagModalIsVisible(false)}
      >
        {parentEntityLoading ? (
          <LoadingBlock />
        ) : (
          <CreateTagForm
            entity={entity}
            onSuccess={refetchParentEntityAndClose}
          />
        )}
      </Modal>
    </>
  );
};

export default AddTag;
