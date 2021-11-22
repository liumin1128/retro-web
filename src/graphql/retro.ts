import { gql } from '@apollo/client';

export interface Retro {
  _id: string;
  title: string;
  content: string;
}
export interface RetrosResult {
  retros: Retro[];
}

export interface RetroResult {
  retro: Retro;
}

export const RetroFragment = gql`
  fragment comparisonFields on Retro {
    _id
    content
  }
`;

export const RetrosQuery = gql`
  ${RetroFragment}
  query Retros {
    retros {
      ...comparisonFields
    }
  }
`;

export const RetroQuery = gql`
  ${RetroFragment}
  query Retro($_id: ID!) {
    retro(_id: $_id) {
      ...comparisonFields
    }
  }
`;

export const CreateRetro = gql`
  ${RetroFragment}
  mutation CreateRetro($content: String!) {
    createRetro(input: { content: $content }) {
      ...comparisonFields
    }
  }
`;

export const RETRO_SUBSCRIPTION = gql`
  subscription retroCreated {
    retroCreated {
      _id
      content
    }
  }
`;
