import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

import { Person } from 'types';
import { EntityFragments } from 'fragments';

import Layout from 'components/Layout';
import LoadingBlock from 'components/LoadingBlock';
import RequireUser from 'components/RequireUser';
import EditPersonForm from 'components/EditPersonForm';

const PERSON_QUERY = gql`
  query Person($slug: String!) {
    person(slug: $slug) {
      ...Person
    }
  }
  ${EntityFragments.person}
`;

const EditPerson = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useQuery(PERSON_QUERY, {
    variables: { slug },
    skip: !slug,
  });

  const onEditSuccess = (person: Person) => {
    router.push(`/entities/people/${person.slug}`);
  };

  let statusMessage;
  if (!data && !error) {
    statusMessage = <LoadingBlock />;
  } else if (error) {
    statusMessage = `Error fetching Person with slug ${slug}`;
  }

  if (statusMessage) {
    return <Layout>{statusMessage}</Layout>;
  }

  return (
    <Layout>
      <RequireUser>
        <div className="max-w-md">
          <h1 className="mb-4">Edit {data.person.name}</h1>
          <EditPersonForm person={data.person} onSuccess={onEditSuccess} />
        </div>
      </RequireUser>
    </Layout>
  );
};

export default EditPerson;
