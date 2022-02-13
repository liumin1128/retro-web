import { useParams } from 'umi';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DynamicDetail from '@/container/Dynamic/Detail';
import CommentList from '@/container/Comment/List';
import CommentCreate from '@/container/Comment/Create';

export default function Home() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const params = useParams<{ id: string }>();

  return (
    <div>
      <Container fixed sx={{ p: isUpMd ? undefined : 0 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={1}>
            left
          </Grid>
          <Grid item xs={12} lg={8}>
            <Stack spacing={8}>
              <DynamicDetail id={params.id} />

              <Stack spacing={4}>
                <Typography variant="h5" color="inherit">
                  发表评论
                </Typography>
                <CommentCreate object={params.id} />
              </Stack>

              <Stack spacing={4}>
                <Typography variant="h5" color="inherit">
                  评论列表
                </Typography>
                <CommentList object={params.id} />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={3}>
            right
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
