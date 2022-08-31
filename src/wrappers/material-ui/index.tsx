import { Outlet } from 'umi';
import { SnackbarProvider } from 'notistack';
import { ThemeContextProvider } from '@/context/theme';
import { GlobalSettingsContextProvider } from '@/context/globalSettings';

export default () => {
  return (
    <GlobalSettingsContextProvider>
      <ThemeContextProvider>
        <SnackbarProvider maxSnack={1}>
          <Outlet />
        </SnackbarProvider>
      </ThemeContextProvider>
    </GlobalSettingsContextProvider>
  );
};
