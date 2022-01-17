import { PaletteOptions } from '@mui/material/styles';
import common from './theme.common';

const palette: PaletteOptions = {
  ...common,
  mode: 'light',
  background: {
    default: '#ddd',
    paper: '#ffffff',
  },
};

export default {
  palette,
};
