import { Outlet, history } from 'umi';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import UserAvatar from '@/container/UserInfo/Avatar';
import MaterialUISwitch from '@/components/MaterialUISwitch';
import Logo from '@/components/Icon/Logo';
import NavTabs from './NavTabs';

const BaseLayout = () => {
  return (
    <Stack spacing={2}>
      <AppBar color="default" position="static">
        <Toolbar>
          <Stack
            direction="row"
            spacing={2}
            style={{ alignItems: 'center', width: '100%' }}
          >
            <IconButton
              onClick={() => {
                history.push('/');
              }}
            >
              <Logo sx={{ width: 40, height: 40, color: '#000' }} />
            </IconButton>
            <NavTabs />
            <div style={{ flex: 1 }} />
            <MaterialUISwitch />
            <UserAvatar />
          </Stack>
        </Toolbar>
      </AppBar>
      <Box sx={{ overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default BaseLayout;
