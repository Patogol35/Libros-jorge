// src/components/SearchBar.jsx
import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        mb: 6,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Busca por título, autor o ISBN..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="medium"
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '12px',
          '& fieldset': { borderRadius: '12px' },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        disabled={!query.trim()}
      >
        Buscar
      </Button>
    </Box>
  );
}
