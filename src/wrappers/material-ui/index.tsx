import React from 'react';
import { SnackbarProvider } from 'notistack';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { ThemeContextProvider } from '@/context/theme';
import { GlobalSettingsContextProvider } from '@/context/globalSettings';

Sentry.init({
  dsn: 'https://9f28ba0a767c45ada94e165d1050e826@o115968.ingest.sentry.io/6123765',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => {
  return (
    <GlobalSettingsContextProvider>
      <ThemeContextProvider>
        <SnackbarProvider maxSnack={1}>{children}</SnackbarProvider>
      </ThemeContextProvider>
    </GlobalSettingsContextProvider>
  );
};
