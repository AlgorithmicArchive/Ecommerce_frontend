import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import {
  Box,
  Typography,
  Rating,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';

// Mock testimonial data (replace with API call)
const testimonials = [
  {
    id: 1,
    name: 'Jane Doe',
    rating: 5,
    quote:
      'Absolutely love my new headphones! The sound quality is amazing, and they’re so comfortable for long sessions. Shipping was fast, and the customer support team was super helpful when I had a question. Highly recommend this store!',
    avatar: 'https://i.pravatar.cc/50?img=1',
  },
  {
    id: 2,
    name: 'John Smith',
    rating: 4.5,
    quote:
      'Bought a smartwatch and couldn’t be happier. It’s stylish, functional, and the battery life is impressive. The website was easy to navigate, and the discount I got was a nice bonus. Will shop here again!',
    avatar: 'https://i.pravatar.cc/50?img=2',
  },
  {
    id: 3,
    name: 'Emily Chen',
    rating: 4,
    quote:
      'The running shoes I ordered are fantastic—great fit and support. Delivery took a bit longer than expected, but the quality made it worth the wait. The return policy gave me peace of mind. Great experience overall!',
    avatar: 'https://i.pravatar.cc/50?img=3',
  },
  {
    id: 4,
    name: 'Michael Brown',
    rating: 5,
    quote:
      'This is my go-to store for electronics. The laptop I bought is top-notch, and the price was unbeatable. The checkout process was smooth, and I got regular updates on my order. Highly satisfied!',
    avatar: 'https://i.pravatar.cc/50?img=4',
  },
  {
    id: 5,
    name: 'Sarah Davis',
    rating: 4.5,
    quote:
      'Ordered a coffee maker and it’s perfect for my morning routine. The product was exactly as described, and the packaging was secure. Customer service responded quickly to my inquiry. I’ll be back for more!',
    avatar: 'https://i.pravatar.cc/50?img=5',
  },
];

const Testimonials = () => {
  return (
    <Box
      sx={{
        py: 6,
        bgcolor: '#f5f5f5',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}
      >
        What Our Customers Say
      </Typography>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          960: { slidesPerView: 2 },
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          boxSizing: 'border-box',
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <Card
              sx={{
                maxWidth: 500,
                minHeight: 250,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.3s, transform 0.3s',
                '&:hover': {
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <Avatar
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  sx={{ width: 50, height: 50, mb: 2 }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'medium', mb: 1 }}
                >
                  {testimonial.name}
                </Typography>
                <Rating
                  value={testimonial.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    maxWidth: '90%',
                    lineHeight: 1.5,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {testimonial.quote}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Testimonials;