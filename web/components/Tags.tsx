import Link from 'next/link';
import { Tag } from 'types';

interface TagProps {
  tag: Tag;
}
const TagLink = ({ tag }: TagProps) => {
  const { personEntity, instrumentEntity } = tag;
  let href = '';
  if (personEntity) {
    href = `/entities/person/${personEntity.slug}`;
  } else if (instrumentEntity) {
    href = `/entities/instrument/${instrumentEntity.slug}`;
  }
  const text = personEntity?.name ?? instrumentEntity?.name;
  return (
    <Link href={href}>
      <a className="block p-1 px-2 mb-2 md:mb-0 no-underline border border-teal-600 rounded hover:border-teal-800">
        {text}
      </a>
    </Link>
  );
};

interface TagsProps {
  tags: Tag[];
}
const Tags = ({ tags }: TagsProps) => {
  return (
    <div className="flex flex-row items-center flex-wrap">
      {tags.map((tag, index) => (
        <div className="mr-4" key={index}>
          <TagLink tag={tag} />
        </div>
      ))}
    </div>
  );
};

export default Tags;
