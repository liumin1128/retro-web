import React from 'react';
import get from 'lodash/get';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface IUserInfoProps {
  avatar: string;
  nickname: string;
}

const UserInfo: React.FunctionComponent<IUserInfoProps> = (props) => {
  const { avatar = '', nickname = '' } = props;
  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      <Avatar
        src={avatar}
        sx={{ width: 20, height: 20, fontSize: 10, mr: 0.5 }}
      >
        {get(nickname, '[0]')}
      </Avatar>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: 12,
          color: '#666',
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
