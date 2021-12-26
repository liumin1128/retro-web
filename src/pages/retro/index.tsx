import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CreateRetro from '@/container/Retro/Create';
import ListRetro from '@/container/Retro/List';

const Retro: React.FunctionComponent = () => {
  return (
    <Container>
      <Card sx={{ paddingY: 2 }}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Retro List</Typography>
          <CreateRetro />
        </Box>
        <ListRetro />
      </Card>
    </Container>
  );
};

export default Retro;
