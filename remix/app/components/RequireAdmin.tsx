import { useNavigate } from "@remix-run/react";
import useCurrentUser from "~/hooks/useCurrentUser";
import UserService from "~/services/User";

interface Props {
	children: React.ReactNode | React.ReactNode[];
}

const RequireAdmin = ({ children }: Props): React.ReactElement | null => {
	const navigate = useNavigate();

	const [currentUser, { data, error }] = useCurrentUser();

	if (currentUser && UserService.isAdmin(currentUser)) {
		return <>{children}</>;
	} else if (!data && !error) {
		return <div>Checking admin permissions...</div>;
	} else if (typeof window !== "undefined") {
		navigate({
			pathname: "/login",
			query: { redirectTo: window.location.pathname },
		});
		return null;
	}

	return null;
};

export default RequireAdmin;
