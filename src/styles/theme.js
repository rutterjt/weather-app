import { ThemeProvider } from 'styled-components';

// custom theme variables
import { palette, gradients } from './palette';
import { breakpoints } from './breakpoints.js';
import { shadow } from './shadow';

export const theme = {
  palette,
  gradients,
  breakpoints,
  shadow,
};

export const GlobalThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
