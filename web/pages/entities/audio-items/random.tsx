import { useEffect } from "react";
import { useRouter } from "next/router";

import useAudioItemRandom from "hooks/useAudioItemRandom";
import EntityService from "services/Entity";

import Layout from "components/Layout";
import LoadingBlock from "components/LoadingBlock";

const AudioItemRandom = () => {
	const [audioItemRandom, { loading, error }] = useAudioItemRandom();
	const router = useRouter();

	useEffect(() => {
		if (audioItemRandom) {
			router.push(EntityService.makeHrefForView(audioItemRandom));
		}
	}, [audioItemRandom]);

	return (
		<Layout>
			{loading && <LoadingBlock />}
			{error && (
				<div className="text-red-600">
					Error fetching random Audio Item. Please reload the page.
				</div>
			)}
		</Layout>
	);
};

export default AudioItemRandom;
