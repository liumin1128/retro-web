import { Outlet } from 'umi';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://9f28ba0a767c45ada94e165d1050e826@o115968.ingest.sentry.io/6123765',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

export default () => {
  return <Outlet />;
};
