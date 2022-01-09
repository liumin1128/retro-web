import React from 'react';
import get from 'lodash/get';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface IUserInfoProps {
  avatarUrl: string;
  nickname: string;
}

const UserInfo: React.FunctionComponent<IUserInfoProps> = (props) => {
  const { avatarUrl = '', nickname = '' } = props;
  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <Avatar
        src={avatarUrl}
        sx={{ width: 20, height: 20, fontSize: 10, mr: 1 }}
      >
        {get(nickname, '[0]')}
      </Avatar>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: 12,
          color: 'palette.text.secondary',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {nickname}
      </Typography>
    </Box>
  );
};

export default UserInfo;
