import * as React from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';
import UserInfo from '@/components/UserInfo/InfoCard';

const InfoCard: React.FunctionComponent = () => {
  const { loading, data } = useUserInfo();
  return (
    <UserInfo
      loading={loading}
      nickname={data?.findUserInfo?.nickname as string}
      avatarUrl={data?.findUserInfo?.avatarUrl as string}
    />
  );
};

export default InfoCard;
