import * as React from 'react';
import { IRoute } from 'umi';
import Box from '@mui/material/Box';
import styles from './styles';

const BaseLayout: React.FunctionComponent<IRoute> = (props) => {
  const {
    children,
    // location, history
  } = props;

  // function navigateTo(path: string) {
  //   history.push(path);
  // }

  // function comparePath(p1: string, p2: string, deep = 1) {
  //   return p1.split('/')[deep] === p2.split('/')[deep];
  // }

  return <Box sx={styles.root}>{children}</Box>;
};

export default BaseLayout;
