import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RefreshIcon from '@mui/icons-material/Refresh';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import VerifiedIcon from '@mui/icons-material/Verified';

const trustBadges = [
  {
    icon: <LockIcon fontSize="large" />,
    text: 'Shop with Confidence',
  },
  {
    icon: <LocalShippingIcon fontSize="large" />,
    text: 'Free Shipping',
  },
  {
    icon: <RefreshIcon fontSize="large" />,
    text: 'Hassle-Free Returns',
  },
  {
    icon: <HeadsetMicIcon fontSize="large" />,
    text: 'Support Anytime',
  },
  {
    icon: <VerifiedIcon fontSize="large" />,
    text: 'Quality Guaranteed',
  },
];

const TrustBadges = () => {
  return (
    <Box
      sx={{
        py: 4,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: '1200px', mx: 'auto' }}
      >
        {trustBadges.map((badge, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={2.4} // Ensures 5 items fit in a row
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
              transition: 'transform 0.3s ease, color 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                color: 'primary.main',
              },
            }}
          >
            <Box sx={{ mb: 1, color: 'inherit' }}>{badge.icon}</Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'medium',
                color: 'text.secondary',
                maxWidth: '150px',
                lineHeight: 1.2,
              }}
            >
              {badge.text}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrustBadges;