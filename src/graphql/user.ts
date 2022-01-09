import { gql } from '@apollo/client';

export const UserFragment = gql`
  fragment comparisonFields on User {
    __typename
    _id
  }
`;

export const UsersQuery = gql`
  ${UserFragment}
  query Users {
    users {
      ...comparisonFields
    }
  }
`;

export const LoginQuery = gql`
  ${UserFragment}
  query Login($input: LoginUserInput) {
    login(input: $input) {
      user {
        ...comparisonFields
      }
      token
    }
  }
`;
