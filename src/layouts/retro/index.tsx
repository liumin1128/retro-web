import { Outlet, history } from 'umi';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import UserAvatar from '@/container/UserInfo/Avatar';
import MaterialUISwitch from '@/components/MaterialUISwitch';
import Logo from '@/components/Icon/Logo';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import NavTabs from './NavTabs';
import NavMenus from './NavMenus';

const BaseLayout = () => {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => {
    setVisible(!visible);
  };

  return (
    <Box
      sx={{
        // position: 'fixed',
        // left: 0,
        // top: 0,
        width: '100vw',
        height: '100vh',

        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Stack
              direction="row"
              spacing={2}
              style={{ alignItems: 'center', width: '100%' }}
            >
              {/* <IconButton
                onClick={() => {
                  history.push('/');
                }}
              >
                <Logo sx={{ width: 40, height: 40, color: '#000' }} />
              </IconButton> */}
              {!isUpMd && (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleMenu}
                >
                  <MenuIcon />
                </IconButton>
              )}
              {isUpMd && <NavTabs />}
              <div style={{ flex: 1 }} />
              <MaterialUISwitch />
              <UserAvatar />
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ overflow: 'auto', flex: 1, height: '100%' }}>
        <Outlet />
      </Box>

      <Drawer open={visible} onClose={toggleMenu}>
        <Box sx={{ width: '240px' }}>
          <NavMenus onClick={toggleMenu} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default BaseLayout;
