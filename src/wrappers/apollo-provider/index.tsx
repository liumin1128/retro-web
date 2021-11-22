import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import client from './apollo';

interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
