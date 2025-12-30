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
  useTheme,
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
      <Box sx={{ minHeight: '100vh', py: 6 }}>
        <Container>
          {/* Header */}
          <Box textAlign="center" mb={5}>
            <Box display="flex" justifyContent="center" mb={2}>
              <IconButton
                onClick={toggleColorMode}
                sx={{
                  position: 'absolute',
                  right: 24,
                  top: 24,
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                }}
              >
                {muiTheme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h1" component="h1" gutterBottom>
                BookFinder Pro
              </Typography>
              <Typography variant="h5" color="text.secondary">
                Explora +40 millones de libros
              </Typography>
            </motion.div>
          </Box>

          <SearchBar onSearch={handleSearch} />

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {/* Resultados */}
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
                  <Grid container spacing={4}>
                    {books.map((book) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                        <BookCard book={book} />
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
              <Typography variant="body1" color="text.secondary">
                Escribe en la barra de búsqueda para comenzar.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
