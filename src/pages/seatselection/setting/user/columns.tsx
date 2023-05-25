import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default ({ onDeleteTag }) => [
  {
    key: 'avatarUrl',
    title: 'AvatarUrl',
    dataIndex: 'avatarUrl',
    render: (i: string) => {
      return <Avatar src={i as string} />;
    },
  },
  { key: 'nickname', title: 'Nickname', dataIndex: 'nickname' },
  { key: 'username', title: 'Username', dataIndex: 'username' },
  {
    key: 'tags',
    title: 'Tags',
    dataIndex: 'tags',
    render: (tags: string[], row) => {
      return (
        <Stack direction="row" spacing={1}>
          {tags.map((tag: string) => {
            return (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => {
                  onDeleteTag(row, tag);
                }}
              />
            );
          })}
        </Stack>
      );
    },
  },
];
