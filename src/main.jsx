import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import TickitzLogin from './components/Login.jsx'
import TickitzRegister from './components/Register.jsx'
import MovieWebsite from './components/Movie.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <TickitzLogin /> */}
    {/* <TickitzRegister /> */}
    {/* Uncomment the line below to use the App component */}
    {/* <App /> */}
    <MovieWebsite />
  </StrictMode>
)
