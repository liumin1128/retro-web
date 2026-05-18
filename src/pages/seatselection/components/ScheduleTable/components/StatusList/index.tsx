import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import statusOptions from '../../statusList';

const list = [
  ...statusOptions,
  {
    value: 'DT',
    label: 'Duty Travel',
    bgcolor: '#f5f5f5',
    color: '#fed563',
  },
  {
    value: 'Other',
    label: 'Other',
    bgcolor: '#f5f5f5',
    color: '#fed563',
  },
];

interface Props {
  value?: string;
  onChange: (status: string, comment?: string) => void;
}

export default function StatusList({ value = 'Office', onChange }: Props) {
  const [status, setStatus] = useState(value);

  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <Stack spacing={2}>
      <Box sx={{ maxWidth: 300 }}>
        {list.map((i) => {
          return (
            <Button
              key={i.value}
              onClick={() => {
                setStatus(i.value);
                if (i.value !== 'Other') {
                  onChange(i.value);
                }
              }}
              variant={status === i.value ? 'contained' : 'outlined'}
              sx={{ width: '64px', height: '32px', borderRadius: '0px' }}
            >
              {i.value}
            </Button>
          );
        })}
      </Box>

      {status === 'Other' && (
        <>
          <Typography variant="caption">comments:</Typography>

          <TextField
            fullWidth
            multiline
            autoFocus
            rows={3}
            InputProps={{
              sx: {
                borderRadius: 0,
              },
            }}
            inputRef={ref}
          />

          <Box>
            <Button
              variant="contained"
              sx={{ width: '64px', height: '32px', borderRadius: '0px' }}
              onClick={() => {
                onChange('Other', ref?.current?.value);
              }}
            >
              Submit
            </Button>
          </Box>
        </>
      )}
    </Stack>
  );
}
