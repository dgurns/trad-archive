import { useRouter } from 'next/router';
import useCurrentUser from 'hooks/useCurrentUser';
import { Entity, isAudioItem } from 'types';

interface Props {
  entity: Entity;
}
const AddToCollection = ({ entity }: Props) => {
  const router = useRouter();
  const [user] = useCurrentUser();

  const onClick = () => {
    if (!user) {
      let redirectTo = '/';
      if (isAudioItem(entity)) {
        redirectTo = `/entities/audio-items/${entity.slug}`;
      }
      router.push({
        pathname: '/login',
        query: { redirectTo },
      });
    } else {
      // Call the createCollectionEntry mutation
    }
  };

  return (
    <button
      className="btn-secondary flex flex-row items-center"
      onClick={onClick}
    >
      <i className="material-icons mb-0.5">add</i>
      Add to Collection
    </button>
  );
};

export default AddToCollection;
