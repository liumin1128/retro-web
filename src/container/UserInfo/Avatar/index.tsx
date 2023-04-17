import React, { useEffect } from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar/Avatar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Popover from '@/components/Popover';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useFindUserInfoLazyQuery } from '@/generated/graphql';
import { getStorage } from '@/utils/store';
import { USER_TOKEN } from '@/configs/base';
import { handleLogout } from '@/service/user';

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
    <Popover
      render={() => (
        <Box>
          <MenuList>
            <Link href="/user/profile" sx={{ color: 'inherit' }}>
              <MenuItem>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <PersonOutlineIcon sx={{ color: 'inherit' }} />
                </ListItemIcon>
                <ListItemText sx={{ color: 'inherit' }}>Profile</ListItemText>
                {/* <Typography variant="body2" color="text.secondary">
                ⌘X
              </Typography> */}
              </MenuItem>
            </Link>

            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon
                sx={{ color: (theme) => theme.palette.error.light }}
              >
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText
                sx={{ color: (theme) => theme.palette.error.light }}
              >
                Logout
              </ListItemText>
            </MenuItem>
          </MenuList>
        </Box>
      )}
    >
      <Avatar
        {...props}
        src={userInfo.data?.findUserInfo?.avatarUrl as string}
      />
    </Popover>
  );
};

export default MyAvatar;
