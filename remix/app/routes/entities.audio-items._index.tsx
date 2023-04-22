import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

const ViewAudioItems = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/");
	}, [navigate]);

	return null;
};

export default ViewAudioItems;
