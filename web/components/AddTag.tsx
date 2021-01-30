import { useEffect, useState, useCallback } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import Link from 'next/link';
import debounce from 'lodash/debounce';
import { Entity, Item } from 'types';
import { EntityFragments } from 'fragments';
import Modal from 'components/Modal';

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

interface SearchEntitiesResult {
  searchEntities: Entity[];
}
interface AddTagProps {
  item: Item;
}
const AddTag = ({ item }: AddTagProps) => {
  const [addTagModalIsVisible, setAddTagModalIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [
    searchEntities,
    { loading, data, error },
  ] = useLazyQuery<SearchEntitiesResult>(SEARCH_ENTITIES_QUERY);
  const debouncedSearchEntities = useCallback(debounce(searchEntities, 300), [
    searchEntities,
  ]);

  useEffect(() => {
    if (searchTerm && searchTerm.length >= 3) {
      debouncedSearchEntities({ variables: { searchTerm } });
    }
  }, [searchTerm]);

  const shouldShowResults =
    searchTerm.length >= 3 && !loading && data && !error;

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
        <div className="relative">
          <input
            autoFocus
            placeholder="Start typing..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          {loading && (
            <i className="material-icons absolute top-2 right-2 animate-spin text-gray-500">
              scatter_plot
            </i>
          )}
        </div>
        {shouldShowResults && (
          <>
            <ul className="mb-2 mt-4 max-h-40">
              {data.searchEntities.map((entity, index) => (
                <li
                  className="flex flex-row justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-200"
                  key={index}
                >
                  <span>{entity.name}</span>
                  <span className="uppercase text-gray-500 text-sm">
                    {entity.entityType}
                  </span>
                </li>
              ))}
            </ul>
            {data.searchEntities.length === 0 && (
              <div className="block text-gray-500 m-2">No results</div>
            )}
            <div className="ml-2 mt-4 text-gray-500">
              Don't see it?{' '}
              <button className="btn-text">Create New Entity</button>
            </div>
          </>
        )}
        {error && (
          <div className="text-red-600 ml-2 mt-4">Error fetching results</div>
        )}
      </Modal>
    </>
  );
};

export default AddTag;
