import { useEffect } from 'react';
import { useLazyQuery, gql, LazyQueryResult } from '@apollo/client';
import { AudioItem } from 'types';
import { EntityFragments } from 'fragments';

export const AUDIO_ITEMS_QUERY = gql`
  query {
    audioItems {
      ...AudioItem
    }
  }
  ${EntityFragments.audioItem}
`;

interface QueryData {
  audioItems: AudioItem[];
}

const useAudioItems = (): [
  AudioItem[] | undefined,
  LazyQueryResult<QueryData, {}>
] => {
  const [getAudioItems, audioItemsQuery] = useLazyQuery<QueryData>(
    AUDIO_ITEMS_QUERY
  );

  useEffect(() => {
    getAudioItems();
  }, [getAudioItems]);

  return [audioItemsQuery.data?.audioItems, audioItemsQuery];
};

export default useAudioItems;
