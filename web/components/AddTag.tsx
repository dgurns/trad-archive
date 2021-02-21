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
      ...Place
    }
  }
  ${EntityFragments.audioItem}
  ${EntityFragments.person}
  ${EntityFragments.instrument}
  ${EntityFragments.place}
`;

interface Props {
  entity: Entity;
  onSuccess?: (tag: Tag) => void;
  className?: string;
  children?: React.ReactChild | React.ReactChild[];
}
const AddTag = ({ entity, onSuccess, className, children }: Props) => {
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
        className={`btn-text ${className ?? ''}`}
        onClick={() => setAddTagModalIsVisible(true)}
      >
        {children ?? '+ Add Tag'}
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
