import { useEffect, useState, useCallback } from 'react';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import debounce from 'lodash/debounce';
import { Entity, EntityType, Item, ItemType, Tag } from 'types';
import { EntityFragments, ItemFragments } from 'fragments';
import Modal from 'components/Modal';
import Loading from 'components/Loading';

const SEARCH_ENTITIES_QUERY = gql`
  query SearchEntities($searchTerm: String!) {
    searchEntities(searchTerm: $searchTerm) {
      ...PersonEntity
      ...PlaceEntity
      ...InstrumentEntity
      ...TuneEntity
    }
  }
  ${EntityFragments.personEntity}
  ${EntityFragments.placeEntity}
  ${EntityFragments.instrumentEntity}
  ${EntityFragments.tuneEntity}
`;
const CREATE_TAG_MUTATION = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
    }
  }
`;
const ITEM_QUERY = gql`
  query Item($id: String!) {
    item(id: $id) {
      ...AudioItem
    }
  }
  ${ItemFragments.audioItem}
`;

interface CreateTagInput {
  itemType: ItemType;
  itemId: string;
  entityType: EntityType;
  entityId: string;
}
interface AddTagProps {
  item: Item;
}
const AddTag = ({ item }: AddTagProps) => {
  const [addTagModalIsVisible, setAddTagModalIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
  const debouncedSearchEntities = useCallback(debounce(searchEntities, 300), [
    searchEntities,
  ]);

  useEffect(() => {
    if (searchTerm && searchTerm.length >= 3) {
      debouncedSearchEntities({ variables: { searchTerm } });
    }
  }, [searchTerm]);

  const [
    createTag,
    { loading: createTagLoading, data: createTagData },
  ] = useMutation<{ createTag: Tag }, { input: CreateTagInput }>(
    CREATE_TAG_MUTATION,
    {
      errorPolicy: 'all',
    }
  );

  const [getItem, { loading: getItemLoading }] = useLazyQuery<{
    getItem: Item;
  }>(ITEM_QUERY, { variables: { id: item.id } });

  const onTagResultClicked = useCallback(
    (entity: Entity) => {
      const input = {
        itemType: item.type,
        itemId: item.id,
        entityType: entity.type,
        entityId: entity.id,
      };
      createTag({ variables: { input } });
    },
    [item, createTag]
  );

  const refetchItemAndClose = useCallback(async () => {
    await getItem();
    setAddTagModalIsVisible(false);
  }, [getItem, setAddTagModalIsVisible, item]);

  useEffect(() => {
    if (createTagData?.createTag) {
      refetchItemAndClose();
    }
  }, [createTagData, refetchItemAndClose]);

  const shouldShowLoading = createTagLoading || getItemLoading;
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
          <Loading />
        ) : (
          <>
            <div className="relative">
              <input
                autoFocus
                placeholder="Start typing..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              {searchEntitiesLoading && (
                <i className="material-icons absolute top-2 right-2 animate-spin text-gray-500">
                  scatter_plot
                </i>
              )}
            </div>
            {shouldShowResults && (
              <>
                <ul className="mb-2 mt-4 max-h-40">
                  {searchEntitiesData.searchEntities.map((entity, index) => (
                    <li
                      className="flex flex-row justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-200"
                      onClick={() => onTagResultClicked(entity)}
                      key={index}
                    >
                      <span>{entity.name}</span>
                      <span className="uppercase text-gray-500 text-sm">
                        {entity.type}
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
