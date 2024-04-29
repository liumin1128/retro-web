import { Outlet } from 'umi';
import { HeaderProvider } from '@/context/useHeaderContext';

export default () => {
  return (
    <HeaderProvider>
      <Outlet />
    </HeaderProvider>
  );
};
