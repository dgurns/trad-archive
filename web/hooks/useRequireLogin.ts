import { useCallback } from 'react';
import { useRouter } from 'next/router';

import { User } from 'types';
import useCurrentUser from 'hooks/useCurrentUser';

interface RequireLoginFunctionArgs {
  redirectTo?: string;
}

interface HookReturnValue {
  requireLogin: (args?: RequireLoginFunctionArgs) => Promise<boolean>;
  currentUser: User | null | undefined;
}

// useRequireLogin returns a function that will redirect to the /login page if
// the user is not currently logged in. The function returns a boolean
// indicating whether login is required.
const useRequireLogin = (): HookReturnValue => {
  const router = useRouter();
  const [currentUser] = useCurrentUser();

  const requireLogin = useCallback(
    ({ redirectTo }: RequireLoginFunctionArgs = {}): Promise<boolean> =>
      router.push({
        pathname: '/login',
        query: {
          redirectTo: redirectTo ?? window.location.pathname,
        },
      }),
    [router]
  );

  return { requireLogin, currentUser };
};

export default useRequireLogin;
