import { gql } from '@apollo/client';

export const UserFragment = gql`
  fragment userFields on User {
    __typename
    _id
  }
`;

export const UsersQuery = gql`
  ${UserFragment}
  query Users {
    users {
      ...userFields
    }
  }
`;

export const LoginQuery = gql`
  ${UserFragment}
  query Login($input: LoginUserInput) {
    login(input: $input) {
      user {
        ...userFields
      }
      token
    }
  }
`;
