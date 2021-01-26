import { useEffect } from 'react';
import { useLazyQuery, gql, LazyQueryResult } from '@apollo/client';
import { Item } from 'types';
import { ItemFragments } from 'fragments';

export const ITEMS_QUERY = gql`
  query {
    items {
      ...AudioItem
    }
  }
  ${ItemFragments.audioItem}
`;

interface QueryData {
  items: Item[];
}

const useItems = (): [Item[] | undefined, LazyQueryResult<QueryData, {}>] => {
  const [getItems, itemsQuery] = useLazyQuery<QueryData>(ITEMS_QUERY);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return [itemsQuery.data?.items, itemsQuery];
};

export default useItems;
