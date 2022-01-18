import { ReactNode, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useGlobalSettingsContext } from '@/context/globalSettings';
import darkTheme from '@/configs/theme.dark';
import lightTheme from '@/configs/theme.light';

const themeMap = {
  dark: darkTheme,
  light: lightTheme,
};

export interface IProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: IProps) => {
  const globalSettings = useGlobalSettingsContext();
  const { paletteMode } = globalSettings;

  const theme = useMemo(() => themeMap[paletteMode], [paletteMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
