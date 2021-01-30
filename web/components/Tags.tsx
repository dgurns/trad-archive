import { useEffect, useState, useRef } from 'react';
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
  const [inputValue, setInputValue] = useState('');

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
        <div className="relative mb-2">
          <input
            autoFocus
            placeholder="Start typing a tag..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <i className="material-icons absolute top-2 right-2 animate-spin text-gray-500">
            scatter_plot
          </i>
        </div>
        <ul className="mb-2">
          <li className="flex flex-row justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-200">
            <span>Tony DeMarco</span>
            <span className="uppercase text-gray-500 text-sm">Person</span>
          </li>
          <li className="flex flex-row justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-200">
            <span>Fiddle</span>
            <span className="uppercase text-gray-500 text-sm">Instrument</span>
          </li>
        </ul>
        <button className="btn-text ml-2">Create New</button>
      </Modal>
    </div>
  );
};

export default Tags;
