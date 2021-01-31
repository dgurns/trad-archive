import { useMemo } from 'react';
import Link from 'next/link';
import useCurrentUser from 'hooks/useCurrentUser';
import UserService from 'services/User';

const Header = () => {
  const [currentUser, { loading }] = useCurrentUser();

  const userActions = useMemo(() => {
    if (loading) {
      return null;
    } else if (currentUser) {
      return (
        <div className="flex flex-row">
          <div className="hidden sm:flex">Hello, {currentUser.username}</div>
          {UserService.isAdmin(currentUser) && (
            <Link href="/admin">
              <a className="btn-text text-current hover:text-gray-400 ml-4">
                Admin
              </a>
            </Link>
          )}
          <Link href="/logout">
            <a className="btn-text text-current hover:text-gray-400 ml-4">
              Log out
            </a>
          </Link>
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
