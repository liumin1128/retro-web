import { createTheme, PaletteOptions } from '@mui/material/styles';
import common from './theme.common';

// https://mui.com/zh/customization/default-theme/?expand-path=$.palette.warning
const palette: PaletteOptions = {
  ...common,
  mode: 'dark',
  background: {
    default: 'hsl(225deg 9.5238095238% 8.2352941176%)',
    paper: 'hsl(222.8571428571deg 13.7254901961% 20%)',
  },
};

const components = {};

const theme = createTheme({ palette, components });

export default theme;
