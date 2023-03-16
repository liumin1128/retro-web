import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import MaterialUISwitch from '@/components/MaterialUISwitch';
import Grid from '@mui/material/Grid';

const Retro: React.FunctionComponent = () => {
  return (
    <Box>
      <AppBar color="default" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Seat Selection
          </Typography>
          <MaterialUISwitch />
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            111
          </Grid>

          <Grid item xs={8}>
            111
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Retro;
