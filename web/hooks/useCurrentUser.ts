import { useQuery, gql, QueryResult } from '@apollo/client';
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

const useCurrentUser = (): [User | undefined, QueryResult<QueryData, {}>] => {
  const currentUserQuery = useQuery<QueryData>(CURRENT_USER_QUERY);

  return [currentUserQuery.data?.currentUser, currentUserQuery];
};

export default useCurrentUser;
