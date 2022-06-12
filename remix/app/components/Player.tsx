import { useMemo } from "react";
import { Link } from "@remix-run/react";

import usePlayerContext from "~/hooks/usePlayerContext";
import { isAudioItem } from "~/types";

import AudioPlayer from "~/components/AudioPlayer";

const Player = () => {
	const { activeAudioItem, setActiveAudioItem } = usePlayerContext();

	if (!activeAudioItem) {
		return null;
	}

	const itemHref = useMemo(() => {
		if (isAudioItem(activeAudioItem)) {
			return `/entities/audio-items/${activeAudioItem.slug}`;
		}
		return window.location.href;
	}, [activeAudioItem]);

	return (
		<div className="flex flex-col align-center justify-center px-4 pb-4 pt-2 bg-white">
			<div className="flex flex-row justify-between mb-2">
				<div className="leading-8">
					Now playing:{" "}
					<span className="text-gray-500">{activeAudioItem.name}</span>
				</div>
				<div className="flex flex-row items-center ml-4">
					<Link to={itemHref}>
						<a className="whitespace-nowrap">View</a>
					</Link>
					<button
						className="btn-icon flex ml-2 md:ml-4"
						onClick={() => setActiveAudioItem(null)}
					>
						<i className="material-icons">close</i>
					</button>
				</div>
			</div>

			<AudioPlayer item={activeAudioItem} key={activeAudioItem.id} />
		</div>
	);
};

export default Player;
