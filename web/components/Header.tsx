import { useMemo } from 'react';
import Link from 'next/link';
import useCurrentUser from 'hooks/useCurrentUser';

const Header = () => {
  const [currentUser, { loading }] = useCurrentUser();

  const userArea = useMemo(() => {
    if (loading) {
      return null;
    } else if (currentUser) {
      return <span>Hello, {currentUser.username}</span>;
    } else {
      return (
        <>
          <Link href="/login">Log In</Link>
          <Link href="/signup">
            <a className="btn ml-4">Sign Up</a>
          </Link>
        </>
      );
    }
  }, [loading, currentUser]);

  return (
    <div className="flex flex-row p-4 justify-between text-white items-center bg-teal-900">
      <Link href="/">Trad Archive</Link>

      <div>{userArea}</div>
    </div>
  );
};

export default Header;
