import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Sample data for the carousel (replace with your product images and details)
const items = [
  {
    name: 'Summer Collection',
    description: 'Discover the latest trends in fashion.',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80',
    cta: 'Shop Now',
  },
  {
    name: 'Electronics Sale',
    description: 'Get up to 50% off on gadgets.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80',
    cta: 'Explore Deals',
  },
  {
    name: 'Home Essentials',
    description: 'Upgrade your living space today.',
    image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2560&q=80',
    cta: 'Browse Collection',
  },
];

const HeroBannerCarousel = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: { xs: '50vh', md: '90vh' } }}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        loop
        spaceBetween={0}
        slidesPerView={1}
        style={{ height: '100%' }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                height: '100%',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Overlay for better text readability */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: { xs: 2, md: 4 },
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.5rem', md: '3rem' },
                    fontWeight: 'bold',
                    color: '#fff',
                    mb: 2,
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.5rem' },
                    color: '#fff',
                    mb: 3,
                    maxWidth: '80%',
                  }}
                >
                  {item.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ textTransform: 'none', borderRadius: '20px' }}
                >
                  {item.cta}
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <Box
        className="swiper-button-prev"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          zIndex: 10,
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '50%',
          width: { xs: '40px', md: '50px' },
          height: { xs: '40px', md: '50px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <ArrowBackIcon />
      </Box>
      <Box
        className="swiper-button-next"
        sx={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          zIndex: 10,
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '50%',
          width: { xs: '40px', md: '50px' },
          height: { xs: '40px', md: '50px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <ArrowForwardIcon />
      </Box>
    </Box>
  );
};

export default HeroBannerCarousel;