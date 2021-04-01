import { useContext } from "react";
import { PlayerContext } from "components/PlayerContextProvider";

const usePlayer = () => {
	const {
		activePlayerAudioItem,
		setActivePlayerAudioItem,
		playbackPositionSeconds,
		setPlaybackPositionSeconds,
		seekPositionSeconds,
		setSeekPositionSeconds,
	} = useContext(PlayerContext);

	return {
		activePlayerAudioItem,
		setActivePlayerAudioItem,
		playbackPositionSeconds,
		setPlaybackPositionSeconds,
		seekPositionSeconds,
		setSeekPositionSeconds,
	};
};

export default usePlayer;
