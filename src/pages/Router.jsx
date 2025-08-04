// Router.jsx - Complete routing system connecting all pages
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import MoviePage from "./Movie.jsx";
import MovieDetail from "./MovieDetail.jsx";
import OrderPage from "./OrderPage.jsx";
import Payment from "./Payment.jsx";
import TicketResult from "./TicketResult.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProfilePage from "./ProfilPage.jsx";
import OrderHistoryPage from "./OrderHistori.jsx";
import ListMovie from "./ListMovie.jsx";
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes with layout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/movies" element={<MoviePage />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />   
                    <Route path="/order" element={<OrderPage />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/ticket-result" element={<TicketResult />} />
                </Route>

                {/* Auth routes without layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* User profile routes with layout */}
                <Route element={<MainLayout />}>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/order-history" element={<OrderHistoryPage />} />
                    {/* <Route path="/chart" element={<Chart />} />
                    <Route path="/list-movie" element={<ListMovie />} /> */}
                </Route>

                {/* Admin routes without layout */}
                <Route path="/admin/movies" element={<ListMovie />} />
            </Routes>
        </BrowserRouter>
    );
}

function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default Router;