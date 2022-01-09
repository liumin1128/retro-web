import { gql } from '@apollo/client';

export interface Dynamic {
  _id: string;
  title: string;
  content: string;
}
export interface DynamicsResult {
  dynamics: Dynamic[];
}

export interface DynamicResult {
  dynamic: Dynamic;
}

export const DynamicFragment = gql`
  fragment dynamicFields on Dynamic {
    _id
    content
  }
`;

export const DynamicsQuery = gql`
  ${DynamicFragment}
  query Dynamics {
    dynamics {
      ...dynamicFields
    }
  }
`;

export const DynamicQuery = gql`
  ${DynamicFragment}
  query Dynamic($_id: ID!) {
    dynamic(_id: $_id) {
      ...dynamicFields
    }
  }
`;

export const CreateDynamic = gql`
  ${DynamicFragment}
  mutation CreateDynamic($content: String!) {
    createDynamic(input: { content: $content }) {
      ...dynamicFields
    }
  }
`;
