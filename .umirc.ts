import { defineConfig } from 'umi';
import routes from './src/configs/routes';

// https://github.com/umijs/umi/issues/5165

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: { type: 'hash' },
  routes: routes,
  fastRefresh: {},
  publicPath: './',
});
