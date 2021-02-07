import { useState, useCallback } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

import { Entity } from 'types';
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
}
const AddTag = ({ entity }: Props) => {
  const [addTagModalIsVisible, setAddTagModalIsVisible] = useState(false);

  const [getParentEntity, { loading: getParentEntityLoading }] = useLazyQuery<{
    entity: Entity;
  }>(PARENT_ENTITY_QUERY, {
    variables: { id: entity.id },
    fetchPolicy: 'network-only',
  });

  const refetchParentEntityAndClose = useCallback(async () => {
    await getParentEntity();
    setAddTagModalIsVisible(false);
  }, [getParentEntity, setAddTagModalIsVisible, entity]);

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
        {getParentEntityLoading ? (
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
