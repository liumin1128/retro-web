import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

export default function Variants() {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Stack>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={40} />
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="text" width="50%" />
        </Stack>
        <Skeleton variant="rectangular" width={210} height={118} />
      </Stack>
    </Paper>
  );
}
