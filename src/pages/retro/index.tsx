import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import CreateRetro from '@/container/Retro/Create';
import UserAvatar from '@/container/UserInfo/Avatar';
import ListRetro from '@/container/Retro/List';
import MaterialUISwitch from '@/components/MaterialUISwitch';
import Logo from '@/components/Icon/Logo';
import Grid from '@mui/material/Grid';
import { history } from 'umi';

const Retro: React.FunctionComponent = () => {
  return (
    <Box>
      <AppBar color="default" position="static">
        <Toolbar>
          <IconButton
            onClick={() => {
              history.push('/');
            }}
          >
            <Logo sx={{ width: 40, height: 40, color: '#000' }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Retro List
          </Typography>
          <CreateRetro />
          <MaterialUISwitch />
          <UserAvatar />
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ListRetro />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Retro;
