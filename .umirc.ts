import routes from './src/configs/routes';

export default {
  npmClient: 'pnpm',
  hash: true,
  history: { type: 'hash' },
  publicPath: '/',
  define: {
    'process.env.API_URL': 'http://localhost:3101',
    'process.env.GRAPHQL_URL': 'http://localhost:3101/graphql',
    'process.env.GRAPHQL_URL_WS': 'ws://localhost:3101/graphql',
  },
  routes,
};
