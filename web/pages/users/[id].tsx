import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';

import { UserFragments } from 'fragments';
import { User } from 'types';
import DateTimeService from 'services/DateTime';
import useAudioItemsCreatedByUser from 'hooks/useAudioItemsCreatedByUser';

import Layout from 'components/Layout';
import LoadingBlock from 'components/LoadingBlock';
import AudioItemComponent from 'components/AudioItem';

const USER_QUERY = gql`
  query User($id: String!) {
    user(id: $id) {
      ...User
    }
  }
  ${UserFragments.user}
`;

const ViewUserById = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: userData, error: userError } = useQuery<{ user: User }>(
    USER_QUERY,
    {
      variables: { id },
      skip: !id,
    }
  );

  const [
    audioItems = [],
    { loading: audioItemsLoading, error: audioItemsError },
  ] = useAudioItemsCreatedByUser(userData?.user);

  let statusMessage;
  if (!userData && !userError) {
    statusMessage = <LoadingBlock />;
  } else if (!userData && userError) {
    statusMessage = `Error fetching User with id ${id}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  const { username, createdAt } = userData.user;

  return (
    <Layout>
      <div className="flex flex-row">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-4">Audio Items Added by "{username}"</h1>
          {audioItemsLoading && <LoadingBlock />}
          {audioItemsError && (
            <div className="text-red-600">Error fetching Audio Items</div>
          )}
          {audioItems.map((audioItem, index) => (
            <AudioItemComponent audioItem={audioItem} key={index} />
          ))}
        </div>
        <div className="flex flex-col ml-8 pl-8 w-1/4 border-l border-gray-300">
          <h1 className="mb-4">About {username}</h1>
          <div className="mb-4">
            Account created:
            <br />
            <span className="text-gray-500">
              {DateTimeService.formatDateYear(createdAt)}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewUserById;
