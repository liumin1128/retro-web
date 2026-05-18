import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/EditOutlined';
import { SeatFieldsFragment } from '@/generated/graphql';

interface GetColumnsArgs {
  onEditTags: (row: SeatFieldsFragment) => void;
  onSwitchDisabled: (id: string, disabled: boolean) => void;
}

export default function getColumns({
  onEditTags,
  onSwitchDisabled,
}: GetColumnsArgs) {
  return [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: 'disabled',
      title: 'Status',
      dataIndex: 'disabled',
      render: (disabled: boolean, row: SeatFieldsFragment) => {
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
      render: (tags: string[], row: SeatFieldsFragment) => {
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
}
