import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-'
import './index.css'
import App from './App.jsx'
// import TickitzLogin from './components/Login.jsx'
// import TickitzRegister from './components/Register.jsx'
import MovieWebsite from './pages/Movie.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import OrderPage from './pages/orderpage.jsx'
import Payment from './pages/Payment.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <MainLayout /> */}
    {/* <TickitzLogin /> */}
    {/* <TickitzRegister /> */}
    {/* Uncomment the line below to use the App component */}
    {/* <App /> */}
    {/* <MovieWebsite /> */}
    {/* <Router /> */}
    {/* <LandingPage /> */}
    <OrderPage />
    {/* <Payment /> */}
  </StrictMode>
)
