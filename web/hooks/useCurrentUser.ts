import { useEffect } from 'react';
import { useLazyQuery, gql, LazyQueryResult } from '@apollo/client';
import { User } from 'types';

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
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
  User | undefined,
  LazyQueryResult<QueryData, {}>
] => {
  let jwtCookie;
  if (process.browser) {
    jwtCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)user-jwt\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
  }

  // TODO: If cookie is present, fire getCurrentUser query

  const [getCurrentUser, currentUserQuery] = useLazyQuery<QueryData>(
    CURRENT_USER_QUERY
  );

  const { data } = currentUserQuery;
  const currentUser = data?.currentUser;

  return [currentUser, currentUserQuery];
};

export default useCurrentUser;
