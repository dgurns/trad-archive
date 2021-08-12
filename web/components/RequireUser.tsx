import { useRouter } from "next/router";
import useCurrentUser from "hooks/useCurrentUser";

interface Props {
	children: React.ReactNode | React.ReactNode[];
	requireUserId?: string;
}

const RequireUser = ({
	children,
	requireUserId,
}: Props): React.ReactElement | null => {
	const router = useRouter();

	const [currentUser, { data, error }] = useCurrentUser();

	if (!data && !error) {
		return <div>Checking for logged-in user...</div>;
	} else if (requireUserId && currentUser?.id !== requireUserId) {
		return <div>You do not have access to this page</div>;
	} else if (currentUser) {
		return <>{children}</>;
	} else if (typeof window !== "undefined") {
		router.push({
			pathname: "/login",
			query: { redirectTo: window.location.pathname },
		});
		return null;
	}

	return null;
};

export default RequireUser;
