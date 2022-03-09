import { useParams } from 'umi';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import DynamicDetail from '@/container/Dynamic/Detail';
import CommentList from '@/container/Comment/List';
import CommentCreate from '@/container/Comment/Create';
import UserInfoCard from '@/container/UserInfo/InfoCard';
import MaterialUISwitch from '@/components/MaterialUISwitch';

export default function Home() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const params = useParams<{ id: string }>();

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
            <Grid item xs={12} lg={3}>
              left
            </Grid>
            <Grid item xs={12} lg={6}>
              <Stack spacing={4}>
                <DynamicDetail id={params.id} />

                <Stack spacing={4}>
                  <Typography variant="h5">发表评论</Typography>
                  <CommentCreate object={params.id} />
                </Stack>

                <Stack spacing={4}>
                  <Typography variant="h5">评论列表</Typography>
                  <CommentList object={params.id} />
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} lg={3}>
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
