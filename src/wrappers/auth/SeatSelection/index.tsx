import { Outlet, Navigate } from 'umi';
import { useFindUserInfoQuery } from '@/generated/graphql';

export default () => {
  const { data } = useFindUserInfoQuery();

  const hasAuth =
    data?.findUserInfo?.tags?.findIndex((i) => i === 'ComTech') !== -1;

  if (!hasAuth) {
    return <Navigate to="/403" />;
  }

  return <Outlet />;
};
