import React, {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
} from 'react';

export interface UserBaseInfo {
  _id: string;
  username: string;
  avatar: string;
  role: string;
}

export interface UserInfo extends UserBaseInfo {
  [key: string]: string;
}

export interface User {
  // token?: string;
  userinfo?: UserInfo;
}

export interface UContenxt {
  user?: User;
  setUser?: Dispatch<SetStateAction<User>>;
}

export interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UContenxt>({});

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User>({});
  const userValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );
  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
