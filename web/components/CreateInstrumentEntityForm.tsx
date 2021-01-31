import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { InstrumentEntity } from 'types';

const CREATE_INSTRUMENT_ENTITY_MUTATION = gql`
  mutation CreateInstrumentEntity($input: CreateInstrumentEntityInput!) {
    createInstrumentEntity(input: $input) {
      id
    }
  }
`;
interface CreateInstrumentEntityInput {
  name: string;
  slug: string;
  aliases?: string;
  description?: string;
}
interface Props {
  onSuccess?: (instrumentEntity: InstrumentEntity) => void;
}
const CreateInstrumentEntityForm = ({ onSuccess }: Props) => {
  const router = useRouter();

  const [createInstrumentEntity, { loading, error, data }] = useMutation<
    { createInstrumentEntity: InstrumentEntity },
    { input: CreateInstrumentEntityInput }
  >(CREATE_INSTRUMENT_ENTITY_MUTATION, {
    errorPolicy: 'all',
  });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [aliases, setAliases] = useState('');
  const [description, setDescription] = useState('');

  const onCreateInstrumentEntity = (event) => {
    event.preventDefault();
    const input = {
      name,
      slug,
      aliases,
      description,
    };
    createInstrumentEntity({ variables: { input } });
  };

  useEffect(() => {
    if (data?.createInstrumentEntity) {
      if (onSuccess) {
        return onSuccess(data.createInstrumentEntity);
      }
      window.alert('Instrument Entity created successfully!');
      setName('');
      setSlug('');
      setAliases('');
      setDescription('');
    }
  }, [data, router]);

  return (
    <>
      <h1 className="mb-4">Create Instrument Entity</h1>
      <div className="flex flex-col align-start">
        <form onSubmit={onCreateInstrumentEntity}>
          <input
            placeholder="Name"
            autoFocus
            className="mb-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            placeholder="URL slug (ie. button-accordion)"
            className="mb-2"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
          />
          <div className="text-sm text-gray-400 mb-2 ml-2">
            This will be used for the URL of this Instrument Entity, for example{' '}
            {`https://trad-archive.com/entities/instrument/${
              slug || 'button-accordion'
            }`}
          </div>
          <input
            placeholder="Aliases"
            className="mb-2"
            value={aliases}
            onChange={(event) => setAliases(event.target.value)}
          />
          <div className="text-sm text-gray-400 mb-2 ml-2">
            A list of comma-separated aliases for this Instrument Entity. For
            example: <em>Stomach Steinway, Squeezebox, Belly Organ</em>
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

export default CreateInstrumentEntityForm;
