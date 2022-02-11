import React, { useEffect } from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar/Avatar';
import { useFindUserInfoLazyQuery } from '@/generated/graphql';
import { getStorage } from '@/utils/store';
import { USER_TOKEN } from '@/configs/base';

type IMyAvatarProps = Omit<AvatarProps, 'src'>;

const MyAvatar: React.FunctionComponent<IMyAvatarProps> = (props) => {
  const [fetch, userInfo] = useFindUserInfoLazyQuery();

  useEffect(() => {
    const token = getStorage(USER_TOKEN);
    if (token) {
      fetch();
    }
  }, [fetch]);

  return (
    <Avatar {...props} src={userInfo.data?.findUserInfo?.avatarUrl as string} />
  );
};

export default MyAvatar;
