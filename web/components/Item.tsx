import Link from 'next/link';
import { Item } from 'types';
import DateTime from 'services/DateTime';
import usePlayer from 'hooks/usePlayer';

import Tags from 'components/Tags';
import AddTag from 'components/AddTag';

interface Props {
  item: Item;
}

const ItemComponent = ({ item }: Props) => {
  const { title, description, tags, addedByUser, createdAt } = item;

  const { activePlayerItem, setActivePlayerItem } = usePlayer();
  const itemIsInPlayer = activePlayerItem?.id === item.id;

  return (
    <div className="flex flex-col justify-start items-start bg-white shadow-md rounded p-4 mb-8">
      <h1 className="mb-2">{title}</h1>
      <div className="mb-6 flex flex-col items-start md:flex-row md:items-center">
        <Tags tags={tags} />
        <AddTag item={item} />
      </div>
      <div className="flex flex-row w-full justify-start items-center mb-5 h-14 border border-gray-200 rounded">
        {itemIsInPlayer ? (
          <div className="pl-3 text-gray-400">Playing</div>
        ) : (
          <button
            style={{ lineHeight: 0 }}
            onClick={() => setActivePlayerItem(item)}
          >
            <i className="material-icons text-5xl text-teal-600 hover:text-teal-800">
              play_arrow
            </i>
          </button>
        )}
      </div>
      <div className="text-gray-500 text-sm mb-2">
        Posted by{' '}
        <Link href={`/users/${addedByUser.username}`}>
          {addedByUser.username}
        </Link>{' '}
        {DateTime.formatDate(createdAt)}
      </div>
      <div className="text-sm">{description}</div>
    </div>
  );
};

export default ItemComponent;
