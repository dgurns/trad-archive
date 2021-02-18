import { gql } from '@apollo/client';

export const RelationshipFragments = {
  relationship: gql`
    fragment Relationship on Relationship {
      id
      name
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
      subjectAudioItem {
        id
        entityType
        name
        slug
      }
      subjectPerson {
        entityType
        id
        name
        slug
      }
      subjectInstrument {
        id
        entityType
        name
        slug
      }
      objectAudioItem {
        id
        entityType
        name
        slug
      }
      objectPerson {
        id
        entityType
        name
        slug
      }
      objectInstrument {
        id
        entityType
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
      entityType
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
      entityType
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
      entityType
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

export const UserFragments = {
  user: gql`
    fragment User on User {
      id
      username
      createdAt
    }
  `,
};
