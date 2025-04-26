import { createTheme } from "@mui/material";

// Custom theme for e-commerce
export const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6b6b", // You can change this to your brand color
    },
    secondary: {
      main: "#4ecdc4", // Secondary brand color
    },
    error: {
      main: "#ff4757", // Color for badges
    },
  },
});
