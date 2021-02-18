import Link from 'next/link';

import { Entity, Tag } from 'types';
import EntityService from 'services/Entity';

interface Props {
  tag: Tag;
  className?: string;
}

// TagWithRelationshipToObject renders a Tag in the format "taught PERSON Billy
// McComiskey", displaying the relationship from the subject entity to an object
// entity.
const TagWithRelationshipToObject = ({ tag, className }: Props) => {
  const { relationship, objectAudioItem, objectInstrument, objectPerson } = tag;

  const objectEntity: Entity =
    objectAudioItem ?? objectInstrument ?? objectPerson;

  if (!objectEntity) {
    return null;
  }

  return (
    <div className={`text-gray-500 ${className ?? ''}`}>
      <em>{relationship.name}</em>
      <br />
      <span className="uppercase text-sm">{objectEntity.entityType}</span>
      <br />
      <Link href={EntityService.makeHrefForView(objectEntity)}>
        {objectEntity.name}
      </Link>
    </div>
  );
};

export default TagWithRelationshipToObject;