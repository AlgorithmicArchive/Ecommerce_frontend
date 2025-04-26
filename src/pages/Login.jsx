import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { Form } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
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
      // Simulate successful login (replace with API call)
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
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Matching gradient
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
            Sign In
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
            Welcome back! Please login to continue shopping.
          </Typography>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Login successful! Redirecting...
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
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
                "&:hover": { backgroundColor: "primary.main" },
                borderRadius: 8,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </Form>
          <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
            Don’t have an account?{" "}
            <Button
              color="primary"
              onClick={() => navigate("/register")}
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Register
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
