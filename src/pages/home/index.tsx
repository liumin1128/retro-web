import * as React from 'react';
import { Link } from 'umi';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Home: React.FunctionComponent = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Link to="/retro/section">
        <Button>retro</Button>
      </Link>
    </Box>
  );
};

export default Home;
