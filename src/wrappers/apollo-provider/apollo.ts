import {
  gql,
  ApolloClient,
  // createHttpLink,
  InMemoryCache,
  from,
  split,
} from '@apollo/client';
// import get from 'lodash/get';
import { setContext } from '@apollo/client/link/context';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { getMainDefinition } from '@apollo/client/utilities';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { history } from 'umi';
import { getStorage } from '@/utils/store';
import { USER_TOKEN } from '@/configs/base';

import typeDefs from './typeDefs';

const wsLink = new WebSocketLink({
  uri: process.env.GRAPHQL_URL_WS,
  options: {
    reconnect: true,
    // connectionParams: {
    //   authToken: user.authToken,
    // },
  },
});

const httpLink = new BatchHttpLink({
  uri: process.env.GRAPHQL_URL,
  batchMax: 5, // No more than 5 operations per batch
  batchInterval: 20, // Wait no more than 20ms after first batched operation
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// https://www.apollographql.com/docs/react/api/link/apollo-link-retry/
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error) => !!error,
  },
});

const authLink = setContext((_, { headers }) => {
  const token = getStorage(USER_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

// https://www.apollographql.com/docs/react/api/link/apollo-link-error/
// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log('errorLink networkError:', networkError);
  console.log('errorLink graphQLErrors:', graphQLErrors);
  if (graphQLErrors) {
    graphQLErrors.forEach((i) => {
      if (i.extensions.code === 'UNAUTHENTICATED') {
        history.push('/login');
        // window.location.href = 'https://react.mobi/api/oauth/wechat';
      }
    });
  }
});

const client = new ApolloClient({
  link: from([authLink, errorLink, retryLink, splitLink]),
  cache: new InMemoryCache(),
  typeDefs: gql(`${typeDefs}`),
  queryDeduplication: false,
});

export default client;
