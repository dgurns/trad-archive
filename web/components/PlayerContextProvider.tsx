import React, { useEffect, useState } from "react";
import Player from "components/Player";
import { AudioItem } from "types";

interface PlayerContextValue {
	activePlayerAudioItem: AudioItem | null;
	setActivePlayerAudioItem: React.Dispatch<React.SetStateAction<AudioItem>>;
	activeItemDurationSeconds: number | undefined;
	setActiveItemDurationSeconds: React.Dispatch<
		React.SetStateAction<number | undefined>
	>;
	playbackPositionSeconds: number | undefined;
	setPlaybackPositionSeconds: React.Dispatch<
		React.SetStateAction<number | undefined>
	>;
	seekPositionSeconds: number | undefined;
	setSeekPositionSeconds: React.Dispatch<
		React.SetStateAction<number | undefined>
	>;
}

export const PlayerContext = React.createContext<PlayerContextValue>(null);

interface PlayerContextProviderProps {
	children: React.ReactChild | React.ReactChild[];
}

function PlayerContextProvider({ children }: PlayerContextProviderProps) {
	const [activePlayerAudioItem, setActivePlayerAudioItem] = useState<AudioItem>(
		null
	);
	const [activeItemDurationSeconds, setActiveItemDurationSeconds] = useState<
		number | undefined
	>(undefined);
	const [playbackPositionSeconds, setPlaybackPositionSeconds] = useState<
		number | undefined
	>(undefined);
	const [seekPositionSeconds, setSeekPositionSeconds] = useState<
		number | undefined
	>(undefined);

	// Reset PlayerContext whenever there is no active item
	useEffect(() => {
		const resetPlayerContext = () => {
			setActiveItemDurationSeconds(undefined);
			setPlaybackPositionSeconds(undefined);
			setSeekPositionSeconds(undefined);
		};
		if (!activePlayerAudioItem) {
			resetPlayerContext();
		}
	}, [activePlayerAudioItem]);

	return (
		<PlayerContext.Provider
			value={{
				activePlayerAudioItem,
				setActivePlayerAudioItem,
				activeItemDurationSeconds,
				setActiveItemDurationSeconds,
				playbackPositionSeconds,
				setPlaybackPositionSeconds,
				seekPositionSeconds,
				setSeekPositionSeconds,
			}}
		>
			{children}

			{/* Player is rendered here so it is persistent across all routes */}
			{activePlayerAudioItem && (
				<div
					className="fixed bottom-0 left-0 right-0"
					style={{
						boxShadow:
							"0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)",
					}}
				>
					<Player />
				</div>
			)}
		</PlayerContext.Provider>
	);
}

export default PlayerContextProvider;
