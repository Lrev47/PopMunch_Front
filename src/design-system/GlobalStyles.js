import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* CSS Reset and Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.background.primary};
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.display};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
    margin: 0;
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['6xl']};
    }
    
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      font-size: ${({ theme }) => theme.typography.fontSize['7xl']};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['5xl']};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    }
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
    }
  }

  h5 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    }
  }

  h6 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.typography.fontSize.xl};
    }
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
    margin: 0;
  }

  /* Links */
  a {
    color: inherit;
    text-decoration: none;
    transition: all ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.timing.ease};
    
    &:hover {
      opacity: 0.8;
    }
  }

  /* Lists */
  ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Buttons */
  button {
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
    padding: 0;
    transition: all ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.timing.ease};
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.text.muted};
    border-radius: ${({ theme }) => theme.borderRadius.base};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    transition: all ${({ theme }) => theme.transitions.duration.base} ${({ theme }) => theme.transitions.timing.ease};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.accent.primary.start};
      box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.1);
    }
  }

  /* Selection */
  ::selection {
    background: ${({ theme }) => theme.colors.accent.primary.start};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.text.muted};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    
    &:hover {
      background: ${({ theme }) => theme.colors.text.tertiary};
    }
  }

  /* Custom focus styles */
  *:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent.primary.start};
    outline-offset: 2px;
  }

  /* Utility classes */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Page transitions */
  .page-enter {
    opacity: 0;
    transform: translateY(20px);
  }

  .page-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: all ${({ theme }) => theme.transitions.duration.slow} ${({ theme }) => theme.transitions.timing.ease};
  }

  .page-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .page-exit-active {
    opacity: 0;
    transform: translateY(-20px);
    transition: all ${({ theme }) => theme.transitions.duration.slow} ${({ theme }) => theme.transitions.timing.ease};
  }
`;

export default GlobalStyles;