
import React, { useState } from 'react';
import { Search, Menu, X, MapPin, User } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Location');


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img src="/public/tickitz-blu.svg" alt="Tickitz Logo" className="h-8" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/movies" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors relative group"
              >
                Movies
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                to="/order" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium transition-colors relative group"
              >
                Buy Ticket
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin size={18} />
                <select 
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="border-none bg-transparent cursor-pointer focus:outline-none text-sm"
                >
                  <option value="Location">Location</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Bandung">Bandung</option>
                  <option value="Surabaya">Surabaya</option>
                </select>
              </div>
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <Search size={20} />
              </button>
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register"
                  className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="md:hidden flex items-center"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col p-5">
            <div className="flex justify-between items-center mb-8">
              <Link to="/">
                <img src="/public/tickitz-blu.svg" alt="Tickitz Logo" className="h-8" />
              </Link>
              <button onClick={toggleMobileMenu}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col gap-5 mb-8">
              <Link to="/" className="text-lg py-2 border-b border-gray-100" onClick={toggleMobileMenu}>
                Home
              </Link>
              <Link to="/movies" className="text-lg py-2 border-b border-gray-100" onClick={toggleMobileMenu}>
                Movies
              </Link>
              <Link to="/order" className="text-lg py-2 border-b border-gray-100" onClick={toggleMobileMenu}>
                Buy Ticket
              </Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <Link 
                to="/login" 
                className="btn border border-blue-600 text-blue-600 px-4 py-3 rounded text-center"
                onClick={toggleMobileMenu}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="btn bg-blue-600 text-white px-4 py-3 rounded text-center"
                onClick={toggleMobileMenu}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-20 py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <img src="/public/tickitz-blu.svg" alt="Tickitz" className="h-8" />
              <p className="text-gray-600 text-sm">
                Stop waiting in line. Buy tickets conveniently, watch movies quietly.
              </p>
            </div>

            {/* Explore Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Explore</h3>
              <div className="space-y-2">
                <Link to="/movies" className="block text-gray-600 hover:text-blue-600 text-sm">
                  Cinemas
                </Link>
                <Link to="/movies" className="block text-gray-600 hover:text-blue-600 text-sm">
                  Movies List
                </Link>
                <Link to="/ticket-result" className="block text-gray-600 hover:text-blue-600 text-sm">
                  My Ticket
                </Link>
                <Link to="/profile" className="block text-gray-600 hover:text-blue-600 text-sm">
                  Notification
                </Link>
              </div>
            </div>

            {/* Sponsor Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Our Sponsor</h3>
              <div className="space-y-3">
                <img src="/public/ebv.id 2.svg" alt="EBV.ID" className="h-6" />
                <img src="/public/CineOne21 2.svg" alt="CineOne21" className="h-6" />
                <img src="/public/hiflix 2.svg" alt="Hiflix" className="h-6" />
              </div>
            </div>

            {/* Social Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Follow Us</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm">
                  <img src="/public/facebook.svg" alt="Facebook" className="w-4 h-4" />
                  <span>Tickitz Cinema id</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm">
                  <img src="/public/instagram.svg" alt="Instagram" className="w-4 h-4" />
                  <span>tickitz.id</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm">
                  <img src="/public/twitter.svg" alt="Twitter" className="w-4 h-4" />
                  <span>tickitz.id</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm">
                  <img src="/public/youtube.svg" alt="YouTube" className="w-4 h-4" />
                  <span>Tickitz Cinema id</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            © 2020 Tickitz. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;