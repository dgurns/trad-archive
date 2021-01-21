import Link from 'next/link';
import { Item } from 'types';
import DateTime from 'services/DateTime';

interface Props {
  item: Item;
}

const ItemComponent = ({ item }: Props) => {
  const { title, description, addedByUser, createdAt } = item;

  return (
    <div className="flex flex-col justify-start items-start bg-white shadow-md rounded p-4 mb-8">
      <h1 className="mb-4">{title}</h1>
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
