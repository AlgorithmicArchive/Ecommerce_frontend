import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Box, Typography, Grid } from '@mui/material';

const deals = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
    originalPrice: 120,
    discountedPrice: 84,
    discount: 30,
    stockLeft: 5,
    expiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour from now
    link: '/product/1',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
    originalPrice: 100,
    discountedPrice: 75,
    discount: 25,
    stockLeft: null,
    expiresAt: null,
    link: '/product/2',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
    originalPrice: 120,
    discountedPrice: 84,
    discount: 30,
    stockLeft: 5,
    expiresAt: new Date(Date.now() + 3600 * 1000),
    link: '/product/3',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
    originalPrice: 100,
    discountedPrice: 75,
    discount: 25,
    stockLeft: null,
    expiresAt: null,
    link: '/product/4',
  },
];

const DealsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const getCountdown = (expiresAt) => {
    if (!expiresAt) return null;
    const diff = Math.max(0, expiresAt - Date.now());
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor(diff / 1000 / 60 / 60);
    return `${hours}h ${minutes}m left`;
  };

  return (
    <Box sx={{ padding: 2, overflow: 'hidden', width: '100%' }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold' }}
      >
        Hot Deals
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ maxWidth: '1200px', mx: 'auto' }}
      >
        {deals.map((deal) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={deal.id}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card
              onMouseEnter={() => setHoveredCard(deal.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                minHeight: 400, // Fixed minimum height for all cards
                width: '100%',
                maxWidth: 250, // Consistent card width
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease-in-out',
                boxShadow: hoveredCard === deal.id
                  ? '0 8px 20px rgba(0, 0, 0, 0.2)'
                  : '0 2px 8px rgba(0, 0, 0, 0.1)',
                transform: hoveredCard === deal.id ? 'translateY(-5px)' : 'translateY(0)',
                border: 'none',
                boxSizing: 'border-box',
              }}
            >
              <Card.Img
                variant="top"
                src={deal.image}
                style={{ height: 200, objectFit: 'cover' }}
                loading="lazy"
              />
              <Card.Body
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '12px',
                }}
              >
                <Box style={{ marginBottom: '8px' }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    ${deal.originalPrice}
                  </Typography>
                  <Typography variant="h6" color="error">
                    ${deal.discountedPrice}
                  </Typography>
                  <Badge bg="success" style={{ marginTop: '4px' }}>
                    {deal.discount}% Off
                  </Badge>
                  {deal.expiresAt && (
                    <Typography
                      variant="caption"
                      color="warning.main"
                      style={{
                        marginTop: '6px',
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      ⏳ {getCountdown(deal.expiresAt)}
                    </Typography>
                  )}
                  {deal.stockLeft && (
                    <Badge bg="danger" style={{ marginTop: '6px' }}>
                      Only {deal.stockLeft} left!
                    </Badge>
                  )}
                </Box>
                <Button
                  variant="primary"
                  href={deal.link}
                  style={{ marginTop: 'auto', alignSelf: 'center', width: '100%' }}
                >
                  Grab Deal
                </Button>
              </Card.Body>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DealsSection;