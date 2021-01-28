import { gql } from '@apollo/client';

export const EntityFragments = {
  personEntity: gql`
    fragment PersonEntity on PersonEntity {
      id
      name
      slug
      aliases
      description
      createdByUser {
        id
      }
      firstName
      middleName
      lastName
    }
  `,
};

export const ItemFragments = {
  audioItem: gql`
    fragment AudioItem on AudioItem {
      id
      title
      description
      addedByUser {
        id
        username
      }
      tags {
        id
        personEntity {
          name
          slug
        }
      }
      createdAt
      updatedAt
      urlSource
      urlMp3
    }
  `,
};
