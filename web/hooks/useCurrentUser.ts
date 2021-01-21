import { useEffect } from 'react';
import { useLazyQuery, gql, LazyQueryResult } from '@apollo/client';
import { User } from 'types';

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
      permissions
      email
      username
    }
  }
`;

interface QueryData {
  currentUser: User;
}

const useCurrentUser = (): [
  User | null | undefined,
  LazyQueryResult<QueryData, {}>
] => {
  const [getCurrentUser, currentUserQuery] = useLazyQuery<QueryData>(
    CURRENT_USER_QUERY
  );

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return [currentUserQuery.data?.currentUser, currentUserQuery];
};

export default useCurrentUser;
