import { useMemo } from 'react';
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
  const { activePlayerAudioItem, setActivePlayerAudioItem } = usePlayer();

  if (!activePlayerAudioItem) {
    return null;
  }

  const itemHref = useMemo(() => {
    if (isAudioItem(activePlayerAudioItem)) {
      return `/entities/audio-items/${activePlayerAudioItem.slug}`;
    }
    return window.location.href;
  }, [activePlayerAudioItem]);

  return (
    <div className="flex flex-col align-center justify-center p-4 bg-white align-center">
      <div className="flex flex-row justify-between mb-3">
        <div>
          Now playing:{' '}
          <span className="text-gray-500">{activePlayerAudioItem.name}</span>
        </div>
        <div className="flex flex-row items-top ml-4">
          <Link href={itemHref}>
            <a className="whitespace-nowrap">View Details</a>
          </Link>
          <button
            className="btn-icon flex ml-4"
            onClick={() => setActivePlayerAudioItem(null)}
          >
            <i className="material-icons">close</i>
          </button>
        </div>
      </div>

      <AudioPlayer
        item={activePlayerAudioItem}
        key={activePlayerAudioItem.id}
      />
    </div>
  );
};

export default Player;
