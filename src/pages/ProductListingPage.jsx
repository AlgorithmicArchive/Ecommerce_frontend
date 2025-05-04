import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Box,
  Typography,
  TextField,
  Slider,
  Checkbox,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  IconButton,
  Pagination,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  Rating,
  Tooltip,
  Drawer,
  InputAdornment,
} from '@mui/material';
import { GridView, List, Favorite, FavoriteBorder, Close, FilterList, Search } from '@mui/icons-material';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';

// Mock product data (replace with API)
const mockProducts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  image: `https://via.placeholder.com/200?text=Product${i + 1}`,
  price: 50 + Math.random() * 450,
  originalPrice: Math.random() > 0.7 ? 50 + Math.random() * 550 : null,
  rating: 3 + Math.random() * 2,
  reviewCount: Math.floor(Math.random() * 200),
  brand: ['Apple', 'Samsung', 'Sony', 'Nike'][Math.floor(Math.random() * 4)],
  size: ['S', 'M', 'L'][Math.floor(Math.random() * 3)],
  color: ['Red', 'Blue', 'Black', 'White'][Math.floor(Math.random() * 4)],
  category: ['electronics', 'clothing', 'home', 'books'][Math.floor(Math.random() * 4)],
  isNew: Math.random() > 0.8,
  isSale: Math.random() > 0.7,
  isOutOfStock: Math.random() > 0.9,
}));

// Mock API call (replace with actual endpoint)
const fetchProducts = async (filters, sort, page, limit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockProducts];
      if (filters.price) filtered = filtered.filter((p) => p.price >= filters.price[0] && p.price <= filters.price[1]);
      if (filters.brands?.length) filtered = filtered.filter((p) => filters.brands.includes(p.brand));
      if (filters.sizes?.length) filtered = filtered.filter((p) => filters.sizes.includes(p.size));
      if (filters.colors?.length) filtered = filtered.filter((p) => filters.colors.includes(p.color));
      if (filters.ratings?.length) filtered = filtered.filter((p) => filters.ratings.some((r) => p.rating >= r));
      if (filters.category) filtered = filtered.filter((p) => p.category === filters.category);
      if (filters.search) {
        filtered = filtered.filter((p) => p.title.toLowerCase().includes(filters.search.toLowerCase()));
      }
      if (filters.isSale) filtered = filtered.filter((p) => p.isSale);
      if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
      if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
      if (sort === 'popularity') filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      if (sort === 'newest') filtered.sort((a, b) => (b.isNew ? 1 : -1));
      if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);
      resolve({ products: paginated, total: filtered.length });
    }, 500);
  });
};

const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filters, setFilters] = useState({
    price: [0, 500],
    brands: [],
    sizes: [],
    colors: [],
    ratings: [],
    category: undefined,
    search: undefined,
    isSale: undefined,
  });
  const navigate = useNavigate();
  const [sort, setSort] = useState('popularity');
  const [view, setView] = useState(Cookies.get('plp_view') || 'grid');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(false);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const brands = ['Apple', 'Samsung', 'Sony', 'Nike'];
  const sizes = ['S', 'M', 'L'];
  const colors = ['Red', 'Blue', 'Black', 'White'];
  const ratings = [3, 4, 5];

  useEffect(() => {
    // Load filters, sort, page, limit from URL
    const price = searchParams.get('price')?.split('-').map(Number) || [0, 500];
    const brands = searchParams.get('brands')?.split(',') || [];
    const sizes = searchParams.get('sizes')?.split(',') || [];
    const colors = searchParams.get('colors')?.split(',') || [];
    const ratings = searchParams.get('ratings')?.split(',').map(Number) || [];
    const sortParam = searchParams.get('sort') || 'popularity';
    const pageParam = Number(searchParams.get('page')) || 1;
    const limitParam = Number(searchParams.get('limit')) || 12;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const isSale = searchParams.get('isSale') === 'true';
    setFilters({ price, brands, sizes, colors, ratings, category, search, isSale });
    setSearchQuery(search || '');
    setSort(sortParam);
    setPage(pageParam);
    setLimit(limitParam);
  }, [searchParams]);

  useEffect(() => {
    // Fetch products when filters, sort, page, or limit change
    const loadProducts = async () => {
      setLoading(true);
      const { products, total } = await fetchProducts(filters, sort, page, limit);
      setProducts(products);
      setTotalProducts(total);
      setLoading(false);
    };
    loadProducts();
    // Update URL
    const params = {};
    if (filters.price[0] !== 0 || filters.price[1] !== 500) params.price = filters.price.join('-');
    if (filters.brands.length) params.brands = filters.brands.join(',');
    if (filters.sizes.length) params.sizes = filters.sizes.join(',');
    if (filters.colors.length) params.colors = filters.colors.join(',');
    if (filters.ratings.length) params.ratings = filters.ratings.join(',');
    if (sort !== 'popularity') params.sort = sort;
    if (page !== 1) params.page = page;
    if (limit !== 12) params.limit = limit;
    if (filters.category) params.category = filters.category;
    if (filters.search) params.search = filters.search;
    if (filters.isSale) params.isSale = filters.isSale;
    setSearchParams(params);
  }, [filters, sort, page, limit, setSearchParams]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page
  };

  const clearFilters = () => {
    setFilters({
      price: [0, 500],
      brands: [],
      sizes: [],
      colors: [],
      ratings: [],
      category: undefined,
      search: undefined,
      isSale: undefined,
    });
    setSearchQuery('');
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setFilters((prev) => ({ ...prev, search: searchQuery }));
      setPage(1);
    } else {
      setFilters((prev) => ({ ...prev, search: undefined }));
      setSearchQuery('');
    }
  };

  const toggleView = (newView) => {
    setView(newView);
    Cookies.set('plp_view', newView, { expires: 30 });
  };

  const handleAddToCart = (productId) => {
    // Mock add to cart
    alert(`Added Product ${productId} to cart!`);
  };

  const handleWishlistToggle = (productId) => {
    if (!isLoggedIn) {
      setLoginModalOpen(true);
      return;
    }
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleInfiniteScroll = async () => {
    if (infiniteLoading || products.length >= totalProducts) return;
    setInfiniteLoading(true);
    const nextPage = page + 1;
    const { products: newProducts } = await fetchProducts(filters, sort, nextPage, limit);
    setProducts((prev) => [...prev, ...newProducts]);
    setPage(nextPage);
    setInfiniteLoading(false);
  };

  const filterCount = [
    filters.brands.length,
    filters.sizes.length,
    filters.colors.length,
    filters.ratings.length,
    filters.price[0] !== 0 || filters.price[1] !== 500 ? 1 : 0,
    filters.search ? 1 : 0,
    filters.isSale ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const FilterSidebar = () => (
    <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 1, boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Price Range
      </Typography>
      <Slider
        value={filters.price}
        onChange={(e, value) => handleFilterChange('price', value)}
        valueLabelDisplay="auto"
        min={0}
        max={500}
        sx={{ mb: 2 }}
      />
      <Typography variant="subtitle1" gutterBottom>
        Brands
      </Typography>
      {brands.map((brand) => (
        <FormControlLabel
          key={brand}
          control={
            <Checkbox
              checked={filters.brands.includes(brand)}
              onChange={(e) =>
                handleFilterChange(
                  'brands',
                  e.target.checked
                    ? [...filters.brands, brand]
                    : filters.brands.filter((b) => b !== brand)
                )
              }
            />
          }
          label={brand}
        />
      ))}
      <Typography variant="subtitle1" gutterBottom>
        Sizes
      </Typography>
      {sizes.map((size) => (
        <FormControlLabel
          key={size}
          control={
            <Checkbox
              checked={filters.sizes.includes(size)}
              onChange={(e) =>
                handleFilterChange(
                  'sizes',
                  e.target.checked
                    ? [...filters.sizes, size]
                    : filters.sizes.filter((s) => s !== size)
                )
              }
            />
          }
          label={size}
        />
      ))}
      <Typography variant="subtitle1" gutterBottom>
        Colors
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        {colors.map((color) => (
          <Button
            key={color}
            sx={{
              minWidth: 30,
              height: 30,
              bgcolor: color.toLowerCase(),
              border: filters.colors.includes(color) ? '2px solid #000' : 'none',
            }}
            onClick={() =>
              handleFilterChange(
                'colors',
                filters.colors.includes(color)
                  ? filters.colors.filter((c) => c !== color)
                  : [...filters.colors, color]
              )
            }
          />
        ))}
      </Box>
      <Typography variant="subtitle1" gutterBottom>
        Ratings
      </Typography>
      {ratings.map((rating) => (
        <FormControlLabel
          key={rating}
          control={
            <Checkbox
              checked={filters.ratings.includes(rating)}
              onChange={(e) =>
                handleFilterChange(
                  'ratings',
                  e.target.checked
                    ? [...filters.ratings, rating]
                    : filters.ratings.filter((r) => r !== rating)
                )
              }
            />
          }
          label={`${rating} Stars & Up`}
        />
      ))}
      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button variant="contained" onClick={() => setPage(1)}>
          Apply
        </Button>
        <Button variant="outlined" onClick={clearFilters}>
          Clear
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ py: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Container>
        <Row>
          <Col xs={12}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Products
              </Typography>
              <Row className="align-items-center">
                <Col xs={12} md={6} lg={4} className="mb-2">
                  <form onSubmit={handleSearch}>
                    <TextField
                      label="Search Products"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      size="small"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton type="submit">
                              <Search />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </form>
                </Col>
                <Col xs={12} md={6} lg={8}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      startIcon={<FilterList />}
                      onClick={() => setFilterDrawerOpen(true)}
                      sx={{ display: { md: 'none' } }}
                    >
                      Filters ({filterCount})
                    </Button>
                    <Select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      size="small"
                    >
                      <MenuItem value="popularity">Popularity</MenuItem>
                      <MenuItem value="price-low">Price: Low to High</MenuItem>
                      <MenuItem value="price-high">Price: High to Low</MenuItem>
                      <MenuItem value="newest">Newest First</MenuItem>
                      <MenuItem value="rating">Customer Rating</MenuItem>
                    </Select>
                    <IconButton onClick={() => toggleView('grid')}>
                      <GridView color={view === 'grid' ? 'primary' : 'inherit'} />
                    </IconButton>
                    <IconButton onClick={() => toggleView('list')}>
                      <List color={view === 'list' ? 'primary' : 'inherit'} />
                    </IconButton>
                    <Select
                      value={limit}
                      onChange={(e) => setLimit(Number(e.target.value))}
                      size="small"
                    >
                      <MenuItem value={12}>12 per page</MenuItem>
                      <MenuItem value={24}>24 per page</MenuItem>
                      <MenuItem value={48}>48 per page</MenuItem>
                    </Select>
                  </Box>
                </Col>
              </Row>
            </Box>
          </Col>
          <Col md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <FilterSidebar />
          </Col>
          <Col xs={12} md={9}>
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Row>
                {products.map((product) => (
                  <Col
                    key={product.id}
                    xs={6}
                    md={view === 'grid' ? 4 : 12}
                    lg={view === 'grid' ? 3 : 12}
                    className="mb-4"
                  >
                    <Box
                      sx={{
                        bgcolor: '#fff',
                        borderRadius: 1,
                        boxShadow: 1,
                        p: 2,
                        position: 'relative',
                        transition: 'box-shadow 0.3s',
                        '&:hover': {
                          boxShadow: 3,
                        },
                        display: view === 'list' ? 'flex' : 'block',
                        alignItems: view === 'list' ? 'center' : 'unset',
                      }}
                    >
                      <Link to={`/product/${product.id}`}>
                        <Box sx={{ position: 'relative', mb: 2 }}>
                          <img
                            src={product.image}
                            alt={product.title}
                            style={{
                              width: '100%',
                              height: '200px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                            }}
                            loading="lazy"
                          />
                          {product.isNew && (
                            <Chip label="New" color="success" size="small" sx={{ position: 'absolute', top: 8, left: 8 }} />
                          )}
                          {product.isSale && (
                            <Chip label="Sale" color="error" size="small" sx={{ position: 'absolute', top: 8, left: product.isNew ? 48 : 8 }} />
                          )}
                          {product.isOutOfStock && (
                            <Chip label="Out of Stock" color="default" size="small" sx={{ position: 'absolute', top: 8, right: 8 }} />
                          )}
                        </Box>
                      </Link>
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 1,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: product.isSale ? 'error.main' : 'text.primary', mr: 1 }}>
                          ${product.price.toFixed(2)}
                        </Typography>
                        {product.originalPrice && (
                          <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                            ${product.originalPrice.toFixed(2)}
                          </Typography>
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={product.rating} readOnly size="small" precision={0.5} />
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          ({product.reviewCount})
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, flexDirection: view === 'list' ? 'row' : 'column' }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleAddToCart(product.id)}
                          disabled={product.isOutOfStock}
                          sx={{ flexGrow: 1 }}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate('/productDetails')}
                          sx={{ flexGrow: 1 }}
                        >
                          Quick View
                        </Button>
                      </Box>
                      <Tooltip title={wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}>
                        <IconButton
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                          onClick={() => handleWishlistToggle(product.id)}
                        >
                          {wishlist.includes(product.id) ? <Favorite color="error" /> : <FavoriteBorder />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Col>
                ))}
              </Row>
            )}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              {infiniteLoading && <CircularProgress />}
              {!infiniteLoading && products.length < totalProducts && (
                <Button variant="contained" onClick={handleInfiniteScroll}>
                  Load More
                </Button>
              )}
              <Pagination
                count={Math.ceil(totalProducts / limit)}
                page={page}
                onChange={(e, value) => setPage(value)}
                sx={{ mt: 2, display: 'inline-flex' }}
              />
            </Box>
          </Col>
        </Row>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        sx={{ display: { md: 'none' } }}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setFilterDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <FilterSidebar />
        </Box>
      </Drawer>

      {/* Quick View Dialog */}
      <Dialog open={!!quickViewProduct} onClose={() => setQuickViewProduct(null)}>
        <DialogTitle>{quickViewProduct?.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <img
              src={quickViewProduct?.image}
              alt={quickViewProduct?.title}
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            <Box>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Price: ${quickViewProduct?.price.toFixed(2)}
              </Typography>
              <Rating value={quickViewProduct?.rating} readOnly size="small" precision={0.5} />
              <Typography variant="caption" sx={{ ml: 1 }}>
                ({quickViewProduct?.reviewCount} reviews)
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => handleAddToCart(quickViewProduct?.id)}
                disabled={quickViewProduct?.isOutOfStock}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Login Prompt Dialog */}
      <Dialog open={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <DialogTitle>Please Log In</DialogTitle>
        <DialogContent>
          <Typography>You need to log in to add items to your wishlist.</Typography>
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

export default ProductListingPage;