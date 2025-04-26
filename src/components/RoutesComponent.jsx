import { Routes, Route, Outlet } from "react-router-dom";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import LandingPage from "../pages/LandingPage";
import Navbar from "../components/shared/Navbar";
import Login from "../pages/Login";

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Renders the matched route component */}
    </div>
  );
}

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
      </Route>
    </Routes>
  );
}

export default RoutesComponent;
