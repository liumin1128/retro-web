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
  typography: {
    fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      lineHeight: 1.25,
      fontSize: '2.5rem',
      letterSpacing: 2,
      '@media (min-width:600px)': '{fontSize: "3.25rem"}',
      '@media (min-width:900px)': '{fontSize: "3.625rem"}',
      '@media (min-width:1200px)': '{fontSize: "4rem"}',
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    h2: {
      fontWeight: 700,
      lineHeight: 1.3333333333333333,
      fontSize: '2rem',
      '@media (min-width:600px)': '{fontSize: "2.5rem"}',
      '@media (min-width:900px)': '{fontSize: "2.75rem"}',
      '@media (min-width:1200px)': '{fontSize: "3rem"}',
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: '1.5rem',
      '@media (min-width:600px)': '{fontSize: "1.625rem"}',
      '@media (min-width:900px)': '{fontSize: "1.875rem"}',
      '@media (min-width:1200px)': '{fontSize: "2rem"}',
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: '1.25rem',
      '@media (min-width:600px)': '{fontSize: "1.25rem"}',
      '@media (min-width:900px)': '{fontSize: "1.5rem"}',
      '@media (min-width:1200px)': '{fontSize: "1.5rem"}',
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    h5: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: '1.125rem',
      '@media (min-width:600px)': '{fontSize: "1.1875rem"}',
      '@media (min-width:900px)': '{fontSize: "1.25rem"}',
      '@media (min-width:1200px)': '{fontSize: "1.25rem"}',
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    h6: {
      fontWeight: 700,
      lineHeight: 1.5555555555555556,
      fontSize: '1.0625rem',
      '@media (min-width:600px)': '{fontSize: "1.125rem"}',
      '@media (min-width:900px)': '{fontSize: "1.125rem"}',
      '@media (min-width:1200px)': '{fontSize: "1.125rem"}',
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: '1rem',
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    subtitle2: {
      fontWeight: 600,
      lineHeight: 1.5714285714285714,
      fontSize: '0.875rem',
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    body1: {
      lineHeight: 1.5,
      fontSize: '1rem',
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
      fontWeight: 400,
    },
    body2: {
      lineHeight: 1.5714285714285714,
      fontSize: '0.875rem',
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
      fontWeight: 400,
    },
    caption: {
      lineHeight: 1.5,
      fontSize: '0.75rem',
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
      fontWeight: 400,
    },
    overline: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    button: {
      fontWeight: 700,
      lineHeight: 1.7142857142857142,
      fontSize: '0.875rem',
      textTransform: 'capitalize',
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    htmlFontSize: 16,
    fontSize: 14,
    fontWeightLight: 300,
  },

  components: {
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
          height: 48,
        },
        containedInherit: {
          color: '#212B36',
          boxShadow: '0 8px 16px 0 rgba(145, 158, 171, 0.16)',
          '&:hover': {
            backgroundColor: '#C4CDD5',
          },
        },
        containedPrimary: {
          boxShadow: '0 8px 16px 0 rgba(0, 171, 85, 0.24)',
        },
        containedSecondary: {
          boxShadow: '0 8px 16px 0 rgba(51, 102, 255, 0.24)',
        },
        containedInfo: {
          boxShadow: '0 8px 16px 0 rgba(24, 144, 255, 0.24)',
        },
        containedSuccess: {
          boxShadow: '0 8px 16px 0 rgba(84, 214, 44, 0.24)',
        },
        containedWarning: {
          boxShadow: '0 8px 16px 0 rgba(255, 193, 7, 0.24)',
        },
        containedError: {
          boxShadow: '0 8px 16px 0 rgba(255, 72, 66, 0.24)',
        },
        outlinedInherit: {
          border: '1px solid rgba(145, 158, 171, 0.32)',
          '&:hover': {
            backgroundColor: 'rgba(145, 158, 171, 0.08)',
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: 'rgba(145, 158, 171, 0.08)',
          },
        },
      },
    },
  },
});

export default nextTheme;
