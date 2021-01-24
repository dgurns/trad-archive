import { useRouter } from 'next/router';
import useCurrentUser from 'hooks/useCurrentUser';
import UserService from 'services/User';

interface Props {
  children: React.ReactElement;
}

const RequireAdmin = ({ children }: Props): React.ReactElement | null => {
  const router = useRouter();

  const [currentUser, { data, error }] = useCurrentUser();

  if (currentUser && UserService.isAdmin(currentUser)) {
    return children;
  } else if (!data && !error) {
    return <div>Checking admin permissions...</div>;
  } else if (typeof window !== 'undefined') {
    router.push({
      pathname: '/login',
      query: { redirectTo: window.location.pathname },
    });
    return null;
  }

  return null;
};

export default RequireAdmin;
