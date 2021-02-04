import React, { useContext } from 'react';
import { AudioItem } from 'types';

interface PlayerContextValue {
  activePlayerAudioItem: AudioItem | null;
  setActivePlayerAudioItem: React.Dispatch<React.SetStateAction<AudioItem>>;
}
export const PlayerContext = React.createContext<PlayerContextValue>(null);

const usePlayer = () => {
  const { activePlayerAudioItem, setActivePlayerAudioItem } = useContext(
    PlayerContext
  );
  return { activePlayerAudioItem, setActivePlayerAudioItem };
};

export default usePlayer;
