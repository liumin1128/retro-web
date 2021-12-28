import * as React from 'react';
// import { Link } from 'umi';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { useThemeContext } from '@/context/theme';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        content: "'🌛'",
        lineHeight: '32px',
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.success.main
        : theme.palette.warning.main,
    width: 32,
    height: 32,
    '&:before': {
      content: "'☀️'",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      lineHeight: '32px',
      textAlign: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function ButtonAppBar() {
  const { theme, setTheme } = useThemeContext();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="default" position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WMP Retro
          </Typography>
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={theme === 'dark'}
            onChange={(_, checked: boolean) => {
              setTheme(checked ? 'dark' : 'default');
            }}
          />
          {/* <Link to="/login">
            <Button color="inherit">Login</Button>
          </Link> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
