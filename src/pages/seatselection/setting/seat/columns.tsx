import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/EditOutlined';

export default ({ onEditTags, onSwitchDisabled }) => [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
  },
  {
    key: 'disabled',
    title: 'Status',
    dataIndex: 'disabled',
    render: (disabled, row) => {
      return (
        <Switch
          checked={!disabled}
          onChange={(_, value) => {
            onSwitchDisabled(row?._id, !value);
          }}
        />
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
          <Stack>
            {Array.isArray(tags) &&
              tags.map((tag: string) => {
                return <Chip key={tag} label={tag} />;
              })}
          </Stack>
          <Button onClick={() => onEditTags(row)}>
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
