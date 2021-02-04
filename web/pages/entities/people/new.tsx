import { useRouter } from 'next/router';

import { Person } from 'types';

import Layout from 'components/Layout';
import RequireUser from 'components/RequireUser';
import CreatePersonForm from 'components/CreatePersonForm';

const NewPerson = () => {
  const router = useRouter();

  const onCreateSuccess = (person: Person) => {
    router.push(`/entities/people/${person.slug}`);
  };

  return (
    <Layout>
      <RequireUser>
        <div className="max-w-md">
          <CreatePersonForm onSuccess={onCreateSuccess} />
        </div>
      </RequireUser>
    </Layout>
  );
};

export default NewPerson;
