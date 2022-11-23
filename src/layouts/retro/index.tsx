import { Outlet } from 'umi';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const BaseLayout = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        backgroundImage: (theme) => theme.palette.gradients.primary,
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default BaseLayout;
