import { useEffect, useState, useCallback, ChangeEvent } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import debounce from 'lodash/debounce';

import { Entity } from 'types';
import { EntityFragments } from 'fragments';

import LoadingCircle from 'components/LoadingCircle';

const SEARCH_ENTITIES_QUERY = gql`
  query SearchEntities($input: SearchEntitiesInput!) {
    searchEntities(input: $input) {
      ...AudioItem
      ...Person
      ...Instrument
    }
  }
  ${EntityFragments.audioItem}
  ${EntityFragments.person}
  ${EntityFragments.instrument}
`;

interface QueryData {
  searchEntities: Entity[];
}
interface QueryVariables {
  input: {
    searchTerm: string;
    take?: number;
  };
}
interface Props {
  onResults?: (entities: Entity[]) => void;
  onSelect: (entity: Entity) => void;
}
const SearchEntities = ({ onResults, onSelect }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const onChangeSearchTerm = (event: ChangeEvent<HTMLInputElement>) => {
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
  ] = useLazyQuery<QueryData, QueryVariables>(SEARCH_ENTITIES_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const debouncedSearchEntities = useCallback(
    debounce(searchEntities, 500, { leading: true }),
    [searchEntities]
  );

  useEffect(() => {
    if (onResults && searchEntitiesData?.searchEntities) {
      onResults(searchEntitiesData.searchEntities);
    }
  }, [searchEntitiesData, onResults]);

  useEffect(() => {
    if (searchTerm && searchTerm.length >= 3) {
      debouncedSearchEntities({ variables: { input: { searchTerm } } });
    }
  }, [searchTerm]);

  const shouldShowResults =
    searchTerm.length >= 3 &&
    !searchEntitiesLoading &&
    searchEntitiesData &&
    !searchEntitiesError;

  return (
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
          <ul className="mt-4 max-h-40">
            {searchEntitiesData.searchEntities.map((entity, index) => (
              <li
                className="flex flex-row justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-200"
                onClick={() => onSelect(entity)}
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
        </>
      )}
      {searchEntitiesError && (
        <div className="text-red-600 m-2">Error fetching results</div>
      )}
    </>
  );
};

export default SearchEntities;
