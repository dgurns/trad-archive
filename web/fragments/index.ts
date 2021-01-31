import { gql } from '@apollo/client';

export const EntityFragments = {
  personEntity: gql`
    fragment PersonEntity on PersonEntity {
      id
      type
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
  placeEntity: gql`
    fragment PlaceEntity on PlaceEntity {
      id
      type
      name
      slug
      aliases
      description
      createdByUser {
        id
      }
      latitude
      longitude
    }
  `,
  instrumentEntity: gql`
    fragment InstrumentEntity on InstrumentEntity {
      id
      type
      name
      slug
      aliases
      description
      createdByUser {
        id
      }
    }
  `,
  tuneEntity: gql`
    fragment TuneEntity on TuneEntity {
      id
      type
      name
      slug
      aliases
      description
      createdByUser {
        id
      }
      composer
    }
  `,
};

export const ItemFragments = {
  audioItem: gql`
    fragment AudioItem on AudioItem {
      id
      type
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
