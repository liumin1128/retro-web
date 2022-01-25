import { createTheme } from '@mui/material/styles';
import common from './theme.common';

const theme = createTheme({
  palette: {
    ...common,
    mode: 'light',
    background: {
      default: '#f8f8f8',
      paper: '#ffffff',
      gradient:
        'linear-gradient(111.44deg, rgb(15, 90, 154), rgb(0, 38, 107) 100%)',
    },
  },
  shape: {
    borderRadius: 10,
  },
});

const nextTheme = createTheme(theme, {
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export default nextTheme;
