import { gql } from '@apollo/client';

export interface Retro {
  _id: string;
  title: string;
  content: string;
  date: string;
}
export interface RetrosResult {
  retros: Retro[];
}

export interface RetroResult {
  retro: Retro;
}

export const RetroFragment = gql`
  fragment retroFields on Retro {
    __typename
    _id
    title
    content
    date
    user {
      _id
      nickname
      avatarUrl
    }
  }
`;

export const RetrosQuery = gql`
  ${RetroFragment}
  query Retros {
    retros {
      ...retroFields
    }
  }
`;

export const RetroQuery = gql`
  ${RetroFragment}
  query Retro($_id: ID!) {
    retro(_id: $_id) {
      ...retroFields
    }
  }
`;

export const CreateRetro = gql`
  ${RetroFragment}
  mutation CreateRetro($title: String, $content: String, $date: String!) {
    createRetro(input: { title: $title, content: $content, date: $date }) {
      ...retroFields
    }
  }
`;

export const RETRO_SUBSCRIPTION = gql`
  ${RetroFragment}
  subscription retroCreated {
    retroCreated {
      ...retroFields
    }
  }
`;
