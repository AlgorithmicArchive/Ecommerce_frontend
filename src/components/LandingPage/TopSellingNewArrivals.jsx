import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Rating,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import 'swiper/css';
import 'swiper/css/navigation';

// Mock API functions (replace with your actual API calls)
const fetchTopSelling = async () => {
  return [
    { id: 1, title: 'Wireless Headphones', price: 99.99, discountPrice: 79.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 2, title: 'Smartphone', price: 699.99, rating: 4.2, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 3, title: 'Laptop', price: 1299.99, discountPrice: 1099.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a0a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 4, title: 'Smart Watch', price: 199.99, rating: 4.0, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 5, title: 'Bluetooth Speaker', price: 59.99, rating: 4.3, image: 'https://images.unsplash.com/photo-1608043152292-3e3d693ea5b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 6, title: 'Gaming Console', price: 499.99, discountPrice: 449.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1606144042614-b040efbe5f94?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 7, title: 'Camera', price: 799.99, rating: 4.4, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc49?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 8, title: 'Tablet', price: 299.99, rating: 4.1, image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
  ];
};

const fetchNewArrivals = async () => {
  return [
    { id: 9, title: 'Wireless Mouse', price: 29.99, rating: 4.0, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 10, title: '4K TV', price: 999.99, discountPrice: 899.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1593784991095-2c792bb7666f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 11, title: 'Running Shoes', price: 89.99, rating: 4.3, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 12, title: 'Backpack', price: 49.99, rating: 4.2, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 13, title: 'Sunglasses', price: 39.99, rating: 4.1, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 14, title: 'Coffee Maker', price: 79.99, rating: 4.4, image: 'https://images.unsplash.com/photo-1514503841731-23f9f4b04207?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 15, title: 'Desk Lamp', price: 34.99, rating: 4.0, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 16, title: 'Fitness Tracker', price: 149.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1530036788421-5bfbd51ba0f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80' },
  ];
};

const TopSellingNewArrivals = () => {
  const [tabValue, setTabValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products based on tab selection
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = tabValue === 0 ? await fetchTopSelling() : await fetchNewArrivals();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px', // Constrain width for larger screens
        mx: 'auto', // Center the component
        overflow: 'hidden',
        position: 'relative',
        py: 4,
        px: { xs: 1, md: 2 }, // Reduced padding
        bgcolor: '#fff',
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}
      >
        {tabValue === 0 ? 'Top Selling' : 'New Arrivals'}
      </Typography>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        centered
        sx={{ mb: 4 }}
      >
        <Tab label="Top Selling" />
        <Tab label="New Arrivals" />
      </Tabs>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.custom-swiper-button-next',
              prevEl: '.custom-swiper-button-prev',
            }}
            preloadImages={false}
            lazyPreloadPrevNext={2}
            spaceBetween={8} // Reduced spacing between cards
            slidesPerView={1}
            breakpoints={{
              600: { slidesPerView: 2 },
              960: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            style={{ width: '100%', padding: '0 16px', boxSizing: 'border-box' }} // Reduced side padding
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Card
                  sx={{
                    maxWidth: 250,
                    minHeight: 350, // Fixed minimum height for all cards
                    display: 'flex',
                    flexDirection: 'column',
                    mx: 'auto',
                    transition: 'box-shadow 0.3s',
                    '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.2)' },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={product.image}
                    alt={product.title}
                    loading="lazy"
                    sx={{ objectFit: 'cover', mx: 'auto', mt: 2 }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      textAlign: 'center',
                      padding: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          mb: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        <Typography
                          variant="body2"
                          color={product.discountPrice ? 'text.secondary' : 'text.primary'}
                          sx={{
                            textDecoration: product.discountPrice ? 'line-through' : 'none',
                            mr: 1,
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </Typography>
                        {product.discountPrice && (
                          <Typography variant="body2" color="error">
                            ${product.discountPrice.toFixed(2)}
                          </Typography>
                        )}
                      </Box>
                      <Rating value={product.rating} precision={0.5} readOnly size="small" />
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ mt: 2, textTransform: 'none' }}
                      onClick={() => alert(`Added ${product.title} to cart`)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          <Box
            className="custom-swiper-button-prev"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '4px', // Moved closer to edge
              transform: 'translateY(-50%)',
              zIndex: 10,
              color: '#fff',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
              width: { xs: '36px', md: '40px' }, // Slightly smaller
              height: { xs: '36px', md: '40px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </Box>
          <Box
            className="custom-swiper-button-next"
            sx={{
              position: 'absolute',
              top: '50%',
              right: '4px', // Moved closer to edge
              transform: 'translateY(-50%)',
              zIndex: 10,
              color: '#fff',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
              width: { xs: '36px', md: '40px' },
              height: { xs: '36px', md: '40px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
            }}
          >
            <ArrowForwardIcon fontSize="small" />
          </Box>
        </>
      )}
    </Box>
  );
};

export default TopSellingNewArrivals;