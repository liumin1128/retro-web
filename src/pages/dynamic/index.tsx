import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DynamicList from '@/container/Dynamic/List';
import CreateDynamic from '@/container/Dynamic/Create';
import UserInfoCard from '@/container/UserInfo/InfoCard';

export default function Home() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div>
      <Container fixed sx={{ p: isUpMd ? undefined : 0 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={3}>
            <Card>
              <UserInfoCard />
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack spacing={2}>
              <CreateDynamic />
              <DynamicList />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Card>
              <UserInfoCard />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
