import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Instrument } from 'types';
import { EntityFragments } from 'fragments';

const CREATE_INSTRUMENT_MUTATION = gql`
  mutation CreateInstrument($input: CreateInstrumentInput!) {
    createInstrument(input: $input) {
      ...Instrument
    }
  }
  ${EntityFragments.instrument}
`;
interface CreateInstrumentInput {
  name: string;
  slug: string;
  aliases?: string;
  description?: string;
}
interface Props {
  onSuccess?: (instrument: Instrument) => void;
}
const CreateInstrumentForm = ({ onSuccess }: Props) => {
  const [createInstrument, { loading, error, data }] = useMutation<
    { createInstrument: Instrument },
    { input: CreateInstrumentInput }
  >(CREATE_INSTRUMENT_MUTATION, {
    errorPolicy: 'all',
  });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [aliases, setAliases] = useState('');
  const [description, setDescription] = useState('');

  const onCreateInstrument = (event) => {
    event.preventDefault();
    const input = {
      name,
      slug,
      aliases,
      description,
    };
    createInstrument({ variables: { input } });
  };

  useEffect(() => {
    if (data?.createInstrument) {
      if (onSuccess) {
        return onSuccess(data.createInstrument);
      }
      window.alert('Instrument created successfully!');
      setName('');
      setSlug('');
      setAliases('');
      setDescription('');
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-col align-start">
        <form onSubmit={onCreateInstrument}>
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
            This will be used for the URL of this Instrument, for example{' '}
            {`https://trad-archive.com/entities/instruments/${
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
            A list of comma-separated aliases for this Instrument. For example:{' '}
            <em>Stomach Steinway, Squeezebox, Belly Organ</em>
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

export default CreateInstrumentForm;
