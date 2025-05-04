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
import { Visibility, VisibilityOff, Google, Facebook } from '@mui/icons-material';
import PhoneInput from 'react-phone-input-2';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Mock backend functions (replace with actual API calls)
const checkEmailUnique = async (email) => {
  // Simulate API call to check email uniqueness
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ isUnique: email !== 'test@user.com' });
    }, 500);
  });
};

const registerUser = async (userData) => {
  // Simulate API call to register user
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Registration successful! OTP sent.' });
    }, 1000);
  });
};

const sendOTP = async (contact, method) => {
  // Simulate OTP generation and sending
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, otp });
    }, 1000);
  });
};

const verifyOTP = async (otp, expectedOtp) => {
  // Simulate OTP verification
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: otp === expectedOtp, message: otp === expectedOtp ? 'OTP verified!' : 'Invalid OTP' });
    }, 1000);
  });
};

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpStage, setOtpStage] = useState(false);
  const [otp, setOtp] = useState('');
  const [expectedOtp, setExpectedOtp] = useState('');
  const [otpMethod, setOtpMethod] = useState('email');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();
  const validateForm = async () => {
    const newErrors = {};
    if (!formData.fullName || !/^[a-zA-Z\s]{2,50}$/.test(formData.fullName)) {
      newErrors.fullName = 'Name must be 2–50 characters, letters and spaces only.';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email.';
    } else {
      const { isUnique } = await checkEmailUnique(formData.email);
      if (!isUnique) newErrors.email = 'Email already registered.';
    }
    if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password = 'Password must be 8+ characters with 1 uppercase, 1 lowercase, 1 number, 1 special character.';
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    if (formData.phone && !/^\+\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number (e.g., +1234567890).';
    }
    if (!formData.terms) {
      newErrors.terms = 'You must agree to the Terms & Conditions.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 'Weak';
    if (password.length >= 8) {
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecial = /[@$!%*?&]/.test(password);
      const criteriaMet = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
      if (criteriaMet === 4) strength = 'Strong';
      else if (criteriaMet >= 2) strength = 'Medium';
    }
    setPasswordStrength(strength);
  };

  const handleInputChange = async (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'password') calculatePasswordStrength(value);
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    if (await validateForm()) {
      setLoading(true);
      const response = await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password, // Backend should hash this
        phone: formData.phone || null,
      });
      setLoading(false);

      if (response.success) {
        setSuccess(response.message);
        // Send OTP
        const otpResponse = await sendOTP(formData[otpMethod], otpMethod);
        if (otpResponse.success) {
          setExpectedOtp(otpResponse.otp);
          setOtpStage(true);
          setResendCooldown(30);
          const cooldownInterval = setInterval(() => {
            setResendCooldown((prev) => {
              if (prev <= 1) {
                clearInterval(cooldownInterval);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          setErrors({ general: 'Failed to send OTP. Please try again.' });
        }
      } else {
        setErrors({ general: response.message || 'Registration failed.' });
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    const response = await verifyOTP(otp, expectedOtp);
    setLoading(false);
    if (response.success) {
      setSuccess('Registration complete! Redirecting...');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } else {
      setErrors({ otp: response.message });
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setErrors({});
    setLoading(true);
    const otpResponse = await sendOTP(formData[otpMethod], otpMethod);
    setLoading(false);
    if (otpResponse.success) {
      setExpectedOtp(otpResponse.otp);
      setSuccess('OTP resent successfully.');
      setResendCooldown(30);
      const cooldownInterval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setErrors({ general: 'Failed to resend OTP. Please try again.' });
    }
  };

  const handleSocialSignup = (provider) => {
    // Mock OAuth redirect (replace with actual OAuth URLs)
    alert(`Signing up with ${provider}`);
    // Example: Pre-fill form with Google data
    if (provider === 'Google') {
      setFormData((prev) => ({
        ...prev,
        fullName: 'John Doe', // Mock data
        email: 'john.doe@gmail.com',
      }));
    }
  };

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
              Sign Up
            </Typography>
            {success && !otpStage && (
              <Alert severity="success" sx={{ marginBottom: 2 }}>
                {success}
              </Alert>
            )}
            {!otpStage ? (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} className="mb-3">
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      error={!!errors.fullName}
                      helperText={errors.fullName}
                      sx={{ bgcolor: '#fff' }}
                    />
                  </Col>
                  <Col xs={12} className="mb-3">
                    <TextField
                      fullWidth
                      label="Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      error={!!errors.email}
                      helperText={errors.email}
                      sx={{ bgcolor: '#fff' }}
                    />
                  </Col>
                  <Col xs={12} className="mb-3">
                    <TextField
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      error={!!errors.password}
                      helperText={errors.password || `Strength: ${passwordStrength || 'N/A'}`}
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
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      sx={{ bgcolor: '#fff' }}
                    />
                  </Col>
                  <Col xs={12} className="mb-3">
                    <PhoneInput
                      country={'us'}
                      value={formData.phone}
                      onChange={(phone) => handleInputChange('phone', `+${phone}`)}
                      inputStyle={{ width: '100%', backgroundColor: '#fff', borderRadius: '4px' }}
                      containerStyle={{ width: '100%' }}
                    />
                    {errors.phone && (
                      <Typography variant="caption" color="error">
                        {errors.phone}
                      </Typography>
                    )}
                  </Col>
                  <Col xs={12} className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label={
                        <span>
                          I agree to the{' '}
                          <Link href="/terms" underline="hover">
                            Terms & Conditions
                          </Link>
                        </span>
                      }
                      checked={formData.terms}
                      onChange={(e) => handleInputChange('terms', e.target.checked)}
                    />
                    {errors.terms && (
                      <Typography variant="caption" color="error">
                        {errors.terms}
                      </Typography>
                    )}
                  </Col>
                  <Col xs={12} className="mb-3">
                    <BootstrapButton
                      type="submit"
                      variant="primary"
                      disabled={loading || Object.keys(errors).length > 0}
                      style={{
                        width: '100%',
                        borderRadius: '25px',
                        padding: '12px',
                        textTransform: 'none',
                        fontSize: '1rem',
                      }}
                    >
                      {loading ? 'Signing Up...' : 'Sign Up'}
                    </BootstrapButton>
                  </Col>
                  {errors.general && (
                    <Col xs={12} className="mb-3">
                      <Alert severity="error">{errors.general}</Alert>
                    </Col>
                  )}
                </Row>
                <Divider sx={{ my: 3 }}>Or sign up with</Divider>
                <Row>
                  <Col xs={12} className="mb-2">
                    <BootstrapButton
                      variant="outline-secondary"
                      style={{ width: '100%', textTransform: 'none' }}
                      onClick={() => handleSocialSignup('Google')}
                    >
                      <Google fontSize="small" style={{ marginRight: '8px' }} />
                      Google
                    </BootstrapButton>
                  </Col>
                 
                </Row>
                <Typography variant="body2" style={{ marginTop: '1.5rem' }}>
                  Already have an account?{' '}
                  <Box component={"span"} sx={{color:"primary.main",cursor:'pointer'}} onClick={()=>navigate('/login')}>Log In</Box>
                </Typography>
              </Form>
            ) : (
              <Form onSubmit={handleOtpSubmit}>
                <Row>
                  <Col xs={12} className="mb-3">
                    <Typography variant="h6" style={{ marginBottom: '1rem' }}>
                      Enter OTP sent to {formData[otpMethod]}
                    </Typography>
                    <TextField
                      fullWidth
                      label="6-Digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      error={!!errors.otp}
                      helperText={errors.otp}
                      sx={{ bgcolor: '#fff' }}
                    />
                  </Col>
                  <Col xs={12} className="mb-3">
                    <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <BootstrapButton
                        type="submit"
                        variant="primary"
                        disabled={loading || otp.length !== 6}
                        style={{
                          width: '48%',
                          borderRadius: '25px',
                          padding: '12px',
                          textTransform: 'none',
                        }}
                      >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                      </BootstrapButton>
                      <BootstrapButton
                        variant="outline-primary"
                        onClick={handleResendOtp}
                        disabled={loading || resendCooldown > 0}
                        style={{
                          width: '48%',
                          borderRadius: '25px',
                          padding: '12px',
                          textTransform: 'none',
                        }}
                      >
                        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                      </BootstrapButton>
                    </Box>
                  </Col>
                  {success && (
                    <Col xs={12} className="mb-3">
                      <Alert severity="success">{success}</Alert>
                    </Col>
                  )}
                  {errors.general && (
                    <Col xs={12} className="mb-3">
                      <Alert severity="error">{errors.general}</Alert>
                    </Col>
                  )}
                </Row>
                <Form.Check
                  type="radio"
                  label="Send OTP to Email"
                  checked={otpMethod === 'email'}
                  onChange={() => setOtpMethod('email')}
                  style={{ marginTop: '1rem' }}
                />
                <Form.Check
                  type="radio"
                  label="Send OTP to Phone"
                  checked={otpMethod === 'phone'}
                  onChange={() => setOtpMethod('phone')}
                  disabled={!formData.phone}
                />
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default Register;