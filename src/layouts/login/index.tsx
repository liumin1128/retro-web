import * as React from 'react';
import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
import { IRoute } from 'umi';
import styles from './styles';

const LoginLayout: React.FunctionComponent<IRoute> = (props) => {
  const { children } = props;
  return (
    <Box sx={styles.root}>
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
};

export default LoginLayout;
