import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

// Sample category data (replace with your actual categories and images)
const categories = [
  {
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1516321318427-8f6d7c7d9e5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
    slug: 'electronics',
  },
  {
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
    slug: 'fashion',
  },
  {
    name: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
    slug: 'home-kitchen',
  },
  {
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
    slug: 'beauty',
  },
  {
    name: 'Sports & Outdoors',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
    slug: 'sports-outdoors',
  },
];

const FeaturedCategories = () => {
  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 4 },  }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}
      >
        Featured Categories
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                maxWidth: 300,
                mx: 'auto',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="400"
                width="200"
                image={category.image}
                alt={category.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                  {category.name}
                </Typography>
                <Button
                  component={Link}
                  to={`/products?category=${category.slug}`}
                  variant="outlined"
                  color="primary"
                  sx={{ textTransform: 'none' }}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedCategories;