import * as React from 'react';
import { IRoute } from 'umi';
import Box from '@mui/material/Box';

const BaseLayout: React.FunctionComponent<IRoute> = (props) => {
  const { children } = props;

  return (
    <Box
      sx={(theme) => ({
        backgroundImage: theme.palette.background.gradient,
        width: '100vw',
        height: '100vh',
      })}
    >
      {children}
    </Box>
  );
};

export default BaseLayout;
