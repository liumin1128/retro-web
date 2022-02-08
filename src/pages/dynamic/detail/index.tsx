import { useParams } from 'umi';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
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
        <Grid container>
          <Grid item xs={12} lg={2}>
            left
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack spacing={2}>
              <DynamicDetail id={params.id} />
              <CommentList object={params.id} />
              <CommentCreate object={params.id} />
            </Stack>
          </Grid>
          <Grid item xs={12} lg={4}>
            right
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
