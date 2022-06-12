import { useCallback } from "react";
import { useNavigate } from "@remix-run/react";

import type { User } from "~/types";
import useCurrentUser from "~/hooks/useCurrentUser";

interface RequireLoginFunctionArgs {
	redirectTo?: string;
}

interface HookReturnValue {
	requireLogin: (args?: RequireLoginFunctionArgs) => Promise<boolean>;
	currentUser: User | null | undefined;
}

// useRequireLogin returns a function that will navigate to the /login page
// and then back to the given redirect path, if specified.
const useRequireLogin = (): HookReturnValue => {
	const navigate = useNavigate();
	const [currentUser] = useCurrentUser();

	const requireLogin = useCallback(
		({ redirectTo }: RequireLoginFunctionArgs = {}): Promise<boolean> =>
			navigate({
				pathname: "/login",
				query: {
					redirectTo: redirectTo ?? window.location.pathname,
				},
			}),
		[navigate]
	);

	return { requireLogin, currentUser };
};

export default useRequireLogin;
