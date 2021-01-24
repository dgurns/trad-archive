import Link from 'next/link';
import usePlayer from 'hooks/usePlayer';
import { AudioItem, isAudioItem } from 'types';

interface AudioPlayerProps {
  item: AudioItem;
}
const AudioPlayer = ({ item }: AudioPlayerProps) => {
  return (
    <audio
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

const Player = () => {
  const { activePlayerItem, setActivePlayerItem } = usePlayer();

  if (!activePlayerItem) {
    return null;
  }

  let player;
  if (activePlayerItem) {
    player = isAudioItem(activePlayerItem) ? (
      <AudioPlayer item={activePlayerItem} key={activePlayerItem.id} />
    ) : (
      'No player yet for this item type'
    );
  }

  return (
    <div className="flex flex-col align-center justify-center p-4 bg-white align-center">
      <div className="flex flex-row justify-between mb-3">
        <div>
          Now playing:{' '}
          <span className="text-gray-500">{activePlayerItem.title}</span>
        </div>
        <div className="flex flex-row items-top ml-4">
          <Link href={`/items/${activePlayerItem.id}`}>
            <a className="whitespace-nowrap">Go to Item</a>
          </Link>
          <button
            className="btn-icon flex ml-4"
            onClick={() => setActivePlayerItem(null)}
          >
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>
      {player}
    </div>
  );
};

export default Player;
