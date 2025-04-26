import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { Form, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Simulate successful registration (replace with API call)
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/"); // Redirect to home after success
      }, 2000);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Modern gradient background
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            p: 4,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Create Your Account
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
            Join us to explore the best shopping experience!
          </Typography>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Registration successful! Redirecting...
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
                />
              </Col>
              <Col md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  variant="outlined"
                  sx={{ mb: 2 }}
                  InputProps={{
                    style: { borderRadius: 8 },
                  }}
                />
              </Col>
            </Row>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                style: { borderRadius: 8 },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
                borderRadius: 8,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Button>
          </Form>
          <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
            Already have an account?{" "}
            <Button
              color="primary"
              onClick={() => navigate("/login")} // Replace with actual login route
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
