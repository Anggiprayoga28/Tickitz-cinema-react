import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, MapPin, LogOut, User, Search } from "lucide-react";
// MIGRATED: Redux imports removed, Context import added
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  

  const { loggedInUser, isAuthenticated, logoutUser } = useAuth();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    setIsUserDropdownOpen(false);
    navigate("/");
    toast("You have been logged out successfully!");
  };

  // Mock locations data
  const locations = [
    { id: 1, name: "Jakarta" },
    { id: 2, name: "Bandung" },
    { id: 3, name: "Surabaya"},
    { id: 4, name: "Yogyakarta" },
    { id: 5, name: "Bali"}
  ];

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <>
      {/* Main Navbar */}
      <nav className="flex justify-between items-center py-5 px-[5%] border-b border-gray-200 sticky top-0 z-50 bg-white">
        <ToastContainer />
        <div className="flex-1 max-w-[130px]">
          <Link to="/" className="block">
            <img src="/tickitz-blu.svg" alt="Tickitz Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="gap-10 md:flex hidden">
          <Link
            to="/"
            className="text-slate-800 font-normal text-sm hover:text-blue-600 relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/movies"
            className="text-slate-800 font-normal text-sm hover:text-blue-600 relative group"
          >
            Movie
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/order"
            className="text-slate-800 font-normal text-sm hover:text-blue-600 relative group"
          >
            Buy Ticket
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Right side - Auth or User Info */}
        <div className="hidden md:flex justify-end items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* Location Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <MapPin size={16} />
                  <span className="text-sm">{selectedLocation.name}</span>
                  <ChevronDown size={16} className={`transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLocationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {locations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => {
                          setSelectedLocation(loc);
                          setIsLocationDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-3 ${
                          selectedLocation.id === loc.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <span>{loc.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Icon */}
              <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Search size={20} />
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                    {loggedInUser?.profilePicture ? (
                      <img 
                        src={loggedInUser.profilePicture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={20} className="text-blue-600" />
                    )}
                  </div>
                  <ChevronDown size={16} className={`text-gray-600 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                          {loggedInUser?.profilePicture ? (
                            <img 
                              src={loggedInUser.profilePicture} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User size={24} className="text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{loggedInUser?.name || 'User'}</p>
                          <p className="text-sm text-gray-500">{loggedInUser?.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User size={18} />
                        <span>Profile Settings</span>
                      </Link>
                      <Link
                        to="/order-history"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>Order History</span>
                      </Link>
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Auth Buttons for non-authenticated users */
            <>
              <Link
                to="/login"
                className="px-4 py-3 border border-blue-600 bg-transparent text-blue-600 text-sm font-normal tracking-wide rounded hover:bg-blue-600 hover:bg-opacity-10 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 py-3 bg-blue-600 text-gray-50 text-sm font-normal tracking-wide border border-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[2000] p-5 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="block" onClick={closeMobileMenu}>
              <img src="/tickitz-blu.svg" alt="Tickitz Logo" />
            </Link>

            <button onClick={closeMobileMenu} aria-label="Close mobile menu">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-8">
            <Link
              to="/"
              className={`text-lg py-2 border-b border-gray-100 ${
                isActive("/") ? "text-blue-600" : "text-gray-900"
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className={`text-lg py-2 border-b border-gray-100 ${
                isActive("/movies") ? "text-blue-600" : "text-gray-900"
              }`}
              onClick={closeMobileMenu}
            >
              Movie
            </Link>
            <Link
              to="/order"
              className={`text-lg py-2 border-b border-gray-100 ${
                isActive("/order") ? "text-blue-600" : "text-gray-900"
              }`}
              onClick={closeMobileMenu}
            >
              Buy Ticket
            </Link>
          </div>

          {/* Mobile Auth/Profile Section */}
          {isAuthenticated ? (
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex items-center gap-3 py-2 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  {loggedInUser?.profilePicture ? (
                    <img 
                      src={loggedInUser.profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User size={24} className="text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{loggedInUser?.name || 'User'}</p>
                  <p className="text-sm text-gray-500">{loggedInUser?.email}</p>
                </div>
              </div>

              <Link
                to="/profile"
                className="flex items-center gap-3 py-2 text-gray-700"
                onClick={closeMobileMenu}
              >
                <User size={20} />
                <span>Profile Settings</span>
              </Link>

              <Link
                to="/order-history"
                className="flex items-center gap-3 py-2 text-gray-700"
                onClick={closeMobileMenu}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span>Order History</span>
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="flex items-center gap-3 py-2 text-red-600"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-8">
              <Link
                to="/login"
                className="px-4 py-3 border border-blue-600 bg-transparent text-blue-600 text-sm font-normal tracking-wide rounded text-center"
                onClick={closeMobileMenu}
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 py-3 bg-blue-600 text-gray-50 text-sm font-normal tracking-wide border border-blue-600 rounded text-center"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Click outside handlers untuk dropdowns */}
      {(isLocationDropdownOpen || isUserDropdownOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsLocationDropdownOpen(false);
            setIsUserDropdownOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;