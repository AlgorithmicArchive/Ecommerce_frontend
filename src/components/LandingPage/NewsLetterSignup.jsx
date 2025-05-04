import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Alert,
  Link,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import TrustBadges from './TrushBadges';

// Mock API function for newsletter subscription (replace with actual Mailchimp integration)
const subscribeToNewsletter = async (email, consent) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Subscribed successfully!' });
    }, 1000);
  });
  // Example Mailchimp integration (uncomment and configure):
  /*
  try {
    const response = await fetch('https://<your-mailchimp-api-endpoint>', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_address: email, status: 'subscribed', tags: ['newsletter'] }),
    });
    const data = await response.json();
    return { success: response.ok, message: data.message || 'Subscribed successfully!' };
  } catch (error) {
    return { success: false, message: 'Failed to subscribe. Please try again.' };
  }
  */
};

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter an email address.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!consent) {
      setError('Please agree to receive marketing emails.');
      return;
    }

    setLoading(true);
    const response = await subscribeToNewsletter(email, consent);
    setLoading(false);

    if (response.success) {
      setSuccess('Thanks for subscribing!');
      setEmail('');
      setConsent(false);
    } else {
      setError(response.message || 'Failed to subscribe. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        py: 6,
        textAlign: 'center',
      }}
    >
      <Grid container justifyContent="center">
       <TrustBadges/>
      </Grid>
      <Grid
        container
        justifyContent="center"
        sx={{display:'flex',flexDirection:'column',  px: { xs: 2, sm: 0 },height:'80%' }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', mb: 2 ,mt:5}}
          >
            Join Our Newsletter
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', mb: 3 }}
          >
            Get 10% off your first order
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {success ? (
            <Alert
              severity="success"
              onClose={() => setSuccess('')}
              sx={{ mb: 2, mx: 'auto', maxWidth: '400px' }}
            >
              {success}
            </Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center" sx={{display:'flex',flexDirection:'column'}}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for exclusive offers"
                    error={!!error}
                    helperText={error}
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '25px',
                        bgcolor: '#fff',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    fullWidth
                    sx={{
                      borderRadius: '25px',
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        I agree to receive marketing emails. See our{' '}
                        <Link href="/privacy-policy" underline="hover">
                          Privacy Policy
                        </Link>.
                      </Typography>
                    }
                    sx={{ mt: 1 }}
                  />
                </Grid>
              </Grid>
            </form>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewsletterSignup;