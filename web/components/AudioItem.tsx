import Link from 'next/link';
import { AudioItem } from 'types';
import DateTime from 'services/DateTime';
import usePlayer from 'hooks/usePlayer';

import Tags from 'components/Tags';
import CreateCommentForm from 'components/CreateCommentForm';

interface Props {
  audioItem: AudioItem;
}

const AudioItemComponent = ({ audioItem }: Props) => {
  const {
    name,
    slug,
    description,
    commentsCount,
    createdByUser,
    createdAt,
  } = audioItem;

  const { activePlayerAudioItem, setActivePlayerAudioItem } = usePlayer();
  const audioItemIsInPlayer = activePlayerAudioItem?.id === audioItem.id;

  return (
    <div className="flex flex-col justify-start items-start bg-white shadow-md rounded p-4 mb-8">
      <Link href={`/entities/audio-items/${slug}`}>
        <a className="mb-2 link-h1">{name}</a>
      </Link>

      <div className="mb-6">
        <Tags entity={audioItem} />
      </div>

      <div className="flex flex-row w-full justify-start items-center mb-5 h-14 border border-gray-200 rounded">
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

      <div className="text-gray-500 text-sm mb-2">
        Added by{' '}
        <Link href={`/users/${createdByUser.id}`}>
          {createdByUser.username}
        </Link>{' '}
        {DateTime.formatDateYearTime(createdAt)}
      </div>
      <div className="text-sm mb-4">{description}</div>

      {commentsCount > 0 && (
        <button className="btn-text mb-4">
          View Comments ({commentsCount})
        </button>
      )}

      <CreateCommentForm parentEntity={audioItem} onSuccess={() => {}} />
    </div>
  );
};

export default AudioItemComponent;
