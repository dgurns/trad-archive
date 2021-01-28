import { useState } from 'react';
import Link from 'next/link';
import { Tag } from 'types';
import Modal from 'components/Modal';

interface TagProps {
  tag: Tag;
}
const TagLink = ({ tag }: TagProps) => {
  const { personEntity } = tag;
  if (personEntity) {
    return (
      <Link href={`/entities/person/${personEntity.slug}`}>
        <a className="p-1 px-2 no-underline border border-teal-600 rounded hover:border-teal-800">
          {personEntity.name}
        </a>
      </Link>
    );
  }
  return null;
};

interface TagsProps {
  tags: Tag[];
}
const Tags = ({ tags }: TagsProps) => {
  const [addTagModalIsVisible, setAddTagModalIsVisible] = useState(false);

  return (
    <div className="flex flex-row items-center">
      {tags.map((tag, index) => (
        <div className="mr-4" key={index}>
          <TagLink tag={tag} />
        </div>
      ))}
      <button
        className="btn-text"
        onClick={() => setAddTagModalIsVisible(true)}
      >
        + Add Tag
      </button>
      <Modal
        title="Add Tag"
        isVisible={addTagModalIsVisible}
        onClose={() => setAddTagModalIsVisible(false)}
      >
        Add Tag form goes here
      </Modal>
    </div>
  );
};

export default Tags;
