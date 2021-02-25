import { useRouter } from 'next/router';
import Link from 'next/link';

import useCollectionEntriesForUser from 'hooks/useCollectionEntriesForUser';
import usePlayer from 'hooks/usePlayer';
import { Tag } from 'types';

import Layout from 'components/Layout';
import RequireUser from 'components/RequireUser';
import LoadingBlock from 'components/LoadingBlock';

interface TagLinkProps {
  tag: Tag;
}
const TagLink = ({ tag }: TagLinkProps) => {
  const { objectAudioItem, objectPerson, objectInstrument, objectPlace } = tag;
  let href = '';
  if (objectAudioItem) {
    href = `/entities/audio-items/${objectAudioItem.slug}`;
  } else if (objectPerson) {
    href = `/entities/people/${objectPerson.slug}`;
  } else if (objectInstrument) {
    href = `/entities/instruments/${objectInstrument.slug}`;
  } else if (objectPlace) {
    href = `/entities/places/${objectPlace.slug}`;
  }
  const text =
    objectAudioItem?.name ??
    objectPerson?.name ??
    objectInstrument?.name ??
    objectPlace?.name;
  return <Link href={href}>{text}</Link>;
};

const UserIdCollection = () => {
  const router = useRouter();
  const { id } = router.query;
  const userId = typeof id === 'string' ? id : undefined;

  const [collectionEntries, { loading, error }] = useCollectionEntriesForUser();

  const { activePlayerAudioItem, setActivePlayerAudioItem } = usePlayer();

  return (
    <Layout>
      <RequireUser requireUserId={userId}>
        <div className="flex flex-col">
          <h1 className="mb-4">Your Collection</h1>
          {error && (
            <div className="text-red-600 mb-4">Could not fetch Collection</div>
          )}
          {loading && !collectionEntries && (
            <div className="mb-4">
              <LoadingBlock />
            </div>
          )}
          {collectionEntries?.map(({ audioItem }, index) => {
            const audioItemIsInPlayer =
              activePlayerAudioItem?.id === audioItem.id;

            return (
              <div className="mb-4" key={index}>
                <Link href={`/entities/audio-items/${audioItem.slug}`}>
                  {audioItem.name}
                </Link>
                <div className="text-gray-500">
                  Tags:{' '}
                  {audioItem.tags.map((tag, index) => (
                    <span key={index}>
                      <TagLink tag={tag} />
                      {index !== audioItem.tags.length - 1 && ', '}
                    </span>
                  ))}
                </div>
                {audioItemIsInPlayer ? (
                  <div className="text-gray-500">Playing</div>
                ) : (
                  <button
                    className="btn-text flex flex-row items-center"
                    onClick={() => setActivePlayerAudioItem(audioItem)}
                  >
                    <i className="material-icons mb-0.5">play_arrow</i>
                    Play
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </RequireUser>
    </Layout>
  );
};

export default UserIdCollection;
