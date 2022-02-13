import React from 'react';
import get from 'lodash/get';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getTimeAgo } from '@/utils/format';

interface IUserInfoProps {
  avatarUrl?: string | null | undefined;
  nickname?: string;
  createdAt?: string;
}

const UserInfo: React.FunctionComponent<IUserInfoProps> = (props) => {
  const { avatarUrl = '', nickname = '', createdAt = '' } = props;

  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <Avatar
        src={avatarUrl}
        sx={{ width: 36, height: 36, fontSize: 10, mr: 1 }}
      >
        {get(nickname, '[0]')}
      </Avatar>
      <Stack>
        <Typography
          variant="h6"
          sx={{
            fontSize: 14,
          }}
        >
          {nickname}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: '#666',
          }}
        >
          {getTimeAgo(parseInt(createdAt, 10))}
        </Typography>
      </Stack>
    </Box>
  );
};

export default UserInfo;
