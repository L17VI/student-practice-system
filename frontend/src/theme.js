import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      fontSize: '0.9375rem',
      lineHeight: 1.75,
      textTransform: 'none',
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.66,
    },
    overline: {
      fontWeight: 500,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      textTransform: 'uppercase',
    },
  },
  palette: {
    primary: {
      main: '#5d6bc4',
    },
    secondary: {
      main: '#1F2340',
    },
    background: {
      default: '#F6F7FB',
      paper: '#FFFFFF',
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1F2340',
          color: '#FFFFFF',
          fontSize: '12px',
          fontWeight: 500,
          padding: '6px 10px',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        },
        arrow: {
          color: '#1F2340',
        },
      },
    },
  },
});

export default theme;
