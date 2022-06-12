import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { useMutation, gql } from "@apollo/client";
import Layout from "~/components/Layout";

const LOG_OUT_MUTATION = gql`
	mutation LogOut {
		logOut
	}
`;

const LogOut = () => {
	const navigate = useNavigate();

	const [logOut, { data: logOutData }] = useMutation(LOG_OUT_MUTATION, {
		errorPolicy: "all",
	});

	useEffect(() => {
		logOut();
	}, [logOut]);

	useEffect(() => {
		if (logOutData?.logOut) {
			window.location.href = window.location.origin;
		}
	}, [logOutData]);

	return (
		<Layout>
			<span className="text-gray-500">Logging out...</span>
		</Layout>
	);
};

export default LogOut;
