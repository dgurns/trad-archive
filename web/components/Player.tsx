import { useMemo } from "react";
import Link from "next/link";

import usePlayerContext from "hooks/usePlayerContext";
import { isAudioItem } from "types";

import AudioPlayer from "components/AudioPlayer";

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
		<div className="flex flex-col align-center justify-center p-4 bg-white">
			<div className="flex flex-row justify-between mb-3">
				<div className="leading-7">
					Now playing:{" "}
					<span className="text-gray-500">{activeAudioItem.name}</span>
				</div>
				<div className="flex flex-row items-center ml-4">
					<Link href={itemHref}>
						<a className="whitespace-nowrap">View Details</a>
					</Link>
					<button
						className="btn-icon flex ml-4"
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
