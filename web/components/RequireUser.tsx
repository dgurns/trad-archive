import { useRouter } from 'next/router';
import useCurrentUser from 'hooks/useCurrentUser';

interface Props {
  children: React.ReactElement;
}

const RequireUser = ({ children }: Props): React.ReactElement | null => {
  const router = useRouter();

  const [currentUser, { data, error }] = useCurrentUser();

  if (currentUser) {
    return children;
  } else if (!data && !error) {
    return <div>Checking for logged-in user...</div>;
  } else if (typeof window !== 'undefined') {
    router.push({
      pathname: '/login',
      query: { redirectTo: window.location.pathname },
    });
    return null;
  }

  return null;
};

export default RequireUser;
