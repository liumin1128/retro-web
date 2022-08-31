import { Outlet } from 'umi';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import UserInfoCard from '@/container/UserInfo/InfoCard';
import MaterialUISwitch from '@/components/MaterialUISwitch';

export default function Home() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Stack spacing={4}>
      <AppBar color="default" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dynamic
          </Typography>
          <MaterialUISwitch />
        </Toolbar>
      </AppBar>

      <Stack>
        <Container fixed sx={{ p: isUpMd ? undefined : 0 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Outlet />
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <UserInfoCard />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Stack>
      <Stack />
    </Stack>
  );
}
