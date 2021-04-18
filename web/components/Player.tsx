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
		<div className="flex flex-col align-center justify-center p-4 pt-3 bg-white align-center">
			<div className="flex flex-row justify-between items-center mb-3">
				<div>
					Now playing:{" "}
					<span className="text-gray-500">{activeAudioItem.name}</span>
				</div>
				<div className="flex flex-row ml-4">
					<Link href={itemHref}>
						<a className=" whitespace-nowrap pt-0.5">Go to Item</a>
					</Link>
					<button
						className="btn-secondary flex ml-4"
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
