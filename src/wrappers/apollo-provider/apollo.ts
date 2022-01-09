import { history } from 'umi';
import {
  gql,
  ApolloClient,
  // createHttpLink,
  InMemoryCache,
  from,
  split,
} from '@apollo/client';
import { Observable } from 'rxjs';
// import get from 'lodash/get';
import { setContext } from '@apollo/client/link/context';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { getMainDefinition } from '@apollo/client/utilities';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getStorage } from '@/utils/store';
import { USER_TOKEN } from '@/configs/base';

import typeDefs from './typeDefs';

const wsclient = new SubscriptionClient(process.env.GRAPHQL_URL_WS, {
  reconnect: true,
});

// const observable = Observable.create();
const onSubscribe = (observer) => {
  // const Timer = setInterval(() => {
  //   observer.next(number++);
  // }, 1000);
  wsclient.onConnected(() => {
    console.log('onConnected');
    observer.next('onConnected');
  });

  wsclient.onConnecting(() => {
    console.log('onConnecting');
    observer.next('onConnecting');
  });

  wsclient.onDisconnected(() => {
    console.log('onDisconnected');
    observer.next('onDisconnected');
  });

  wsclient.onReconnected(() => {
    console.log('onReconnected');
    observer.next('onReconnected');
  });

  wsclient.onReconnecting(() => {
    console.log('onReconnecting');
    observer.next('onReconnecting');
  });
  return {
    unsubscribe: () => {
      // clearInterval(Timer);
    },
  };
};

export const source$ = new Observable(onSubscribe);

const wsLink = new WebSocketLink(wsclient);

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
