import { gql } from '@apollo/client';

export const RelationshipFragments = {
  relationship: gql`
    fragment Relationship on Relationship {
      id
      type
      subjectEntityType
      objectEntityType
    }
  `,
};

export const TagFragments = {
  tag: gql`
    fragment Tag on Tag {
      id
      relationship {
        ...Relationship
      }
      objectAudioItem {
        name
        slug
      }
      objectPerson {
        name
        slug
      }
      objectInstrument {
        name
        slug
      }
    }
    ${RelationshipFragments.relationship}
  `,
};

export const EntityFragments = {
  audioItem: gql`
    fragment AudioItem on AudioItem {
      id
      type
      name
      slug
      aliases
      description
      tags {
        ...Tag
      }
      createdByUser {
        id
        username
      }
      createdAt
      updatedAt
      urlSource
    }
    ${TagFragments.tag}
  `,
  person: gql`
    fragment Person on Person {
      id
      type
      name
      slug
      aliases
      description
      tags {
        ...Tag
      }
      createdByUser {
        id
        username
      }
      createdAt
      updatedAt
      firstName
      middleName
      lastName
    }
    ${TagFragments.tag}
  `,
  instrument: gql`
    fragment Instrument on Instrument {
      id
      type
      name
      slug
      aliases
      description
      tags {
        ...Tag
      }
      createdByUser {
        id
        username
      }
    }
    ${TagFragments.tag}
  `,
};
