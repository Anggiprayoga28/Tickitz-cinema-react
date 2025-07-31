import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-24 bg-white py-5">
      <div className="flex justify-between max-w-[1200px] mx-auto px-[5%] py-10 flex-wrap gap-8">
        <section className="mb-8 min-w-[200px] flex-1">
          <div className="mb-4">
            <a href="/index.html" className="block">
              <img src="/tickitz-blu.svg" alt="Tickitz Logo" />
            </a>
          </div>
          <p className="text-gray-500 leading-relaxed max-w-[250px]">
            
            Stop waiting in line. Buy tickets conveniently, watch movies quietly.
          </p>
        </section>

        <section className="mb-8 min-w-[200px] flex-1">
          <h3 className="text-lg mb-5 text-gray-900">Explore</h3>
          <div className="flex flex-col gap-4">
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Cinemas</a>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Movies List</a>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">My Ticket</a>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Notification</a>
          </div>
        </section>

        <section className="mb-8 min-w-[200px] flex-1">
          <h3 className="text-lg mb-5 text-gray-900">Our Sponsor</h3>
          <div className="flex flex-col gap-4">
            <div className="h-8 mb-2">
              <img src="../public/ebv.id 2.svg" alt="Ebv.id" />
            </div>
            <div className="h-8 mb-2">
              <img src="../public/CineOne21 2.svg" alt="CineOne21" />
            </div>
            <div className="h-8 mb-2">
              <img src="../public/hiflix 2.svg" alt="Hiflix" />
            </div>
          </div>
        </section>

        <section className="mb-8 min-w-[200px] flex-1">
          <h3 className="text-lg mb-5 text-gray-900">Follow us</h3>
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
              <img src="../public/facebook.svg" alt="Facebook" />
              Tickitz Cinema id
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
              <img src="../public/instagram.svg" alt="Instagram" />
              tickitz.id
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
              <img src="../public/twitter.svg" alt="Twitter" />
              tickitz.id
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
              <img src="../public/youtube.svg" alt="Youtube" />
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