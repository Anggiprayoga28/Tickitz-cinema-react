import React, { useState } from 'react';
import { Menu, Router, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Main Navbar */}
      <nav className="flex justify-between items-center py-5 px-[5%] border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="flex-1 max-w-[130px]">
          <a href="/index.html" className="block">
            <img src="/tickitz-blu.svg" alt="Tickitz Logo" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="flex-[4] hidden md:flex justify-center">
          <ul className="flex list-none gap-10">
            <li>
              <a href="/index.html" className="text-gray-900 font-normal text-sm leading-5 hover:text-blue-600 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                Home
              </a>
            </li>
            <li>
              <a href="/index/movie.html" className="text-gray-900 font-normal text-sm leading-5 hover:text-blue-600 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                Movie
              </a>
            </li>
            <li>
              <a href="/index/detail.html" className="text-gray-900 font-normal text-sm leading-5 hover:text-blue-600 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                Buy Ticket
              </a>
            </li>
          </ul>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="flex-1 hidden md:flex justify-end gap-3">
          <a href="/index/login.html" className="px-4 py-3 border border-blue-600 bg-transparent text-blue-600 text-sm font-normal tracking-wide rounded hover:bg-blue-600 hover:bg-opacity-10 transition-colors">
            Sign in
          </a>
          <a href="/index/register.html" className="px-4 py-3 bg-blue-600 text-gray-50 text-sm font-normal tracking-wide border border-blue-600 rounded hover:bg-blue-700 transition-colors">
            Sign Up
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[2000] p-5 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <a href="/index.html" className="block">
              <img src="/tickitz-blu.svg" alt="Tickitz Logo" />
            </a>
            
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col gap-5">
            <a href="/index.html" className="text-lg text-gray-900 py-2 border-b border-gray-100">Home</a>
            <a href="/index/movie.html" className="text-lg text-gray-900 py-2 border-b border-gray-100">Movie</a>
            <a href="/index/detail.html" className="text-lg text-gray-900 py-2 border-b border-gray-100">Buy Ticket</a>
          </div>
          
          <div className="flex flex-col gap-4 mt-8">
            <a href="/index/login.html" className="px-4 py-3 border border-blue-600 bg-transparent text-blue-600 text-sm font-normal tracking-wide rounded text-center">
              Sign in
            </a>
            <a href="/index/register.html" className="px-4 py-3 bg-blue-600 text-gray-50 text-sm font-normal tracking-wide border border-blue-600 rounded text-center">
              Sign Up
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;