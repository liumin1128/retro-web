import { defineConfig } from 'umi';
import routes from '../src/configs/routes';

export default defineConfig({
  fastRefresh: {},
  routes,
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: { type: 'hash' },
  publicPath: './',
  define: {
    'process.env.API_URL': 'http://localhost:3101',
    'process.env.GRAPHQL_URL': 'http://localhost:3101/graphql',
    'process.env.GRAPHQL_URL_WS': 'ws://localhost:3101/graphql',
  },
  chainWebpack(config) {
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .exclude.add(/node_modules/)
      .end()
      .use('graphql')
      .loader('graphql-tag/loader');

    config.module
      .rule('exclude')
      .exclude.add(/\.(graphql|gql)$/)
      .end();
  },
});
