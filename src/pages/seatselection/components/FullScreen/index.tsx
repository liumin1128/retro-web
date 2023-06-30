import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

interface FullScreenProps {
  fullScreen: boolean;
  children: React.ReactNode;
  renderToolbar: () => React.ReactNode;
}

export default ({ fullScreen, children, renderToolbar }: FullScreenProps) => {
  return (
    <Box
      sx={
        fullScreen
          ? {
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 99,
            }
          : {}
      }
    >
      {fullScreen && (
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>{renderToolbar()}</Toolbar>
        </AppBar>
      )}
      <Box>{children}</Box>
    </Box>
  );
};
