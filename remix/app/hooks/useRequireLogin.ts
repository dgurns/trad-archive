import { useLocation, useNavigate } from "@remix-run/react";
import type { User } from "@prisma/client";

import useCurrentUser from "~/hooks/useCurrentUser";

interface RequireLoginFunctionArgs {
	redirectTo?: string;
}

interface HookReturnValue {
	requireLogin: (args?: RequireLoginFunctionArgs) => void;
	currentUser: User | null | undefined;
}

// useRequireLogin returns a function that will navigate to the /login page
// and then back to the given redirect path, if specified.
const useRequireLogin = (): HookReturnValue => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [currentUser] = useCurrentUser();

	const requireLogin = ({ redirectTo }: RequireLoginFunctionArgs = {}) => {
		const params = new URLSearchParams({ redirectTo: redirectTo ?? pathname });
		navigate(`/login?${params.toString()}`);
	};

	return { requireLogin, currentUser };
};

export default useRequireLogin;
