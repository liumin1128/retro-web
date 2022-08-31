import { Outlet } from 'umi';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import AppBar from '@/components/AppBar';
import styles from './styles';

const LoginLayout = () => {
  return (
    <Box sx={styles.root}>
      <Stack spacing={4}>
        <AppBar />
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Stack>
    </Box>
  );
};

export default LoginLayout;
