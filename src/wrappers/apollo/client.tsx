import { Observable } from 'rxjs';
import { gql, split, InMemoryCache, ApolloClient, from } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getStorage } from '@/utils/store';
import { USER_TOKEN } from '@/configs/base';
import { rememberLoginRedirectPath } from '@/service/user';
import typeDefs from './typeDefs';

const UNAUTHENTICATED_ERROR_CODE = 'UNAUTHENTICATED';
const INTERNAL_SERVER_ERROR_CODE = 'INTERNAL_SERVER_ERROR';

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.GRAPHQL_URL_WS as string,
  }),
);

function onSubscribe(observer: { next: (value: string) => void }): void {
  wsLink.client.on('connected', () => {
    observer.next('connected');
  });
}

export const source$ = new Observable(onSubscribe);

const httpLink = new BatchHttpLink({
  uri: process.env.GRAPHQL_URL,
  batchMax: 5, // No more than 5 operations per batch
  batchInterval: 20, // Wait no more than 20ms after first batched operation
});

// const httpLink = new HttpLink({
//     uri: process.env.GRAPHQL_URL as string,
// });

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
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

function getUserToken(): string | undefined {
  const token = getStorage(USER_TOKEN);
  return typeof token === 'string' ? token : undefined;
}

const authLink = setContext((_, { headers }) => {
  const token = getUserToken();
  return {
    authToken: token,
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

function autoLogout(requestToken?: string): void {
  if (requestToken !== getUserToken()) {
    return;
  }

  rememberLoginRedirectPath();
  window.location.replace('/#/login');
}

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  console.log('errorLink networkError:', networkError);
  console.log('errorLink graphQLErrors:', graphQLErrors);
  if (graphQLErrors) {
    const { authToken } = operation.getContext() as { authToken?: string };

    graphQLErrors.forEach((i) => {
      switch (i?.extensions?.code) {
        case UNAUTHENTICATED_ERROR_CODE:
          autoLogout(authToken);
          break;
        case INTERNAL_SERVER_ERROR_CODE:
          window?.snackbar?.enqueueSnackbar(i.message, {
            variant: 'error',
          });
          break;
        default:
          break;
      }
    });
  }
});

const client = new ApolloClient({
  link: from([authLink, errorLink, retryLink, splitLink]),
  cache: new InMemoryCache(),
  typeDefs: gql(`${typeDefs}`),
  queryDeduplication: false,
  connectToDevTools: true,
});

export default client;
