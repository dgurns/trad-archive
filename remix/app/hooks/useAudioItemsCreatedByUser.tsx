import { useEffect } from 'react';
import { useLazyQuery, gql, LazyQueryResult } from '@apollo/client';
import { User, AudioItem } from 'types';
import { EntityFragments } from 'fragments';

export const AUDIO_ITEMS_CREATED_BY_USER_QUERY = gql`
  query AudioItemsCreatedByUser($input: AudioItemsCreatedByUserInput!) {
    audioItemsCreatedByUser(input: $input) {
      ...AudioItem
    }
  }
  ${EntityFragments.audioItem}
`;

interface QueryData {
  audioItemsCreatedByUser?: AudioItem[];
}
interface QueryVariables {
  input: {
    userId: string;
    take?: number;
    skip?: number;
  };
}

const useAudioItemsCreatedByUser = (
  user?: User
): [AudioItem[] | undefined, LazyQueryResult<QueryData, QueryVariables>] => {
  const [makeQuery, query] = useLazyQuery<QueryData, QueryVariables>(
    AUDIO_ITEMS_CREATED_BY_USER_QUERY,
    {
      variables: {
        input: {
          userId: user?.id,
        },
      },
    }
  );

  useEffect(() => {
    if (user) {
      makeQuery();
    }
  }, [makeQuery, user]);

  const audioItems = query.data?.audioItemsCreatedByUser;

  return [audioItems, query];
};

export default useAudioItemsCreatedByUser;
