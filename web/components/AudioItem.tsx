import Link from 'next/link';
import { AudioItem } from 'types';
import DateTime from 'services/DateTime';
import usePlayer from 'hooks/usePlayer';

import Tags from 'components/Tags';

interface Props {
  audioItem: AudioItem;
}

const AudioItemComponent = ({ audioItem }: Props) => {
  const { name, slug, description, createdByUser, createdAt } = audioItem;

  const { activePlayerAudioItem, setActivePlayerAudioItem } = usePlayer();
  const audioItemIsInPlayer = activePlayerAudioItem?.id === audioItem.id;

  return (
    <div className="flex flex-col justify-start items-start bg-white shadow-md rounded p-4 mb-8">
      <Link href={`/entities/audio-items/${slug}`}>
        <h1 className="mb-2">{name}</h1>
      </Link>
      <div className="mb-6">
        <Tags entity={audioItem} />
      </div>
      <div className="flex flex-row w-full justify-start items-center mb-5 h-14 border border-gray-200 rounded">
        {audioItemIsInPlayer ? (
          <div className="pl-3 text-gray-400">Playing</div>
        ) : (
          <button
            style={{ lineHeight: 0 }}
            onClick={() => setActivePlayerAudioItem(audioItem)}
          >
            <i className="material-icons text-5xl text-teal-600 hover:text-teal-800">
              play_arrow
            </i>
          </button>
        )}
      </div>
      <div className="text-gray-500 text-sm mb-2">
        Posted by{' '}
        <Link href={`/users/${createdByUser.username}`}>
          {createdByUser.username}
        </Link>{' '}
        {DateTime.formatDate(createdAt)}
      </div>
      <div className="text-sm">{description}</div>
    </div>
  );
};

export default AudioItemComponent;
