import { ThemeProvider } from 'styled-components';

// custom theme variables
import { palette, gradients } from './palette';
import { breakpoints } from './breakpoints.js';

export const theme = {
  palette,
  gradients,
  breakpoints,
};

export const GlobalThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
