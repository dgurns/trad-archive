import React, { useContext } from 'react';
import { Item } from 'types';

interface PlayerContextValue {
  activePlayerItem: Item | null;
  setActivePlayerItem: React.Dispatch<React.SetStateAction<Item>>;
}
export const PlayerContext = React.createContext<PlayerContextValue>(null);

const usePlayer = () => {
  const { activePlayerItem, setActivePlayerItem } = useContext(PlayerContext);
  return { activePlayerItem, setActivePlayerItem };
};

export default usePlayer;
