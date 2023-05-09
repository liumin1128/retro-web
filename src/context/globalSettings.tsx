import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { STORE_THEME_KEY } from '@/configs/base';
import { getStorage, setStorage } from '@/utils/store';

// eslint-disable-next-line no-shadow
export enum ITypes {
  CHANGE = 'CHANGE',
}

export interface GlobalSettings {
  paletteMode: 'dark' | 'light';
}

export interface IPayload {
  paletteMode: 'dark' | 'light';
}

export interface IAction {
  type: ITypes;
  payload: IPayload;
}

const defaultValue: IPayload = {
  paletteMode: 'dark',
};

const GlobalSettingsContext = createContext<IPayload>(defaultValue);

export const useGlobalSettingsContext = () => {
  return useContext(GlobalSettingsContext);
};

const DispatchGlobalSettingsContext = createContext<
  Dispatch<IAction> | undefined
>(undefined);

export const useDispatchGlobalSettingsContext = () => {
  return useContext(DispatchGlobalSettingsContext);
};

export const reducer = (
  state: GlobalSettings,
  action: IAction,
): GlobalSettings => {
  switch (action.type) {
    case ITypes.CHANGE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      throw new Error(`Unrecognized type ${action.type}`);
  }
};

export const useGlobalSettingsReducer = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const paletteMode =
    getStorage(STORE_THEME_KEY) || (prefersDarkMode ? 'dark' : 'light');
  const initializerArg: IPayload = {
    paletteMode,
  };
  return useReducer(reducer, initializerArg);
};

export interface Props {
  children: ReactNode;
}

export const GlobalSettingsContextProvider = ({ children }: Props) => {
  const [globalSettings, dispatch] = useGlobalSettingsReducer();

  return (
    <GlobalSettingsContext.Provider value={globalSettings}>
      <DispatchGlobalSettingsContext.Provider value={dispatch}>
        {children}
      </DispatchGlobalSettingsContext.Provider>
    </GlobalSettingsContext.Provider>
  );
};

export function useChangeThemePaletteMode() {
  const dispatch = useDispatchGlobalSettingsContext();

  return (paletteMode: 'dark' | 'light') => {
    setStorage(STORE_THEME_KEY, paletteMode);
    if (dispatch) {
      dispatch({
        type: ITypes.CHANGE,
        payload: { paletteMode },
      });
    }
  };
}
