import { useEffect } from 'react';
import { useFindUserInfoLazyQuery } from '@/generated/graphql';
import { getStorage } from '@/utils/store';
import { USER_TOKEN } from '@/configs/base';

export const useUserInfo = () => {
  const [fetch, userInfo] = useFindUserInfoLazyQuery();

  useEffect(() => {
    const token = getStorage(USER_TOKEN);
    if (token) {
      fetch();
    }
  }, [fetch]);

  return userInfo;
};
