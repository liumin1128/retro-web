import { useParams } from 'umi';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DynamicDetail from '@/container/Dynamic/Detail';

export default function Home() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const params = useParams<{ id: string }>();

  console.log('params');
  console.log(params);
  return (
    <div>
      <Container fixed sx={{ p: isUpMd ? undefined : 0 }}>
        <Grid container>
          <Grid item lg={2}>
            left
          </Grid>
          <Grid item lg={6}>
            <Stack spacing={2}>
              <DynamicDetail id={params.id} />
            </Stack>
          </Grid>
          <Grid item lg={4}>
            right
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
