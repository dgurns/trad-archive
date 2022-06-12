import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

const ViewAudioItemTags = () => {
	const navigate = useNavigate();
	const { slug } = navigate.query;

	useEffect(() => {
		if (slug) {
			navigate(`/entities/audio-items/${slug}`);
		}
	}, [navigate, slug]);

	return null;
};

export default ViewAudioItemTags;
