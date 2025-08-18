// src/pages/Router.jsx - Hybrid (tanpa ProtectedRoute untuk sementara)
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import MoviePage from "./Movie.jsx";
import Payment from "./Payment.jsx";
import TicketResult from "./TicketResult.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProfilePage from "./ProfilPage.jsx";
import OrderHistoryPage from "./OrderHistori.jsx";
import ListMovie from "./ListMovie.jsx";
import Navbar from "../components/Navbar.jsx";
import AdminNavbar from "../components/AdminNavbar.jsx";
import Footer from "../components/Footer.jsx";
import MovieDetailPage from "./MovieDetail.jsx";
import OrderPage from "./OrderPage.jsx";
import TickitzDashboard from "./TickitzDashboard.jsx";
import MovieApp from "./ListMovie.jsx";
import ForgotPassword from "./ForgotPassword.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes dengan layout utama */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route path="/ticket-result" element={<TicketResult />} />
        </Route>

        {/* Admin routes dengan layout admin */}
        <Route element={<AdminLayout />}>
          <Route path="/chart" element={<TickitzDashboard />} />
          <Route path="/list-movie" element={<MovieApp />} />
          <Route path="/admin/movies" element={<ListMovie />} />
        </Route>

        {/* Auth routes tanpa layout - MENGGUNAKAN CONTEXT */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

// Layout utama untuk halaman publik
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

// Layout admin untuk dashboard dan halaman admin
function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
}

export default Router;