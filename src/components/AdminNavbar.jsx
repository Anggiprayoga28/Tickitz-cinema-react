import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, MapPin, User, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slice/authSlice';

const AdminNavbar = () => {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get user from Redux store
  const { loggedInUser, isAuthenticated } = useSelector((state) => state.auth);

  const isActive = (path) => {
    if (path === '/chart' && location.pathname === '/chart') return true;
    if (path === '/list-movie' && location.pathname === '/list-movie') return true;
    return false;
  };

  const getCurrentPageName = () => {
    if (location.pathname === '/chart') return 'Dashboard';
    if (location.pathname === '/list-movie') return 'Movie';
    return 'Dashboard';
  };

  const locations = [
    { id: 1, name: "Jakarta" },
    { id: 2, name: "Bandung" },
    { id: 3, name: "Surabaya" },
    { id: 4, name: "Yogyakarta" },
    { id: 5, name: "Bali" }
  ];

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileDropdownOpen(false);
    navigate("/login");
    alert("You have been logged out successfully!");
  };

  const getUserInitial = () => {
    if (loggedInUser?.name) {
      return loggedInUser.name.charAt(0).toUpperCase();
    }
    return 'A'; // Default for Admin
  };

  const getUserName = () => {
    return loggedInUser?.name || 'Admin User';
  };

  const getUserEmail = () => {
    return loggedInUser?.email || 'admin@tickitz.com';
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link to="/" className="block">
                <img src="/tickitz-blu.svg" alt="Logo Tickitz" />
              </Link>
              
              {/* Navigation Menu */}
              <nav className="hidden md:flex space-x-8">
                <Link
                  to="/chart"
                  className={`font-medium transition-colors ${
                    isActive('/chart') 
                      ? 'text-gray-900 border-b-2 border-blue-600 pb-1' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/list-movie"
                  className={`font-medium transition-colors ${
                    isActive('/list-movie') 
                      ? 'text-gray-900 border-b-2 border-blue-600 pb-1' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Movie
                </Link>
              </nav>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-6">
              {/* Location Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <span className="text-sm font-medium">Location</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${isLocationDropdownOpen ? 'rotate-180' : ''}`} 
                  />
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
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-3 transition-colors ${
                          selectedLocation.id === loc.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <MapPin size={16} />
                        <span>{loc.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Icon */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
                <Search size={20} />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-1 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                    {loggedInUser?.profilePicture ? (
                      <img 
                        src={loggedInUser.profilePicture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-sm font-medium">{getUserInitial()}</span>
                    )}
                  </div>
                  <ChevronDown 
                    size={14} 
                    className={`text-gray-500 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                          {loggedInUser?.profilePicture ? (
                            <img 
                              src={loggedInUser.profilePicture} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white text-sm font-medium">{getUserInitial()}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{getUserName()}</p>
                          <p className="text-xs text-gray-500">{getUserEmail()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User size={16} />
                        <span>Profile Settings</span>
                      </Link>
                      
                      <hr className="my-1 border-gray-100" />
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <nav className="flex space-x-8 py-2">
              <Link
                to="/chart"
                className={`font-medium transition-colors ${
                  isActive('/chart') 
                    ? 'text-gray-900 border-b-2 border-blue-600 pb-1' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/list-movie"
                className={`font-medium transition-colors ${
                  isActive('/list-movie') 
                    ? 'text-gray-900 border-b-2 border-blue-600 pb-1' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Movie
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Click outside handlers for dropdowns */}
      {(isLocationDropdownOpen || isProfileDropdownOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsLocationDropdownOpen(false);
            setIsProfileDropdownOpen(false);
          }}
        />
      )}
    </>
  );
};

export default AdminNavbar;