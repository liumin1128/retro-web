import routes from './src/configs/routes';

export default {
  routes,
  hash: true,
  publicPath: '/',
  npmClient: 'pnpm',
  history: { type: 'hash' },
  favicons: ['/favicon/4.svg', '/favicon/4.ico'],
  esbuildMinifyIIFE: true,
};
