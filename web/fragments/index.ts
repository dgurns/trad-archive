import { gql } from '@apollo/client';

export const EntityFragments = {
  personEntity: gql`
    fragment PersonEntity on PersonEntity {
      id
      entityType
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
      itemType
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
