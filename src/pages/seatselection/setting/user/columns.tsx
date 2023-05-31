import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
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
  {
    key: 'nickname',
    title: 'Nickname',
    dataIndex: 'nickname',
    render: (_, row) => {
      return (
        <Stack>
          <Typography>{row?.nickname}</Typography>
          <Typography variant="caption">{row?.username}</Typography>
        </Stack>
      );
    },
  },
  {
    key: 'tags',
    title: 'Tags',
    dataIndex: 'tags',
    render: (tags: string[], row) => {
      return (
        <Stack direction="row" flexWrap="wrap">
          {tags.map((tag: string) => {
            return (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => {
                  onDeleteTag(row, tag);
                }}
                sx={{ mr: 1, mb: 1 }}
              />
            );
          })}
        </Stack>
      );
    },
  },
];
