import routes from './src/configs/routes';

export default {
  routes,
  hash: true,
  publicPath: '/',
  npmClient: 'pnpm',
  history: { type: 'hash' },
  favicons: ['/favicon/4.svg', '/favicon/4.ico'],
  define: {
    'process.env.API_URL': 'http://localhost:3101',
    'process.env.GRAPHQL_URL': 'http://localhost:3101/graphql',
    'process.env.GRAPHQL_URL_WS': 'ws://localhost:3101/graphql',
  },
};
