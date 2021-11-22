import { gql } from '@apollo/client';

export interface RetroMessage {
  _id: string;
  title: string;
  content: string;
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

export const RETROMESSAGE_SUBSCRIPTION = gql`
  subscription retroMessageCreated {
    retroMessageCreated {
      _id
      content
    }
  }
`;
