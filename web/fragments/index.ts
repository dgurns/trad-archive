import { gql } from '@apollo/client';

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
      }
      createdAt
      updatedAt
      urlSource
      urlMp3
    }
  `,
};
