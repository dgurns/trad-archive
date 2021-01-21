import { useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useMutation, gql } from '@apollo/client';
import useCurrentUser from 'hooks/useCurrentUser';

const LOG_OUT_MUTATION = gql`
  mutation LogOut {
    logOut
  }
`;

const Header = () => {
  const [currentUser, { loading }] = useCurrentUser();
  const [logOut, { data: logOutData }] = useMutation(LOG_OUT_MUTATION, {
    errorPolicy: 'all',
  });

  const onLogOutClicked = () => logOut();

  useEffect(() => {
    if (logOutData?.logOut) {
      window.location.reload();
    }
  }, [logOutData]);

  const userActions = useMemo(() => {
    if (loading) {
      return null;
    } else if (currentUser) {
      return (
        <div>
          <span>Hello, {currentUser.username}</span>
          <button
            className="btn-text text-current hover:text-gray-400 ml-4"
            onClick={onLogOutClicked}
          >
            Log Out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <Link href="/login">
            <a className="btn-text text-current hover:text-gray-400 ml-4">
              Log In
            </a>
          </Link>
          <Link href="/signup">
            <a className="btn text-current no-underline hover:text-current ml-4">
              Sign Up
            </a>
          </Link>
        </div>
      );
    }
  }, [loading, currentUser]);

  return (
    <div
      className="flex flex-row p-4 justify-between text-white items-center bg-teal-900"
      suppressHydrationWarning
    >
      <Link href="/">
        <a className="btn-text text-current hover:text-gray-400">
          Trad Archive
        </a>
      </Link>

      {userActions}
    </div>
  );
};

export default Header;
