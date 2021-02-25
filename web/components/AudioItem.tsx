import Link from 'next/link';
import { AudioItem } from 'types';
import DateTime from 'services/DateTime';
import usePlayer from 'hooks/usePlayer';

import Tags from 'components/Tags';
import Comments from 'components/Comments';
import AddToCollection from 'components/AddToCollection';

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
        <a className="mb-2 link-h1">{name}</a>
      </Link>

      <div className="mb-4">
        <Tags entity={audioItem} />
      </div>

      <div className="flex flex-row w-full justify-start items-center mb-2 h-14 border border-gray-200 rounded">
        {audioItemIsInPlayer ? (
          <div className="pl-3 text-gray-500">Playing</div>
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
      <div className="flex flex-row justify-start items-center mb-4">
        <AddToCollection audioItem={audioItem} />
      </div>

      <div className="mb-2">
        <div className="text-gray-500 text-sm">
          Added by{' '}
          <Link href={`/users/${createdByUser.id}`}>
            {createdByUser.username}
          </Link>{' '}
          {DateTime.formatDateYearTime(createdAt)}
        </div>
        <div className="text-sm mt-1">{description}</div>
      </div>

      <Comments parentEntity={audioItem} />
    </div>
  );
};

export default AudioItemComponent;
