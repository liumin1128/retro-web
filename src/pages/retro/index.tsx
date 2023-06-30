import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ListRetro from '@/container/Retro/List';
import CreateRetro from '@/container/Retro/Create';

const Retro: React.FunctionComponent = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3">Retro List</Typography>
        <CreateRetro />
      </Box>

      <br />
      <ListRetro />
    </Container>
  );
};

export default Retro;
