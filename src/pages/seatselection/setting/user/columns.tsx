import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default [
  {
    key: 'avatarUrl',
    title: 'AvatarUrl',
    dataIndex: 'avatarUrl',
    render: (i: string) => {
      return <Avatar src={i as string} />;
    },
  },
  { key: 'username', title: 'Username', dataIndex: 'username' },
  { key: 'nickname', title: 'Nickname', dataIndex: 'nickname' },
  {
    key: 'roles',
    title: 'Roles',
    dataIndex: 'roles',
    render: (i: string[]) => {
      return (
        <Stack direction="row" spacing={1}>
          {i.map((j: unknown) => {
            return (
              <Chip
                key={j.name}
                label={j.name}
                onDelete={() => {
                  alert('comming soon');
                }}
              />
            );
          })}
        </Stack>
      );
    },
  },
];
