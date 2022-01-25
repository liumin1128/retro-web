import * as React from 'react';
import { IRoute } from 'umi';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import AppBar from '@/components/AppBar';

const BaseLayout: React.FunctionComponent<IRoute> = (props) => {
  const { children } = props;
  return (
    <Stack
      spacing={2}
      sx={{
        backgroundImage: (theme) => theme.palette.background.gradient,
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box sx={{ overflow: 'auto' }}>{children}</Box>
    </Stack>
  );
};

export default BaseLayout;
