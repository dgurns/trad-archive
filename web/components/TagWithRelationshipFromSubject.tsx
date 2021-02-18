import Link from 'next/link';

import { Entity, Tag } from 'types';
import EntityService from 'services/Entity';

interface Props {
  tag: Tag;
  className?: string;
}

// TagWithRelationshipFromSubject renders a Tag in the format "PERSON John Dwyer
// is performer on", displaying the relationship from the subject entity to an
// object entity.
const TagWithRelationshipFromSubject = ({ tag, className }: Props) => {
  const {
    relationship,
    subjectAudioItem,
    subjectInstrument,
    subjectPerson,
  } = tag;

  const subjectEntity: Entity =
    subjectAudioItem ?? subjectInstrument ?? subjectPerson;

  if (!subjectEntity) {
    return null;
  }

  return (
    <div className={`text-gray-500 ${className ?? ''}`}>
      <span className="uppercase text-sm">{subjectEntity.entityType}</span>
      <br />
      <Link href={EntityService.makeHrefForView(subjectEntity)}>
        {subjectEntity.name}
      </Link>
      <br />
      <em>{relationship.name}</em>
    </div>
  );
};

export default TagWithRelationshipFromSubject;