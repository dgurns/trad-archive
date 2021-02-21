import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { Place } from 'types';
import { EntityFragments } from 'fragments';

const CREATE_PLACE_MUTATION = gql`
  mutation CreatePlace($input: CreatePlaceInput!) {
    createPlace(input: $input) {
      ...Place
    }
  }
  ${EntityFragments.place}
`;
interface CreatePlaceInput {
  slug: string;
  aliases?: string;
  description?: string;
  latitude: number;
  longitude: number;
}
interface Props {
  onSuccess?: (place: Place) => void;
}
const CreatePlaceForm = ({ onSuccess }: Props) => {
  const router = useRouter();

  const [createPlace, { loading, error, data }] = useMutation<
    { createPlace: Place },
    { input: CreatePlaceInput }
  >(CREATE_PLACE_MUTATION, {
    errorPolicy: 'all',
  });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [aliases, setAliases] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');

  const onCreatePlace = (event) => {
    event.preventDefault();
    const input = {
      name,
      slug,
      aliases,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      description,
    };
    createPlace({ variables: { input } });
  };

  useEffect(() => {
    if (data?.createPlace) {
      if (onSuccess) {
        return onSuccess(data.createPlace);
      }
      window.alert('Place created successfully!');
      setName('');
      setSlug('');
      setAliases('');
      setLatitude('');
      setLongitude('');
      setDescription('');
    }
  }, [data, router]);

  return (
    <>
      <div className="flex flex-col align-start">
        <form onSubmit={onCreatePlace}>
          <input
            placeholder="First name"
            autoFocus
            className="mb-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            placeholder="URL slug (ie. kitty-hayes)"
            className="mb-2"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
          />
          <div className="text-sm text-gray-400 mb-2 ml-2">
            This will be used for the URL of this Place, for example{' '}
            {`https://trad-archive.com/entities/places/${
              slug || 'galway-city'
            }`}
          </div>
          <input
            placeholder="Aliases"
            className="mb-2"
            value={aliases}
            onChange={(event) => setAliases(event.target.value)}
          />
          <div className="text-sm text-gray-400 mb-2 ml-2">
            A list of comma-separated aliases for this Place. For example:{' '}
            <em>Gaillimh, The City of Tribes</em>
          </div>
          <input
            placeholder="Latitude"
            className="mb-2"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
          />
          <div className="text-sm text-gray-400 mb-2 ml-2">
            To find the latitude, visit{' '}
            <a href={`https://www.google.com/maps/place/${name}`}>
              {name ? `${name} on ` : ''}Google Maps
            </a>{' '}
            and right-click on the location you'd like. You'll see numbers like
            "53.2838294,-9.1888286". The first one is latitude, and the second
            is longitude.
          </div>
          <input
            placeholder="Longitude"
            className="mb-2"
            value={longitude}
            onChange={(event) => setLongitude(event.target.value)}
          />
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

export default CreatePlaceForm;
