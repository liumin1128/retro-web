import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import theme from '@/configs/theme';

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
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  );
};
