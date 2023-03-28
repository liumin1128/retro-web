import { Navigate, Outlet } from 'umi';

export default () => {
  const logined = false;
  if (!logined) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
