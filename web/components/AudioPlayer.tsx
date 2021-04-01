import { useEffect, useRef } from "react";
import usePlayerContext from "hooks/usePlayerContext";
import { AudioItem } from "types";

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

	// When the audio item's duration changes, update PlayerContext
	useEffect(() => {
		const audioPlayer = audioPlayerRef.current;
		if (audioPlayer) {
			audioPlayer.ondurationchange = () => {
				const duration = audioPlayer.duration;
				if (typeof duration === "number") {
					const durationSeconds = Math.floor(audioPlayer.duration);
					setActiveItemDurationSeconds(durationSeconds);
				}
			};
		}
	}, []);

	// As the audio tag's playback position changes, update PlayerContext with the
	// new value
	useEffect(() => {
		const audioPlayer = audioPlayerRef.current;
		if (audioPlayer) {
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
		if (audioPlayer && seekPositionSeconds) {
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
