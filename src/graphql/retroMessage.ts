import { gql } from '@apollo/client';

export interface RetroMessage {
  _id: string;
  title: string;
  content: string;
  status: string;
}

export interface RetroMessagesResult {
  retroMessages: RetroMessage[];
}

export interface RetroMessageResult {
  retroMessage: RetroMessage;
}

export const RETROMESSAGE_FRAGMENT = gql`
  fragment comparisonFields on RetroMessage {
    _id
    content
    status
  }
`;

export const RETROMESSAGES_QUERY = gql`
  ${RETROMESSAGE_FRAGMENT}
  query RetroMessages {
    retroMessages {
      ...comparisonFields
    }
  }
`;

export const RETROMESSAGE_QUERY = gql`
  ${RETROMESSAGE_FRAGMENT}
  query RetroMessage($_id: ID!) {
    retroMessage(_id: $_id) {
      ...comparisonFields
    }
  }
`;

export const CREATE_RETROMESSAGE = gql`
  ${RETROMESSAGE_FRAGMENT}
  mutation CreateRetroMessage($content: String!) {
    createRetroMessage(input: { content: $content }) {
      ...comparisonFields
    }
  }
`;

export const UPDATE_RETROMESSAGE = gql`
  ${RETROMESSAGE_FRAGMENT}
  mutation UpdateRetroMessage($_id: ID!, $content: String!) {
    updateRetroMessage(_id: $_id, input: { content: $content }) {
      ...comparisonFields
    }
  }
`;

export const DELETE_RETROMESSAGE = gql`
  ${RETROMESSAGE_FRAGMENT}
  mutation DeleteRetroMessage($_id: ID!) {
    deleteRetroMessage(_id: $_id) {
      ...comparisonFields
    }
  }
`;

export const CREATE_RETROMESSAGE_SUBSCRIPTION = gql`
  ${RETROMESSAGE_FRAGMENT}
  subscription retroMessageCreated {
    retroMessageCreated {
      ...comparisonFields
    }
  }
`;

export const UPDATE_RETROMESSAGE_SUBSCRIPTION = gql`
  ${RETROMESSAGE_FRAGMENT}
  subscription retroMessageUpdated {
    retroMessageUpdated {
      ...comparisonFields
    }
  }
`;

export const DELETE_RETROMESSAGE_SUBSCRIPTION = gql`
  ${RETROMESSAGE_FRAGMENT}
  subscription retroMessageDeleted {
    retroMessageDeleted {
      ...comparisonFields
    }
  }
`;
