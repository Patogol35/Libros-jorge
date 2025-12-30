// src/components/BookCard.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function BookCard({ book }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('book-favorites') || '[]');
    setIsFavorite(favorites.some((fav) => fav.id === book.id));
  }, [book.id]);

  const toggleFavorite = () => {
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
    ? volumeInfo.description.replace(/<[^>]*>/g, '').substring(0, 160) + '…'
    : 'Sin descripción disponible.';
  const image = volumeInfo.imageLinks?.thumbnail
    ? volumeInfo.imageLinks.thumbnail.replace('http://', 'https://')
    : '';
  const infoLink = volumeInfo.infoLink;

  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
        }}
      >
        <Box position="absolute" top={12} right={12} zIndex={2}>
          <Tooltip title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}>
            <IconButton
              onClick={toggleFavorite}
              color={isFavorite ? 'secondary' : 'default'}
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(4px)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.95)' },
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        <CardMedia
          component="img"
          image={image || 'https://via.placeholder.com/128x192?text=No+Cover'}
          alt={title}
          onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/128x192?text=No+Cover')}
          sx={{
            height: 220,
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ flexGrow: 1, pt: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            {authors}
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            {description}
          </Typography>
          {infoLink && (
            <Button
              variant="outlined"
              size="small"
              href={infoLink}
              target="_blank"
              rel="noopener"
              endIcon={<OpenInNewIcon />}
            >
              Ver libro
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
                                 }
