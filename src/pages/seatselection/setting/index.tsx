import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import UserAvatar from '@/container/UserInfo/Avatar';
import { Outlet, useLocation, history, Navigate } from 'umi';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import MaterialUISwitch from '@/components/MaterialUISwitch';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useFindUserInfoQuery } from '@/generated/graphql';

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
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const { data } = useFindUserInfoQuery();

  const hasAuth =
    data?.findUserInfo?.tags?.findIndex((i) => i === 'SeatSelectionAdmin1') !==
    -1;

  if (!hasAuth) {
    return <Navigate to="/403" />;
  }

  return (
    <Box>
      <AppBar color="default" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Seat Selection */}
          </Typography>
          <MaterialUISwitch />
          <UserAvatar />
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md="auto">
            <Tabs
              orientation="vertical"
              // orientation={isUpMd ? 'vertical' : 'horizontal'}
              variant="scrollable"
              value={TABS.findIndex((i) => i.pathname === location.pathname)}
              onChange={(_, idx) => {
                history.push(TABS[idx].pathname);
              }}
              aria-label="Vertical tabs example"
              sx={
                isUpMd
                  ? {
                      borderRight: 1,
                      borderColor: 'divider',
                      minWidth: 240,
                      height: '100%',
                    }
                  : {}
              }
            >
              {TABS.map((item, index) => {
                return (
                  <Tab
                    key={item.pathname}
                    label={item.title}
                    sx={{
                      textAlign: 'right',
                      alignItems: 'flex-end',
                      // fontSize: 16,
                      mb: 2,
                      px: 4,
                    }}
                    {...a11yProps(index)}
                  />
                );
              })}
            </Tabs>
          </Grid>

          <Grid item xs={12} md>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Retro;
