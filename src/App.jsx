// src/App.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
  Paper,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import { theme as createTheme } from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useColorMode } from './hooks/useColorMode';

const API_BASE = 'https://www.googleapis.com/books/v1/volumes';

export default function App() {
  const { mode, toggleColorMode } = useColorMode();
  const muiTheme = createTheme(mode);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setHasSearched(true);
    try {
      const res = await axios.get(`${API_BASE}?q=${encodeURIComponent(query)}&maxResults=24`);
      setBooks(res.data.items || []);
    } catch (err) {
      setError('No pudimos conectar con Google Books. Inténtalo más tarde.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', position: 'relative', pb: 6 }}>
        {/* Botón de modo oscuro/claro - flotante, visible y completo */}
        <IconButton
          onClick={toggleColorMode}
          sx={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 1200,
            width: 48,
            height: 48,
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: 3,
            '&:hover': {
              bgcolor: 'background.paper',
              boxShadow: 6,
            },
          }}
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <Container sx={{ pt: 8 }}>
          <Box textAlign="center" mb={6}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                  background: mode === 'light'
                    ? 'linear-gradient(120deg, #1d4ed8, #0ea5e9)'
                    : 'linear-gradient(120deg, #7dd3fc, #bae6fd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  mb: 1.5,
                }}
              >
                BookFinder
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: 'auto', px: 2, fontWeight: 400 }}
              >
                Explora millones de libros y guarda tus favoritos.
              </Typography>
            </motion.div>
          </Box>

          {/* Buscador mejorado */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: 1,
                width: '100%',
                maxWidth: 720,
                borderRadius: '20px',
                bgcolor: mode === 'light' ? '#ffffff' : '#1e293b',
                border: `1px solid ${mode === 'light' ? '#e2e8f0' : '#334155'}`,
                boxShadow: mode === 'light'
                  ? '0 4px 20px rgba(0,0,0,0.06)'
                  : '0 4px 20px rgba(0,0,0,0.15)',
              }}
            >
              <SearchBar onSearch={handleSearch} />
            </Paper>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box display="flex" justifyContent="center" my={10}>
              <CircularProgress size={48} />
            </Box>
          ) : (
            <AnimatePresence>
              {books.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
                    {books.map((book) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                        <BookCard book={book} mode={mode} />
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {!loading && !error && books.length === 0 && hasSearched && (
            <Box textAlign="center" mt={8}>
              <Typography variant="h6" color="text.secondary">
                No encontramos libros con esa búsqueda 😕
              </Typography>
            </Box>
          )}

          {!hasSearched && (
            <Box textAlign="center" mt={8}>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
                Busca por título, autor o ISBN para comenzar.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
