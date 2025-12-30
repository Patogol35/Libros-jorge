// src/components/SearchBar.jsx
import { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const API_BASE = 'https://www.googleapis.com/books/v1/volumes';

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (inputValue.length < 2) {
      setOptions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(`${API_BASE}?q=${encodeURIComponent(inputValue)}&maxResults=6`);
        const suggestions = (res.data.items || []).map((item) => ({
          label: `${item.volumeInfo.title || 'Sin título'}${item.volumeInfo.authors ? ' – ' + item.volumeInfo.authors[0] : ''}`,
          value: item.volumeInfo.title || inputValue,
        }));
        setOptions(suggestions);
      } catch (err) {
        setOptions([]);
      }
    };

    const handler = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="search"
      aria-label="Buscar libros por título, autor o ISBN"
    >
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ej: El nombre del viento, Dan Brown..."
        variant="outlined"
        size="medium"
        sx={{
          width: '100%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          borderRadius: '16px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
          },
        }}
        InputProps={{
          sx: {
            fontSize: '1.05rem',
            pr: 1.5,
          },
        }}
        aria-label="Término de búsqueda para libros"
      />
      <Button
        type="submit"
        variant="contained"
        size="medium"
        startIcon={<SearchIcon />}
        disabled={!inputValue.trim()}
        sx={{
          fontWeight: 600,
          borderRadius: '16px',
          whiteSpace: 'nowrap',
          px: 3,
          height: '56px', // Igualar altura con TextField
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
          },
          '&:disabled': {
            bgcolor: 'action.disabledBackground',
            color: 'text.disabled',
            boxShadow: 'none',
          },
        }}
        aria-label={`Buscar libros con el término: ${inputValue || 'vacío'}`}
      >
        Buscar
      </Button>
    </Box>
  );
}
