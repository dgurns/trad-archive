import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import RequireUser from 'components/RequireUser';

const CREATE_PERSON_ENTITY_MUTATION = gql`
  mutation CreatePersonEntity(
    $slug: String!
    $aliases: []String
    $description: String
    $firstName: String!
    $middleName: String
    $lastName: String!
  ) {
    createPersonEntity(
      slug: $slug
      aliases: $aliases
      description: $description
      firstName: $firstName
      middleName: $middleName
      lastName: $lastName
    ) {
      id
    }
  }
`;

const EntitiesPersonNew = () => {
  const router = useRouter();

  const [
    createPersonEntity,
    { loading, error, data },
  ] = useMutation(CREATE_PERSON_ENTITY_MUTATION, { errorPolicy: 'all' });

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [slug, setSlug] = useState('');
  const [aliases, setAliases] = useState('');
  const [description, setDescription] = useState('');

  const onCreatePersonEntity = (event) => {
    event.preventDefault();
    const aliasesArray = aliases.split(',');
    createPersonEntity({
      variables: {
        firstName,
        middleName,
        lastName,
        slug,
        aliases: aliasesArray,
        description,
      },
    });
  };

  useEffect(() => {
    if (data?.createPersonEntity) {
      window.alert('Person Entity created successfully!');
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setSlug('');
      setAliases('');
      setDescription('');
    }
  }, [data, router]);

  return (
    <Layout>
      <RequireUser>
        <>
          <h1 className="mb-4">Create Person Entity</h1>
          <div className="flex flex-col align-start max-w-md">
            <form onSubmit={onCreatePersonEntity}>
              <input
                placeholder="First name"
                autoFocus
                className="mb-2"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
              <input
                placeholder="Middle name (optional)"
                className="mb-2"
                value={middleName}
                onChange={(event) => setMiddleName(event.target.value)}
              />
              <input
                placeholder="Last name"
                className="mb-2"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
              <input
                placeholder="Custom identifier slug (ie. mary-jane-smith)"
                className="mb-2"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
              This will be used for the URL of this Person Entity, for example
              https://trad-archive.com/entities/person/mary-jane-smith
              <input
                placeholder="Aliases"
                className="mb-2"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
              A list of comma-separated aliases for this Person Entity. For
              example, "Tony D, The Tradfather, Tony from the County Calamari"
              <textarea
                placeholder="Description"
                className="mb-2"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <input
                type="submit"
                className="btn mb-4 w-auto"
                disabled={loading}
                value="Create"
              />
            </form>
          </div>

          {error && <div className="text-red-600 mb-4">{error.message}</div>}
        </>
      </RequireUser>
    </Layout>
  );
};

export default EntitiesPersonNew;
