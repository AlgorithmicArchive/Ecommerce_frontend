import React, { useState } from 'react';
import { Container, Row, Col, Form, Button as BootstrapButton } from 'react-bootstrap';
import {
  Box,
  TextField,
  Typography,
  Link,
  Alert,
  IconButton,
  InputAdornment,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff, Google, Facebook, Apple } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Mock login function (replace with actual API call)
const loginUser = async (emailOrUsername, password, recaptchaToken) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (emailOrUsername === 'test@user.com' && password === 'Password123') {
        resolve({ success: true, message: 'Login successful!' });
      } else {
        resolve({ success: false, message: 'Invalid credentials' });
      }
    }, 1000);
  });
};

// Mock reCAPTCHA function (replace with actual reCAPTCHA v3 integration)
const executeRecaptcha = async () => {
  return 'mock-recaptcha-token';
};

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidInput = () => {
    if (!emailOrUsername) return false;
    if (emailOrUsername.includes('@') && !validateEmail(emailOrUsername)) return false;
    if (password.length < 8) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isValidInput()) {
      setError('Please enter a valid email/username and password (min 8 characters).');
      return;
    }

    setLoading(true);

    let recaptchaToken = null;
    if (failedAttempts >= 3) {
      recaptchaToken = await executeRecaptcha();
      if (!recaptchaToken) {
        setError('reCAPTCHA verification failed. Please try again.');
        setLoading(false);
        return;
      }
    }

    const response = await loginUser(emailOrUsername, password, recaptchaToken);
    setLoading(false);

    if (response.success) {
      setSuccess(response.message);
      if (rememberMe) {
        Cookies.set('session', 'active', { expires: 30 });
      }
      setFailedAttempts(0);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } else {
      setFailedAttempts((prev) => prev + 1);
      if (failedAttempts + 1 >= 5) {
        setError('Account locked. Please try again later or reset your password.');
      } else {
        setError(response.message);
      }
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Logging in with ${provider}`);
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: 6,
        bgcolor: '#f5f5f5',
        textAlign: 'center',
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Log In
            </Typography>
            {success ? (
              <Alert severity="success" sx={{ marginBottom: 2 }}>
                {success}
              </Alert>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} className="mb-3">
                    <TextField
                      fullWidth
                      label="Email or Username"
                      value={emailOrUsername}
                      onChange={(e) => setEmailOrUsername(e.target.value)}
                      error={!!error}
                      helperText={error && 'Enter a valid email or username'}
                      sx={{ bgcolor: '#fff' }}
                    />
                  </Col>
                  <Col xs={12} className="mb-3">
                    <TextField
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={!!error}
                      helperText={error && 'Password must be at least 8 characters'}
                      sx={{ bgcolor: '#fff' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Col>
                  <Col xs={12} className="mb-3">
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Form.Check
                        type="checkbox"
                        label="Remember Me"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <Link href="/reset-password" underline="hover" style={{ fontSize: '0.875rem' }}>
                        Forgot Password?
                      </Link>
                    </Box>
                  </Col>
                  <Col xs={12} className="mb-3">
                    <BootstrapButton
                      type="submit"
                      variant="primary"
                      disabled={loading || !isValidInput()}
                      style={{
                        width: '100%',
                        borderRadius: '25px',
                        padding: '12px',
                        textTransform: 'none',
                        fontSize: '1rem',
                      }}
                    >
                      {loading ? 'Logging In...' : 'Log In'}
                    </BootstrapButton>
                  </Col>
                  {failedAttempts >= 3 && (
                    <Col xs={12} className="mb-3">
                      <Typography variant="caption" color="text.secondary">
                        Verifying you’re not a bot...
                      </Typography>
                    </Col>
                  )}
                </Row>
                <Divider sx={{ my: 3 }}>Or log in with</Divider>
                <Row>
                  <Col xs={12} className="mb-2">
                    <BootstrapButton
                      variant="outline-secondary"
                      style={{ width: '100%', textTransform: 'none' }}
                      onClick={() => handleSocialLogin('Google')}
                    >
                      <Google fontSize="small" style={{ marginRight: '8px' }} />
                      Google
                    </BootstrapButton>
                  </Col>
                </Row>
                <Typography variant="body2" style={{ marginTop: '1.5rem' }}>
                  Don’t have an account?{' '}
                  {/* <Link href="/register" underline="hover">
                    Sign up
                  </Link> */}
                  <Box component={"span"} sx={{color:"primary.main",cursor:'pointer'}} onClick={()=>navigate('/register')}>Sign Up</Box>
                </Typography>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default Login;