import { useEffect, useState, useCallback } from 'react';
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';
import debounce from 'lodash/debounce';

import { Entity, EntityType, Tag } from 'types';
import { EntityFragments, RelationshipFragments } from 'fragments';

import Modal from 'components/Modal';
import LoadingBlock from 'components/LoadingBlock';
import LoadingCircle from 'components/LoadingCircle';

const SEARCH_ENTITIES_QUERY = gql`
  query SearchEntities($searchTerm: String!) {
    searchEntities(searchTerm: $searchTerm) {
      ...AudioItem
      ...Person
      ...Instrument
    }
  }
  ${EntityFragments.audioItem}
  ${EntityFragments.person}
  ${EntityFragments.instrument}
`;
const SEARCH_RELATIONSHIPS_QUERY = gql`
  query SearchRelationships($subjectEntityType: String!) {
    ...Relationship
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

interface CreateTagInput {
  relationshipId: string;
  subjectEntityType: EntityType;
  subjectEntityId: string;
  objectEntityType: EntityType;
  objectEntityId: string;
}
interface AddTagProps {
  entity: Entity;
}
const AddTag = ({ entity }: AddTagProps) => {
  const [addTagModalIsVisible, setAddTagModalIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const [selectedEntity, setSelectedEntity] = useState<Entity>(null);
  const [selectedRelationshipId, setSelectedRelationshipId] = useState('');

  const {
    loading: relationshipsLoading,
    data: relationshipsData,
    error: relationshipsError,
  } = useQuery(SEARCH_RELATIONSHIPS_QUERY, {
    variables: { subjectEntityType: entity.entityType },
  });

  useEffect(() => {
    if (relationshipsError) {
      setError(relationshipsError.message);
    }
  }, [relationshipsError, setError]);

  const onChangeSearchTerm = (event) => {
    setError('');
    setSearchTerm(event.target.value);
  };

  const [
    searchEntities,
    {
      loading: searchEntitiesLoading,
      data: searchEntitiesData,
      error: searchEntitiesError,
    },
  ] = useLazyQuery<{
    searchEntities: Entity[];
  }>(SEARCH_ENTITIES_QUERY);
  const debouncedSearchEntities = useCallback(
    debounce(searchEntities, 500, { leading: true }),
    [searchEntities]
  );

  useEffect(() => {
    if (searchTerm && searchTerm.length >= 3) {
      debouncedSearchEntities({ variables: { searchTerm } });
    }
  }, [searchTerm]);

  const [
    createTag,
    { loading: createTagLoading, data: createTagData, error: createTagError },
  ] = useMutation<{ createTag: Tag }, { input: CreateTagInput }>(
    CREATE_TAG_MUTATION,
    {
      errorPolicy: 'all',
    }
  );

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

  // Once Tag has been created, refetch the parent Entity and close the modal
  useEffect(() => {
    if (createTagData?.createTag) {
      refetchParentEntityAndClose();
    }
  }, [createTagData, refetchParentEntityAndClose]);

  useEffect(() => {
    if (createTagError) {
      setError(createTagError.message);
    }
  }, [createTagError, setError]);

  const shouldShowLoading = createTagLoading || getParentEntityLoading;
  const shouldShowResults =
    searchTerm.length >= 3 &&
    !searchEntitiesLoading &&
    searchEntitiesData &&
    !searchEntitiesError;

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
        {shouldShowLoading ? (
          <LoadingBlock />
        ) : (
          <>
            <div className="relative">
              <input
                autoFocus
                placeholder="Start typing..."
                value={searchTerm}
                onChange={onChangeSearchTerm}
              />
              {searchEntitiesLoading && (
                <div className="absolute top-2 right-2">
                  <LoadingCircle />
                </div>
              )}
            </div>

            {error && <div className="text-red-600 mt-4 ml-2">{error}</div>}

            {shouldShowResults && (
              <>
                <ul className="mb-2 mt-4 max-h-40">
                  {searchEntitiesData.searchEntities.map((entity, index) => (
                    <li
                      className="flex flex-row justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-200"
                      onClick={() => setSelectedEntity(entity)}
                      key={index}
                    >
                      <span>{entity.name}</span>
                      <span className="uppercase text-gray-500 text-sm">
                        {entity.entityType}
                      </span>
                    </li>
                  ))}
                </ul>
                {searchEntitiesData.searchEntities.length === 0 && (
                  <div className="block text-gray-500 m-2">No results</div>
                )}
                <div className="ml-2 mt-4 text-gray-500">
                  Don't see it? <button className="btn-text">Create New</button>
                </div>
              </>
            )}
            {searchEntitiesError && (
              <div className="text-red-600 ml-2 mt-4">
                Error fetching results
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default AddTag;
