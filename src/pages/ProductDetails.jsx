import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  IconButton,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Select,
  MenuItem,
  Pagination,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { Add, Remove, Favorite, FavoriteBorder, ExpandMore, ShoppingCart, ArrowForward } from '@mui/icons-material';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

// Mock product data (replace with API)
const mockProduct = {
  id: 1,
  title: 'Premium Wireless Headphones',
  images: [
    'https://via.placeholder.com/600?text=Headphones+1',
    'https://via.placeholder.com/600?text=Headphones+2',
    'https://via.placeholder.com/600?text=Headphones+3',
    'https://via.placeholder.com/600?text=Headphones+4',
  ],
  price: 199.99,
  originalPrice: 249.99,
  stock: 8,
  seller: 'TechTrend Innovations',
  colors: ['Black', 'White', 'Blue'],
  sizes: ['Standard', 'Premium'],
  unavailableVariants: { color: [], size: ['Premium'] },
  description: {
    overview:
      'Experience superior sound quality with our Premium Wireless Headphones. Designed for comfort and durability, these headphones offer noise cancellation and up to 20 hours of battery life, perfect for music lovers and professionals.',
    features: [
      'Active Noise Cancellation',
      '20-hour battery life',
      'Bluetooth 5.0 connectivity',
      'Comfort-fit ear cushions',
    ],
    specifications: [
      { label: 'Weight', value: '250g' },
      { label: 'Dimensions', value: '18 x 16 x 8 cm' },
      { label: 'Material', value: 'Plastic, Leather' },
      { label: 'Battery', value: '600mAh' },
    ],
  },
  rating: 4.3,
  reviewBreakdown: { 5: 70, 4: 20, 3: 8, 2: 1, 1: 1 },
  reviews: Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    user: `User ${i + 1}`,
    date: '2025-04-01',
    rating: 3 + Math.random() * 2,
    comment: `Great product! Sound quality is excellent, though battery life could be better. Comfortable for long use.`,
    helpful: Math.floor(Math.random() * 10),
  })),
};

// Mock API call (replace with actual endpoint)
const fetchProduct = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProduct);
    }, 500);
  });
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [reviewPage, setReviewPage] = useState(1);
  const reviewsPerPage = 10;

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProduct(id);
      setProduct(data);
      setSelectedColor(data.colors[0]);
      setSelectedSize(data.sizes.find((s) => !data.unavailableVariants.size.includes(s)) || '');
    };
    loadProduct();
  }, [id]);

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(value, product?.stock || 10));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select color and size.');
      return;
    }
    if (product.stock === 0) return;
    // Mock add to cart
    setSnackbarOpen(true);
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select color and size.');
      return;
    }
    if (product.stock === 0) return;
    // Mock redirect to checkout
    navigate('/checkout', { state: { productId: product.id, quantity, color: selectedColor, size: selectedSize } });
  };

  const handleWishlistToggle = () => {
    if (!isLoggedIn) {
      setLoginModalOpen(true);
      return;
    }
    setWishlist((prev) =>
      prev.includes(product?.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleWriteReview = () => {
    if (!isLoggedIn) {
      setLoginModalOpen(true);
      return;
    }
    // Mock redirect to review form
    alert('Redirect to review form');
  };

  const filteredReviews = product?.reviews.filter(
    (review) => reviewFilter === 'all' || Math.round(review.rating) === Number(reviewFilter)
  );
  const paginatedReviews = filteredReviews?.slice(
    (reviewPage - 1) * reviewsPerPage,
    reviewPage * reviewsPerPage
  );

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const stockStatus =
    product.stock === 0 ? 'Out of Stock' : product.stock <= 5 ? 'Low Stock' : 'In Stock';
  const stockColor = product.stock === 0 ? 'error' : product.stock <= 5 ? 'warning' : 'success';
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Box sx={{ py: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Container>
        <Row>
          {/* Product Gallery */}
          <Col md={6}>
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  width: '600px',
                  height: '600px',
                  overflow: 'hidden',
                  position: 'relative',
                  '&:hover img': {
                    transform: 'scale(2)',
                    cursor: 'zoom-in',
                  },
                }}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s',
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto' }}>
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: '100px',
                      height: '100px',
                      border: selectedImage === index ? '2px solid #1976d2' : '1px solid #ddd',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleImageChange(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Col>

          {/* Product Info */}
          <Col md={6}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              {product.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                ${product.price.toFixed(2)}
              </Typography>
              {product.originalPrice && (
                <>
                  <Typography variant="body1" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                    ${product.originalPrice.toFixed(2)}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'error.main' }}>
                    {discountPercentage}% OFF
                  </Typography>
                </>
              )}
            </Box>
            <Chip label={stockStatus} color={stockColor} sx={{ mb: 2 }} />
            <Typography variant="body2" sx={{ mb: 2 }}>
              Sold by <Link to={`/seller/${product.seller}`}>{product.seller}</Link>
            </Typography>

            {/* Color Selector */}
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Color: {selectedColor || 'Select a color'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {product.colors.map((color) => (
                <Button
                  key={color}
                  sx={{
                    minWidth: 30,
                    height: 30,
                    bgcolor: color.toLowerCase(),
                    border: selectedColor === color ? '2px solid #1976d2' : '1px solid #ddd',
                    '&:hover': { bgcolor: color.toLowerCase() },
                  }}
                  onClick={() => setSelectedColor(color)}
                  disabled={product.unavailableVariants.color.includes(color)}
                />
              ))}
            </Box>

            {/* Size Selector */}
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Size: {selectedSize || 'Select a size'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'contained' : 'outlined'}
                  onClick={() => setSelectedSize(size)}
                  disabled={product.unavailableVariants.size.includes(size)}
                >
                  {size}
                </Button>
              ))}
            </Box>

            {/* Quantity Selector */}
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Quantity
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <IconButton
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || product.stock === 0}
              >
                <Remove />
              </IconButton>
              <TextField
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                size="small"
                sx={{ width: '60px', textAlign: 'center' }}
                inputProps={{ min: 1, max: product.stock }}
                disabled={product.stock === 0}
              />
              <IconButton
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock || product.stock === 0}
              >
                <Add />
              </IconButton>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={!selectedColor || !selectedSize || product.stock === 0}
                sx={{ flexGrow: 1 }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ArrowForward />}
                onClick={handleBuyNow}
                disabled={!selectedColor || !selectedSize || product.stock === 0}
                sx={{ flexGrow: 1 }}
              >
                Buy Now
              </Button>
              <Tooltip title={wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}>
                <IconButton onClick={handleWishlistToggle}>
                  {wishlist.includes(product.id) ? <Favorite color="error" /> : <FavoriteBorder />}
                </IconButton>
              </Tooltip>
            </Box>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={product.rating} readOnly precision={0.1} />
              <Typography variant="body2">({product.reviews.length} reviews)</Typography>
            </Box>
          </Col>
        </Row>

        {/* Product Description */}
        <Row>
          <Col xs={12}>
            <Accordion defaultExpanded sx={{ mt: 3 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Product Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {product.description.overview}
                </Typography>
                <Typography variant="subtitle1">Key Features:</Typography>
                <ul>
                  {product.description.features.map((feature, index) => (
                    <li key={index}>
                      <Typography variant="body2">{feature}</Typography>
                    </li>
                  ))}
                </ul>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Specifications:
                </Typography>
                <Table>
                  <TableBody>
                    {product.description.specifications.map((spec, index) => (
                      <TableRow key={index}>
                        <TableCell>{spec.label}</TableCell>
                        <TableCell>{spec.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          </Col>
        </Row>

        {/* Reviews & Ratings */}
        <Row>
          <Col xs={12}>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Reviews & Ratings
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h5">{product.rating.toFixed(1)}/5</Typography>
                <Rating value={product.rating} readOnly precision={0.1} />
                <Typography variant="body2">({product.reviews.length} reviews)</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                {Object.entries(product.reviewBreakdown).map(([stars, percentage]) => (
                  <Typography key={stars} variant="body2">
                    {stars} Star: {percentage}%
                  </Typography>
                ))}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography>Filter by:</Typography>
                <Select
                  value={reviewFilter}
                  onChange={(e) => {
                    setReviewFilter(e.target.value);
                    setReviewPage(1);
                  }}
                  size="small"
                >
                  <MenuItem value="all">All Ratings</MenuItem>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <MenuItem key={star} value={star}>
                      {star} Star
                    </MenuItem>
                  ))}
                </Select>
                <Button variant="outlined" onClick={handleWriteReview}>
                  Write a Review
                </Button>
              </Box>
              {paginatedReviews?.map((review) => (
                <Box key={review.id} sx={{ borderBottom: '1px solid #ddd', py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating value={review.rating} readOnly size="small" precision={0.5} />
                    <Typography variant="body2">{review.user} - {review.date}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {review.comment}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => alert(`Marked review ${review.id} as helpful`)}
                  >
                    Helpful ({review.helpful})
                  </Button>
                </Box>
              ))}
              <Pagination
                count={Math.ceil(filteredReviews?.length / reviewsPerPage)}
                page={reviewPage}
                onChange={(e, value) => setReviewPage(value)}
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
              />
            </Box>
          </Col>
        </Row>

        {/* Shipping & Return Policy */}
        <Row>
          <Col xs={12}>
            <Accordion sx={{ mt: 3 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Shipping & Returns</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1">Shipping</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Estimated delivery: 2–5 business days. Free shipping on orders over $50.
                </Typography>
                <Typography variant="subtitle1">Returns</Typography>
                <Typography variant="body2">
                  30-day free returns for unused items in original condition.{' '}
                  <Link to="/returns-policy">Learn more</Link>.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Col>
        </Row>
      </Container>

      {/* Add to Cart Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          action={
            <Button color="inherit" size="small" component={Link} to="/cart">
              View Cart
            </Button>
          }
        >
          Added to Cart!
        </Alert>
      </Snackbar>

      {/* Login Prompt Dialog */}
      <Dialog open={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <DialogTitle>Please Log In</DialogTitle>
        <DialogContent>
          <Typography>You need to log in to add items to your wishlist or write a review.</Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button variant="contained" component={Link} to="/login">
              Log In
            </Button>
            <Button variant="outlined" onClick={() => setLoginModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductDetailsPage;