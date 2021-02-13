import Link from 'next/link';
import { Tag, Entity } from 'types';
import AddTag from 'components/AddTag';

interface TagProps {
  tag: Tag;
}
const TagLink = ({ tag }: TagProps) => {
  const { objectAudioItem, objectPerson, objectInstrument } = tag;
  let href = '';
  if (objectAudioItem) {
    href = `/entities/audio-items/${objectAudioItem.slug}`;
  } else if (objectPerson) {
    href = `/entities/people/${objectPerson.slug}`;
  } else if (objectInstrument) {
    href = `/entities/instruments/${objectInstrument.slug}`;
  }
  const text =
    objectAudioItem?.name ?? objectPerson?.name ?? objectInstrument?.name;
  return (
    <Link href={href}>
      <a className="block p-1 px-2 mb-2 no-underline border border-teal-600 rounded hover:border-teal-800">
        {text}
      </a>
    </Link>
  );
};

interface TagsProps {
  entity: Entity;
}
const Tags = ({ entity }: TagsProps) => {
  const { tags } = entity;

  return (
    <div className="flex flex-row items-center flex-wrap">
      {tags?.map((tag, index) => (
        <div className="mr-2" key={index}>
          <TagLink tag={tag} />
        </div>
      ))}
      <div className={tags?.length > 0 ? 'mb-2 ml-1' : undefined}>
        <AddTag entity={entity} />
      </div>
    </div>
  );
};

export default Tags;
