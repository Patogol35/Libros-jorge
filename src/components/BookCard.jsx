// src/components/BookCard.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function BookCard({ book, mode, onClick }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('book-favorites') || '[]');
    setIsFavorite(favorites.some((fav) => fav.id === book.id));
  }, [book.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('book-favorites') || '[]');
    if (isFavorite) {
      const filtered = favorites.filter((fav) => fav.id !== book.id);
      localStorage.setItem('book-favorites', JSON.stringify(filtered));
    } else {
      favorites.push(book);
      localStorage.setItem('book-favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const { volumeInfo } = book;
  const title = volumeInfo.title || 'Sin título';
  const authors = volumeInfo.authors?.join(', ') || 'Autor desconocido';
  const description = volumeInfo.description
    ? volumeInfo.description.replace(/<[^>]*>/g, '').substring(0, 120) + '…'
    : 'Sin descripción disponible.';
  const image = volumeInfo.imageLinks?.thumbnail
    ? volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
    : '';

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalles del libro: ${title}, por ${authors}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      style={{ cursor: 'pointer', outline: 'none' }}
      sx={{
        '&:focus-visible': {
          outline: `2px solid ${mode === 'light' ? '#2563eb' : '#60a5fa'}`,
          outlineOffset: '2px',
          borderRadius: '20px',
        },
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          borderRadius: '20px',
          border: `1px solid ${mode === 'light' ? '#e2e8f0' : '#334155'}`,
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0 10px 30px rgba(0,0,0,0.12)'
              : '0 10px 30px rgba(0,0,0,0.3)',
          },
        }}
      >
        <Box position="absolute" top={12} right={12} zIndex={2}>
          <Tooltip title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}>
            <IconButton
              onClick={toggleFavorite}
              color={isFavorite ? 'secondary' : 'default'}
              size="small"
              sx={{
                bgcolor: mode === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.85)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
              aria-label={isFavorite ? `Quitar ${title} de favoritos` : `Añadir ${title} a favoritos`}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        <CardMedia
          component="img"
          image={image || 'https://placehold.co/400x600/e2e8f0/64748b?text=Portada+no+disponible'}
          alt={`Portada del libro: ${title}`}
          onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x600/e2e8f0/64748b?text=Portada+no+disponible')}
          sx={{
            height: 260,
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ p: 2.2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: mode === 'light' ? '#475569' : '#cbd5e1', mb: 1.5 }}
          >
            {authors}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: mode === 'light' ? '#334155' : '#cbd5e1',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.95rem',
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}
