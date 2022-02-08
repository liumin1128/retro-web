import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DynamicList from '@/container/Dynamic/List';
import CreateDynamic from '@/container/Dynamic/Create';

export default function Home() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div>
      <Container fixed sx={{ p: isUpMd ? undefined : 0 }}>
        <Grid container>
          <Grid item xs={12} lg={2}>
            left
          </Grid>
          <Grid item xs={12} lg={6}>
            <Stack spacing={2}>
              <CreateDynamic />
              <DynamicList />
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
