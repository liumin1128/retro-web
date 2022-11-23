import { createTheme } from '@mui/material/styles';
import common from './theme.common';

const nextTheme = createTheme(common, {
  palette: {
    mode: 'dark',
    common: {
      black: '#000',
      white: '#fff',
    },
    // primary: {
    //   name: 'default',
    //   lighter: '#C8FACD',
    //   light: '#5BE584',
    //   main: '#00AB55',
    //   dark: '#007B55',
    //   darker: '#005249',
    //   contrastText: '#fff',
    // },
    // secondary: {
    //   lighter: '#D6E4FF',
    //   light: '#84A9FF',
    //   main: '#3366FF',
    //   dark: '#1939B7',
    //   darker: '#091A7A',
    //   contrastText: '#fff',
    // },
    // info: {
    //   lighter: '#D0F2FF',
    //   light: '#74CAFF',
    //   main: '#1890FF',
    //   dark: '#0C53B7',
    //   darker: '#04297A',
    //   contrastText: '#fff',
    // },
    // success: {
    //   lighter: '#E9FCD4',
    //   light: '#AAF27F',
    //   main: '#54D62C',
    //   dark: '#229A16',
    //   darker: '#08660D',
    //   contrastText: '#212B36',
    // },
    // warning: {
    //   lighter: '#FFF7CD',
    //   light: '#FFE16A',
    //   main: '#FFC107',
    //   dark: '#B78103',
    //   darker: '#7A4F01',
    //   contrastText: '#212B36',
    // },
    // error: {
    //   lighter: '#FFE7D9',
    //   light: '#FFA48D',
    //   main: '#FF4842',
    //   dark: '#B72136',
    //   darker: '#7A0C2E',
    //   contrastText: '#fff',
    // },

    primary: {
      main: '#00266b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#af8f62',
      contrastText: '#fff',
    },

    warning: {
      main: '#af8f62',
      contrastText: '#fff',
    },
    success: {
      main: '#276753',
      contrastText: '#fff',
    },
    error: {
      main: '#92311B',
      contrastText: '#fff',
    },
    info: {
      main: '#435151',
      contrastText: '#fff',
    },

    grey: {
      '0': '#FFFFFF',
      '50': '#fafafa',
      '100': '#F9FAFB',
      '200': '#F4F6F8',
      '300': '#DFE3E8',
      '400': '#C4CDD5',
      '500': '#919EAB',
      '600': '#637381',
      '700': '#454F5B',
      '800': '#212B36',
      '900': '#161C24',
      '5008': 'rgba(145, 158, 171, 0.08)',
      '50012': 'rgba(145, 158, 171, 0.12)',
      '50016': 'rgba(145, 158, 171, 0.16)',
      '50024': 'rgba(145, 158, 171, 0.24)',
      '50032': 'rgba(145, 158, 171, 0.32)',
      '50048': 'rgba(145, 158, 171, 0.48)',
      '50056': 'rgba(145, 158, 171, 0.56)',
      '50080': 'rgba(145, 158, 171, 0.8)',
      A100: '#f5f5f5',
      A200: '#eeeeee',
      A400: '#bdbdbd',
      A700: '#616161',
    },
    gradients: {
      // primary: 'linear-gradient(to bottom, #02338d, #02225d)',
      info: 'linear-gradient(to bottom, #74CAFF, #1890FF)',
      success: 'linear-gradient(to bottom, #AAF27F, #54D62C)',
      warning: 'linear-gradient(to bottom, #FFE16A, #FFC107)',
      error: 'linear-gradient(to bottom, #FFA48D, #FF4842)',
    },
    chart: {
      violet: '["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"]',
      blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
      green: '["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"]',
      yellow: '["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6"]',
      red: '["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"]',
    },
    divider: 'rgba(145, 158, 171, 0.24)',
    action: {
      active: '#919EAB',
      hover: 'rgba(145, 158, 171, 0.08)',
      selected: 'rgba(145, 158, 171, 0.16)',
      disabled: 'rgba(145, 158, 171, 0.8)',
      disabledBackground: 'rgba(145, 158, 171, 0.24)',
      focus: 'rgba(145, 158, 171, 0.24)',
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
      selectedOpacity: 0.16,
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
    text: {
      primary: '#fff',
      secondary: '#919EAB',
      disabled: '#637381',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    background: {
      paper: '#212B36',
      default: '#161C24',
      neutral: 'rgba(145, 158, 171, 0.16)',
    },
    contrastThreshold: 3,

    tonalOffset: 0.2,
  },

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
      '@media (minWidth:600px)': {
        fontSize: '3.25rem',
      },
      '@media (minWidth:900px)': {
        fontSize: '3.625rem',
      },
      '@media (minWidth:1200px)': {
        fontSize: '4rem',
      },
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    h2: {
      fontWeight: 700,
      lineHeight: 1.3333333333333333,
      fontSize: '2rem',
      '@media (minWidth:600px)': {
        fontSize: '2.5rem',
      },
      '@media (minWidth:900px)': {
        fontSize: '2.75rem',
      },
      '@media (minWidth:1200px)': {
        fontSize: '3rem',
      },
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: '1.5rem',
      '@media (minWidth:600px)': {
        fontSize: '1.625rem',
      },
      '@media (minWidth:900px)': {
        fontSize: '1.875rem',
      },
      '@media (minWidth:1200px)': {
        fontSize: '2rem',
      },
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: '1.25rem',
      '@media (minWidth:600px)': {
        fontSize: '1.25rem',
      },
      '@media (minWidth:900px)': {
        fontSize: '1.5rem',
      },
      '@media (minWidth:1200px)': {
        fontSize: '1.5rem',
      },
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    h5: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: '1.125rem',
      '@media (minWidth:600px)': {
        fontSize: '1.1875rem',
      },
      '@media (minWidth:900px)': {
        fontSize: '1.25rem',
      },
      '@media (minWidth:1200px)': {
        fontSize: '1.25rem',
      },
      fontFamily: '"SF Pro Text", Roboto, Helvetica, Arial, sans-serif;',
    },
    h6: {
      fontWeight: 700,
      lineHeight: 1.5555555555555556,
      fontSize: '1.0625rem',
      '@media (minWidth:600px)': {
        fontSize: '1.125rem',
      },
      '@media (minWidth:900px)': {
        fontSize: '1.125rem',
      },
      '@media (minWidth:1200px)': {
        fontSize: '1.125rem',
      },
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
});

export default nextTheme;
