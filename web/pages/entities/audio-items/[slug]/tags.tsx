import { useEffect } from "react";
import { useRouter } from "next/router";

const ViewAudioItemTags = () => {
	const router = useRouter();
	const { slug } = router.query;

	useEffect(() => {
		if (slug) {
			router.push(`/entities/audio-items/${slug}`);
		}
	}, [router, slug]);

	return null;
};

export default ViewAudioItemTags;
