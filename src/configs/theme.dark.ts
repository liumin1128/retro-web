import { createTheme } from '@mui/material/styles';
import common from './theme.common';

const theme = createTheme({
  palette: {
    ...common,
    mode: 'dark',
    background: {
      default: 'hsl(225deg 9.5238095238% 8.2352941176%)',
      paper: 'hsl(222.8571428571deg 13.7254901961% 20%)',
    },
  },
  shape: {
    borderRadius: 10,
  },
});

const nextTheme = createTheme(theme, {
  components: {
    MuiPaper: {
      // defaultProps: {
      //   elevation: 0
      // },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            border: '1px solid #1e4976',
            // backgroundColor: '#001d3c',
            '&[href]': {
              textDecorationLine: 'none',
            },
          },
        },
      ],
    },
  },
});

export default nextTheme;
