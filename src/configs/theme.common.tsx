// import { PaletteOptions } from '@mui/material/styles';

// const theme: PaletteOptions = {
// primary: {
//   main: '#00266b',
//   contrastText: '#fff',
// },
// secondary: {
//   main: '#af8f62',
//   contrastText: '#fff',
// },
// warning: {
//   main: '#af8f62',
//   contrastText: '#fff',
// },
// success: {
//   main: '#276753',
//   contrastText: '#fff',
// },
// error: {
//   main: '#92311B',
//   contrastText: '#fff',
// },
// info: {
//   main: '#435151',
//   contrastText: '#fff',
// },
// };

// export default theme;

import { forwardRef } from 'react';
import { createTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'umi';
// import common from './theme.common';

// eslint-disable-next-line no-unused-vars
const LinkBehavior = forwardRef((props, ref) => {
  // eslint-disable-next-line
  // @ts-ignore
  // eslint-disable-next-line react/prop-types
  const { href, ...other } = props;
  return <RouterLink to={href} {...other} />;
});

const theme = createTheme({
  shape: {
    borderRadius: 10,
  },

  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
      styleOverrides: {
        root: {
          textDecorationLine: 'none',
          '&:hover': {
            textDecorationLine: 'underline',
          },
        },
      },
    },

    MuiPaper: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            border: '1px solid #1e4976',
            '&[href]': {
              textDecorationLine: 'none',
            },
          },
        },
      ],
    },

    MuiTypography: {
      defaultProps: {
        color: 'inherit',
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          // height: 48,
        },
        containedInherit: {
          color: '#212B36',
          // boxShadow: '0 8px 16px 0 rgba(145, 158, 171, 0.16)',
          '&:hover': {
            backgroundColor: '#C4CDD5',
          },
        },
        // containedPrimary: {
        //   boxShadow: '0 8px 16px 0 rgba(0, 171, 85, 0.24)',
        // },
        // containedSecondary: {
        //   boxShadow: '0 8px 16px 0 rgba(51, 102, 255, 0.24)',
        // },
        // containedInfo: {
        //   boxShadow: '0 8px 16px 0 rgba(24, 144, 255, 0.24)',
        // },
        // containedSuccess: {
        //   boxShadow: '0 8px 16px 0 rgba(84, 214, 44, 0.24)',
        // },
        // containedWarning: {
        //   boxShadow: '0 8px 16px 0 rgba(255, 193, 7, 0.24)',
        // },
        // containedError: {
        //   boxShadow: '0 8px 16px 0 rgba(255, 72, 66, 0.24)',
        // },
        // outlinedInherit: {
        //   border: '1px solid rgba(145, 158, 171, 0.32)',
        //   '&:hover': {
        //     backgroundColor: 'rgba(145, 158, 171, 0.08)',
        //   },
        // },
        // textInherit: {
        //   '&:hover': {
        //     backgroundColor: 'rgba(145, 158, 171, 0.08)',
        //   },
        // },
      },
    },
  },
});

export default theme;
