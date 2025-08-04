import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-24 bg-white py-5">
      <div className="flex justify-between max-w-[1200px] mx-auto px-[5%] py-10 flex-wrap gap-8">
        <section className="mb-8 min-w-[200px] flex-1">
          <div className="mb-4">
            <Link to="/" className="block">
              <img src="/tickitz-blu.svg" alt="Tickitz Logo" />
            </Link>
          </div>
          <p className="text-gray-500 leading-relaxed max-w-[250px]">
            Stop waiting in line. Buy tickets conveniently, watch movies quietly.
          </p>
        </section>

        <section className="mb-8 min-w-[200px] flex-1">
          <h3 className="text-lg mb-5 text-gray-900">Explore</h3>
          <div className="flex flex-col gap-4">
            <Link to="/movies" className="text-gray-500 hover:text-blue-600 transition-colors">
              Cinemas
            </Link>
            <Link to="/movies" className="text-gray-500 hover:text-blue-600 transition-colors">
              Movies List
            </Link>
            <Link to="/order-history" className="text-gray-500 hover:text-blue-600 transition-colors">
              My Ticket
            </Link>
            <Link to="/profile" className="text-gray-500 hover:text-blue-600 transition-colors">
              Notification
            </Link>
          </div>
        </section>

        <section className="mb-8 min-w-[200px] flex-1">
          <h3 className="text-lg mb-5 text-gray-900">Our Sponsor</h3>
          <div className="flex flex-col gap-4">
            <div className="h-8 mb-2">
              <img src="/public/ebv.id 2.svg" alt="Ebv.id" className="h-full object-contain" />
            </div>
            <div className="h-8 mb-2">
              <img src="/public/CineOne21 2.svg" alt="CineOne21" className="h-full object-contain" />
            </div>
            <div className="h-8 mb-2">
              <img src="/public/hiflix 2.svg" alt="Hiflix" className="h-full object-contain" />
            </div>
          </div>
        </section>

        <section className="mb-8 min-w-[200px] flex-1">
          <h3 className="text-lg mb-5 text-gray-900">Follow us</h3>
          <div className="flex flex-col gap-4">
            <a 
              href="https://facebook.com/tickitz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" />
              Tickitz Cinema id
            </a>
            <a 
              href="https://instagram.com/tickitz.id" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <img src="/instagram.svg" alt="Instagram" className="w-5 h-5" />
              tickitz.id
            </a>
            <a 
              href="https://twitter.com/tickitz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <img src="/twitter.svg" alt="Twitter" className="w-5 h-5" />
              tickitz.id
            </a>
            <a 
              href="https://youtube.com/tickitz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <img src="/youtube.svg" alt="Youtube" className="w-5 h-5" />
              Tickitz Cinema id
            </a>
          </div>
        </section>
      </div>
      
      <div className="text-center text-gray-500 py-5 w-full mt-5">
        © 2020 Tickitz. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;