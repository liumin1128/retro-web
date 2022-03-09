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
    grey: {
      '500': 'rgba(0,0,0,0.5)',
    },
    autoColor: {
      '100': 'rgba(0,0,0,0.1)',
      '200': 'rgba(0,0,0,0.2)',
      '300': 'rgba(0,0,0,0.3)',
      '400': 'rgba(0,0,0,0.4)',
      '500': 'rgba(0,0,0,0.5)',
      '600': 'rgba(0,0,0,0.6)',
      '700': 'rgba(0,0,0,0.7)',
      '800': 'rgba(0,0,0,0.8)',
      '900': 'rgba(0,0,0,0.9)',
      '000': 'rgba(0,0,0,1)',
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
    MuiTypography: {
      defaultProps: {
        color: 'inherit',
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
