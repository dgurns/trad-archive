import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { PersonEntity } from 'types';

const CREATE_PERSON_ENTITY_MUTATION = gql`
  mutation CreatePersonEntity($input: CreatePersonEntityInput!) {
    createPersonEntity(input: $input) {
      id
    }
  }
`;
interface CreatePersonEntityInput {
  slug: string;
  aliases?: string;
  description?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}
interface Props {
  onSuccess?: (personEntity: PersonEntity) => void;
}
const CreatePersonEntityForm = ({ onSuccess }: Props) => {
  const router = useRouter();

  const [createPersonEntity, { loading, error, data }] = useMutation<
    { createPersonEntity: PersonEntity },
    { input: CreatePersonEntityInput }
  >(CREATE_PERSON_ENTITY_MUTATION, {
    errorPolicy: 'all',
  });

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [slug, setSlug] = useState('');
  const [aliases, setAliases] = useState('');
  const [description, setDescription] = useState('');

  const onCreatePersonEntity = (event) => {
    event.preventDefault();
    const input = {
      firstName,
      middleName,
      lastName,
      slug,
      aliases,
      description,
    };
    createPersonEntity({ variables: { input } });
  };

  useEffect(() => {
    if (data?.createPersonEntity) {
      if (onSuccess) {
        return onSuccess(data.createPersonEntity);
      }
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
    <>
      <h1 className="mb-4">Create Person Entity</h1>
      <div className="flex flex-col align-start">
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
            placeholder="URL slug (ie. kitty-hayes)"
            className="mb-2"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
          />
          <div className="text-sm text-gray-400 mb-2 ml-2">
            This will be used for the URL of this Person Entity, for example{' '}
            {`https://trad-archive.com/entities/person/${
              slug || 'kitty-hayes'
            }`}
          </div>
          <input
            placeholder="Aliases"
            className="mb-2"
            value={aliases}
            onChange={(event) => setAliases(event.target.value)}
          />
          <div className="text-sm text-gray-400 mb-2 ml-2">
            A list of comma-separated aliases for this Person Entity. For
            example:{' '}
            <em>Tony D, The Tradfather, Tony from the County Calamari</em>
          </div>
          <textarea
            placeholder="Description"
            className="mb-2"
            value={description}
            rows={5}
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

      {error && <div className="text-red-600">{error.message}</div>}
    </>
  );
};

export default CreatePersonEntityForm;
