import { Outlet } from 'umi';
import { ApolloProvider } from '@apollo/client';
import client from './client';

export default () => {
  return (
    <ApolloProvider client={client}>
      <Outlet />
    </ApolloProvider>
  );
};
