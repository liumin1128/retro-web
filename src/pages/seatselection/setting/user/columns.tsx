import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/EditOutlined';
import Button from '@mui/material/Button';

export default ({ onDeleteTag, onEdit }) => [
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
    key: 'index',
    title: 'Index',
    dataIndex: 'index',
    render: (_, row) => {
      return (
        <Stack>
          <Typography>{row?.index}</Typography>
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

  {
    key: 'actions',
    title: 'Actions',
    dataIndex: 'actions',
    render: (tags: string[], row) => {
      return (
        <Stack direction="row" flexWrap="wrap">
          <Button onClick={() => onEdit(row)}>
            <Stack spacing={1} direction="row">
              <Typography variant="caption">Edit</Typography>
              <EditIcon sx={{ fontSize: 'inherit' }} />
            </Stack>
          </Button>
        </Stack>
      );
    },
  },
];
