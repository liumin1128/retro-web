import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Log } from '../types';

interface Props {
  logs: Record<string, Log>;
}

function getLogColor(status: string): string {
  if (status === 'success') {
    return 'green';
  }

  if (status === 'error') {
    return 'red';
  }

  return '';
}

export default function SubmitLogs({ logs }: Props) {
  return (
    <Stack>
      {Object.keys(logs).map((key) => {
        return (
          <Typography
            key={key}
            variant="caption"
            color={getLogColor(logs[key].status)}
          >
            {key} - {logs[key].text}
          </Typography>
        );
      })}
    </Stack>
  );
}
