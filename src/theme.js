// src/theme.js
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    mode: 'light', // Puedes cambiar a 'dark' si quieres por defecto
    primary: {
      main: '#1976d2', // Azul profesional
    },
    secondary: {
      main: '#f50057', // Rosa acento (opcional, para botones destacados)
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 600, fontSize: '2rem' },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          fontWeight: 600,
          padding: '10px 24px',
        },
      },
    },
  },
});
