import React, {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from '@/configs/theme';
import darkTheme from '@/configs/theme.dark';
import { getStorage, setStorage } from '@/utils/store';
import { STORE_THEME_KEY } from '@/configs/base';

export interface ThemeContenxt {
  theme?: string;
  setTheme?: Dispatch<SetStateAction<string>>;
}

export interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContenxt>({});

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const defaultThemeKey = getStorage(STORE_THEME_KEY);

  const [theme, setTheme] = useState<string>(defaultThemeKey || 'default');
  const themeValue = useMemo(
    () => ({
      theme,
      setTheme: (key: string) => {
        setTheme(key);
        setStorage(STORE_THEME_KEY, key);
      },
    }),
    [theme],
  );
  return (
    <ThemeContext.Provider value={themeValue}>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : defaultTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
