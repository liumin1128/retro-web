import { history } from 'umi';
import { Observable } from 'rxjs';
import { gql, split, InMemoryCache, ApolloClient, from } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { RetryLink } from '@apollo/client/link/retry';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getStorage, setStorage } from '@/utils/store';
import { USER_TOKEN, PATH_BEFORELOGIN } from '@/configs/base';
import { onError } from '@apollo/client/link/error';
import typeDefs from './typeDefs';

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.GRAPHQL_URL_WS as string,
  }),
);

const onSubscribe = (observer: { next: (arg0: string) => void }) => {
  wsLink.client.on('connected', () => {
    observer.next('connected');
  });
};

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

const authLink = setContext((_, { headers }) => {
  const token = getStorage(USER_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log('errorLink networkError:', networkError);
  console.log('errorLink graphQLErrors:', graphQLErrors);
  if (graphQLErrors) {
    graphQLErrors.forEach((i) => {
      if (i?.extensions?.code === 'UNAUTHENTICATED') {
        setStorage(PATH_BEFORELOGIN, history.location.pathname);
        history.push('/login');
      }
      if (i?.extensions?.code === 'INTERNAL_SERVER_ERROR') {
        window?.snackbar?.enqueueSnackbar(i.message, {
          variant: 'error',
        });
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
