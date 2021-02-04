import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { Relationship, EntityType } from 'types';
import { RelationshipFragments } from 'fragments';

const CREATE_RELATIONSHIP_MUTATION = gql`
  mutation CreateRelationship($input: CreateRelationshipInput!) {
    createRelationship(input: $input) {
      ...Relationship
    }
  }
  ${RelationshipFragments.relationship}
`;

interface CreateRelationshipInput {
  name: string;
  nameReversed?: string;
  subjectEntityType: EntityType;
  objectEntityType: EntityType;
}
interface Props {
  onSuccess?: (relationship: Relationship) => void;
}

const CreateRelationshipForm = ({ onSuccess }: Props) => {
  const router = useRouter();

  const [createRelationship, { loading, error, data }] = useMutation<
    { createRelationship: Relationship },
    { input: CreateRelationshipInput }
  >(CREATE_RELATIONSHIP_MUTATION, {
    errorPolicy: 'all',
  });

  const [subjectEntityType, setSubjectEntityType] = useState('Person');
  const [objectEntityType, setObjectEntityType] = useState('Instrument');
  const [name, setName] = useState('');
  const [nameReversed, setNameReversed] = useState('');

  const [validationError, setValidationError] = useState('');

  const onCreateRelationship = (event) => {
    event.preventDefault();
    setValidationError('');
    if (subjectEntityType === '' || objectEntityType === '' || name === '') {
      setValidationError(
        'Must select a subject entity type, object entity type, and relationship name'
      );
      return;
    }
    const input = {
      name,
      nameReversed,
      subjectEntityType: subjectEntityType as EntityType,
      objectEntityType: objectEntityType as EntityType,
    };
    createRelationship({ variables: { input } });
  };

  useEffect(() => {
    if (data?.createRelationship) {
      if (onSuccess) {
        return onSuccess(data.createRelationship);
      }
      window.alert('Relationship created successfully!');
      setSubjectEntityType('Person');
      setObjectEntityType('Instrument');
      setName('');
      setNameReversed('');
    }
  }, [data, router, onSuccess]);

  return (
    <>
      <h1 className="mb-4">Create Relationship</h1>
      <div className="flex flex-col align-start">
        <form onSubmit={onCreateRelationship}>
          <div className="mb-2">From this type of Entity:</div>
          <select
            value={subjectEntityType}
            onChange={(event) => setSubjectEntityType(event.target.value)}
            className="mb-4"
          >
            {Object.keys(EntityType).map((entityType, index) => (
              <option value={entityType} key={index}>
                {entityType}
              </option>
            ))}
          </select>
          <div className="mb-2">To this type of Entity:</div>
          <select
            value={objectEntityType}
            onChange={(event) => setObjectEntityType(event.target.value)}
            className="mb-4"
          >
            {Object.keys(EntityType).map((entityType, index) => (
              <option value={entityType} key={index}>
                {entityType}
              </option>
            ))}
          </select>
          <div className="mb-2">Describe the relationship:</div>
          <input
            placeholder="plays"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mb-4"
          />
          <div className="mb-2">Describe the relationship when reversed:</div>
          <input
            placeholder="is played by"
            value={nameReversed}
            onChange={(event) => setNameReversed(event.target.value)}
            className="mb-4"
          />
          <input
            type="submit"
            className="btn mb-4 w-auto"
            disabled={loading}
            value="Create"
          />
        </form>
      </div>

      {error && <div className="text-red-600 mb-2">{error.message}</div>}
      {validationError && <div className="text-red-600">{validationError}</div>}
    </>
  );
};

export default CreateRelationshipForm;
