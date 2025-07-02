import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { tokens, media } from './tokens';
import GlobalStyles from './GlobalStyles';

const ThemeProvider = ({ children }) => {
  const theme = {
    ...tokens,
    media
  };

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;