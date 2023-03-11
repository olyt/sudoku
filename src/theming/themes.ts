import defaultPalette from './palettes';
import { DefaultTheme } from 'styled-components';

const defaultTheme: DefaultTheme = {
  ...defaultPalette,
  breakpoints: {
    sm: '480px',
    smPlus: '481px',
    lg: '1000px',
  },
};

export default defaultTheme;
