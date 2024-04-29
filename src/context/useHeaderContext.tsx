import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface HeaderProviderProps {
  children: ReactNode;
}

export interface HeaderContenxt {
  headerContent?: ReactNode;
  setHeaderContent: Dispatch<SetStateAction<ReactNode>>;
}

// 创建Context对象
const HeaderContext = createContext<HeaderContenxt>({
  headerContent: undefined,
  setHeaderContent: (node: SetStateAction<ReactNode>) => {
    if (!node) {
      throw new Error('setHeaderContent function must be overridden');
    }
  },
});

// Context提供者组件
export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [headerContent, setHeaderContent] = useState<ReactNode>();

  const value = useMemo(
    () => ({ headerContent, setHeaderContent }),
    [headerContent],
  );

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};

// Hook用于页面和组件访问和更新header内容
export const useHeaderContext = () => useContext(HeaderContext);
