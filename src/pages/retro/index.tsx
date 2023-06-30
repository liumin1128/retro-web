import React from 'react';
import Container from '@mui/material/Container';
import ListRetro from '@/container/Retro/List';
import Grid from '@mui/material/Grid';

const Retro: React.FunctionComponent = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ListRetro />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Retro;
