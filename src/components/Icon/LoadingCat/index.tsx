import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

import styles from './index.css';

const Icon: React.FunctionComponent<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <div className={styles.box}>
        <div className={styles.cat}>
          <div className={styles.cat__body} />
          <div className={styles.cat__body} />
          <div className={styles.cat__tail} />
          <div className={styles.cat__head} />
        </div>
      </div>
    </Box>
  );
};

export default Icon;
