import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./assets/theme";
import Footer from "./components/shared/Footer";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./components/RoutesComponent";
import './index.css';
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <RoutesComponent />
        </BrowserRouter>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
