import { createTheme } from '@mui/material/styles';
import common from './theme.common';

const palette = {
  ...common,
  background: {
    default: '#ddd',
    paper: '#ffffff',
    gradient: 'linear-gradient(111.44deg, #0f5a9a, #00266b 100%)',
  },
};

const components = {
  // MuiTextField: {
  //   styleOverrides: {
  //     root: {
  //       '& .MuiOutlinedInput-notchedOutline': {
  //         borderColor: '#E4E6E8',
  //       },
  //       '& fieldset:hover': {
  //         borderColor: 'red',
  //       },
  //       '& .Mui-focused': {
  //         '& .MuiOutlinedInput-notchedOutline': {
  //           borderColor: '#8A64EB',
  //         },
  //       },
  //     },
  //   },
  // },
  MuiButton: {
    styleOverrides: {
      root: {
        color: 'secondary',
      },
    },
  },
  // MuiPaper: {
  //   styleOverrides: {
  //     root: {
  //       borderRight: 'none !important',
  //     },
  //     elevation1: {
  //       borderRadius: '20px',
  //       boxShadow: '0px 8px 12px rgba(153, 155, 168, 0.15);',
  //     },
  //   },
  // },
};

// const typography = {
//   fontFamily: ['poppins', 'sans-serif'].join(','),
// };

// const overrides = {
//   MuiCssBaseline: {
//     '@global': {
//       body: {
//         background: 'red',
//       },
//     },
//   },
//   MuiAppBar: {
//     root: {},
//     colorPrimary: {
//       backgroundColor: '#fff',
//       color: '#3097fc',
//     },
//   },
//   MuiDivider: {},
//   MuiPaper: {},
//   MuiTypography: {},
//   MuiButton: {},
//   MuiLink: {
//     root: {
//       '&:hover': {},
//     },
//   },
//   MuiFormControl: {},
// };

const theme = createTheme({ palette, components });

export default theme;
