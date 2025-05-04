import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  InputBase,
  alpha,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const navItems = [
  { text: "Home", path: "/" },
  { text: "About", path: "/" },
  { text: "Products", path: "/products" },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    if (isMobile) setMobileOpen(false); // Close drawer on mobile after navigation
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", width: 250 }}>
      <Typography
        variant="h6"
        sx={{ my: 2, fontFamily: "'Pacifico', cursive" }}
      >
        ShopEase
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Button
              sx={{ textAlign: "center", width: "100%" }}
              onClick={() => handleNavClick(item.path)}
            >
              <ListItemText primary={item.text} />
            </Button>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem disablePadding>
        <Button
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            width: "100%",
          }}
          onClick={() => handleNavClick("/login")}
        >
          <ListItemText primary={"Login"} />
        </Button>
      </ListItem>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        height: "10vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          color: "#333333",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between", // Distribute space between start, center, and end
            alignItems: "center",
          }}
        >
          {/* Mobile menu button (start) */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo/Brand name (start on mobile, hidden on desktop) */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "block" },
              fontWeight: "bold",
            }}
          >
            ShopEase
          </Typography>

          {/* Centered navigation items (desktop only) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                sx={{ mx: 2 }}
                onClick={() => handleNavClick(item.path)}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Login button and search (end) */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                fontWeight: "bold",
                ml: 2,
              }}
              onClick={() => handleNavClick("/login")}
            >
              Login
            </Button>

            {/* Search icon/button (mobile only when not expanded) */}
            <IconButton
              color="inherit"
              onClick={toggleSearch}
              sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}
            >
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Search bar (mobile expanded) */}
          {searchOpen && (
            <Box
              sx={{ display: "flex", alignItems: "center", flexGrow: 1, mt: 2 }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search products..."
                  inputProps={{ "aria-label": "search" }}
                  autoFocus
                />
              </Search>
              <IconButton onClick={toggleSearch} sx={{ ml: 1 }}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
