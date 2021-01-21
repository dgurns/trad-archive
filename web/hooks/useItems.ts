import { useEffect } from 'react';
import { useLazyQuery, gql, LazyQueryResult } from '@apollo/client';
import { Item } from 'types';

export const ItemsHookFragments = {
  audioItem: gql`
    fragment ItemsHookAudioItem on AudioItem {
      id
      title
      description
      addedByUser {
        id
        username
      }
      tags {
        id
      }
      createdAt
      updatedAt
      urlSource
      urlMp3
    }
  `,
};

export const ITEMS_QUERY = gql`
  query {
    items {
      ...ItemsHookAudioItem
    }
  }
  ${ItemsHookFragments.audioItem}
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
