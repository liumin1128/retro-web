import { Outlet, history } from 'umi';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
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
import { useHeaderContext } from '@/context/useHeaderContext';
import NavTabs from './NavTabs';
import NavMenus from './NavMenus';

const BaseLayout = () => {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [visible, setVisible] = useState(false);
  const { headerContent } = useHeaderContext();

  const toggleMenu = () => {
    setVisible(!visible);
  };

  return (
    <Box
      sx={{
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
              <IconButton
                onClick={() => {
                  history.push('/');
                }}
              >
                <Logo sx={{ width: 40, height: 40 }} fill="#ffffff" />
              </IconButton>
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
              {headerContent}
              <MaterialUISwitch />
              <UserAvatar />
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ overflow: 'auto', flex: 1, height: '100%' }}>
        <Outlet />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link
          sx={{ color: '#666', fontSize: 12 }}
          component="a"
          href="https://beian.miit.gov.cn/"
          target="_blank"
        >
          吉ICP备15006191号-2
        </Link>
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
