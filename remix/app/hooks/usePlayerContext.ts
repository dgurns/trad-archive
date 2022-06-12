import { useContext } from "react";
import { PlayerContext } from "~/components/PlayerContextProvider";

const usePlayerContext = () => {
	const playerContext = useContext(PlayerContext);
	return playerContext;
};

export default usePlayerContext;
