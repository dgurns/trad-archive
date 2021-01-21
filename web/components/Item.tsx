import { useMemo } from 'react';
import Link from 'next/link';
import { Item, isAudioItem } from 'types';
import DateTime from 'services/DateTime';

interface Props {
  item: Item;
}

const ItemComponent = ({ item }: Props) => {
  const { title, description, addedByUser, createdAt } = item;

  const mediaPlayer = useMemo(() => {
    if (isAudioItem(item)) {
      return (
        <audio controls className="w-full outline-none">
          <source src={item.urlSource} type="audio/mpeg" />
        </audio>
      );
    }
  }, [item]);

  return (
    <div className="flex flex-col justify-start items-start bg-white shadow-md rounded p-4 mb-8">
      <h1 className="mb-4">{title}</h1>
      <div className="mb-4 w-full">{mediaPlayer}</div>
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
