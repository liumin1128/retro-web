import { defineConfig } from 'umi';
import routes from '../src/configs/routes';

export default defineConfig({
  routes,
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: { type: 'hash' },
  fastRefresh: {},
  publicPath: './',
  define: {
    'process.env.GRAPHQL_URL': 'http://localhost:3101/graphql',
    'process.env.GRAPHQL_URL_WS': 'ws://localhost:3101/graphql',
  },
});
