import * as React from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Skeleton from './Skeleton';

interface IUserInfoProps {
  loading: boolean;
  nickname: string;
  avatarUrl: string;
}

const UserInfo: React.FunctionComponent<IUserInfoProps> = (props) => {
  const { loading, nickname, avatarUrl } = props;
  if (loading) {
    return <Skeleton />;
  }
  const list = [
    {
      key: 'follow',
      label: '关注',
      count: 233,
    },
    {
      key: 'fans',
      label: '粉丝',
      count: 233,
    },
    {
      key: 'dynamic',
      label: '动态',
      count: 233,
    },
  ];
  return (
    <Stack>
      <Stack
        sx={{
          paddingTop: '72px',
          bgcolor: '#cccccc',
        }}
      />

      <Stack direction="row" spacing={2} sx={{ px: 3, mt: 1 }}>
        <Avatar src={avatarUrl} sx={{ mt: -3, width: 48, height: 48 }} />
        <Typography sx={{ fontWeight: 'bolder' }}>{nickname}</Typography>
      </Stack>

      <Stack
        direction="row"
        sx={{ justifyContent: 'center', my: 2 }}
        spacing={4}
      >
        {list.map((i) => {
          return (
            <Stack key={i.key} sx={{ alignItems: 'center' }}>
              <Typography variant="body1">{i.count}</Typography>
              <Typography variant="caption">{i.label}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default UserInfo;
