import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Outlet, useLocation, history } from 'umi';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import MaterialUISwitch from '@/components/MaterialUISwitch';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TABS = [
  { title: 'Optional Date', pathname: '/seatselection/setting/date' },
  { title: 'Seat permissions', pathname: '/seatselection/setting/seat' },
  { title: 'User permissions', pathname: '/seatselection/setting/user' },
];

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Retro: React.FunctionComponent = () => {
  const location = useLocation();
  console.log(location);
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
      <Container sx={{ mt: 8 }}>
        <Stack direction="row" spacing={4}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={TABS.findIndex((i) => i.pathname === location.pathname)}
            onChange={(_, idx) => {
              history.push(TABS[idx].pathname);
            }}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', minWidth: 240 }}
          >
            {TABS.map((item, index) => {
              return (
                <Tab
                  key={item.pathname}
                  label={item.title}
                  sx={{
                    textAlign: 'right',
                    alignItems: 'flex-end',
                    fontSize: 16,
                    mb: 2,
                    px: 4,
                  }}
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
          <Outlet />
        </Stack>
      </Container>
    </Box>
  );
};

export default Retro;
