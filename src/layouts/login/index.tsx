import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { IRoute } from 'umi';
import AppBar from '@/components/AppBar';
import styles from './styles';

const LoginLayout: React.FunctionComponent<IRoute> = (props) => {
  const { children } = props;
  return (
    <Box sx={styles.root}>
      <Stack spacing={4}>
        <AppBar />
        <Container maxWidth="lg">{children}</Container>
      </Stack>
    </Box>
  );
};

export default LoginLayout;
