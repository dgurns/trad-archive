import { useEffect, useRef } from "react";
import usePlayerContext from "~/hooks/usePlayerContext";
import { AudioItem } from "~/types";

interface AudioPlayerProps {
	item: AudioItem;
}
const AudioPlayer = ({ item }: AudioPlayerProps) => {
	const audioPlayerRef = useRef<HTMLAudioElement>();

	const {
		setActiveItemDurationSeconds,
		setPlaybackPositionSeconds,
		seekPositionSeconds,
		setSeekPositionSeconds,
	} = usePlayerContext();

	// Set up event callbacks on the audio tag
	useEffect(() => {
		const audioPlayer = audioPlayerRef.current;
		if (audioPlayer) {
			// When the audio item's duration changes, update PlayerContext
			audioPlayer.ondurationchange = () => {
				const duration = audioPlayer.duration;
				if (typeof duration === "number") {
					const durationSeconds = Math.floor(audioPlayer.duration);
					setActiveItemDurationSeconds(durationSeconds);
				}
			};
			// As the audio tag's playback position changes, update PlayerContext with the
			// new value
			audioPlayer.ontimeupdate = () => {
				const playbackPositionSeconds = Math.floor(audioPlayer.currentTime);
				setPlaybackPositionSeconds(playbackPositionSeconds);
			};
		}
	}, []);

	// If a seek position is set in PlayerContext, update audio tag's playback
	// position to match and ensure audio is playing
	useEffect(() => {
		const audioPlayer = audioPlayerRef.current;
		if (audioPlayer && typeof seekPositionSeconds === "number") {
			audioPlayer.currentTime = seekPositionSeconds;
			setSeekPositionSeconds(undefined);
			if (audioPlayer.paused) {
				audioPlayer.play();
			}
		}
	}, [seekPositionSeconds]);

	return (
		<audio
			ref={audioPlayerRef}
			id="audio"
			preload="metadata"
			autoPlay
			controls
			controlsList="nodownload"
			className="w-full outline-none"
		>
			<source src={item.urlSource} type="audio/mpeg" />
		</audio>
	);
};

export default AudioPlayer;
