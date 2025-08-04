import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Function to check if link is active
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Close mobile menu when link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="flex justify-between items-center py-5 px-[5%] border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="flex-1 max-w-[130px]">
          <Link to="/" className="block">
            <img src="/tickitz-blu.svg" alt="Tickitz Logo" />
          </Link>
        </div>

        {/* Desktop Navigation */}
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

        {/* Desktop Auth Buttons */}
        <div className="flex-1 hidden md:flex justify-end gap-3">
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

          <div className="flex flex-col gap-5">
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
              to="/movies"
              className={`text-lg py-2 border-b border-gray-100 ${
                isActive("/order") ? "text-blue-600" : "text-gray-900"
              }`}
              onClick={closeMobileMenu}
            >
              Buy Ticket
            </Link>
          </div>

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
        </div>
      )}
    </>
  );
};

export default Navbar;
