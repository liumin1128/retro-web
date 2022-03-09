import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Variants() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rectangular" height={64} width="100%" />
      <Stack direction="row" sx={{ justifyContent: 'center' }} spacing={4}>
        {[1, 2, 3].map((i) => {
          return (
            <Stack key={i} spacing={1} sx={{ alignItems: 'center' }}>
              <Typography component="div" variant="body1">
                <Skeleton width={48} />
              </Typography>
              <Typography component="div" variant="caption">
                <Skeleton width={32} />
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
