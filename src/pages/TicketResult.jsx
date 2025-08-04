import React from 'react';
import MainLayout from '../layouts/MainLayout';


const TicketResult = () => {
  return (

    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <div className="container mx-auto max-w-5xl min-h-screen flex gap-6 animate-fade-in">
        {/* Left Section */}
        <div className="flex-1 p-16 flex flex-col justify-center text-white relative rounded-lg overflow-hidden"
             style={{
               background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/public/background.svg) center/cover'
             }}>
          {/* Background overlay is now handled in the style prop */}
          
          {/* Content */}
          <div className="relative z-10">
            <div className="mb-8">
              <img 
                src="/public/logo-tickitz.png" 
                alt="Tickitz" 
                className="w-64 h-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden text-4xl font-bold text-white">TICKITZ</div>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 leading-tight animate-slide-in-left">
              Thank you For Purchasing
            </h1>
            
            <p className="text-lg leading-relaxed mb-10 opacity-90 animate-slide-in-left animation-delay-200">
              Lorem ipsum dolor sit amet consectetur. Quam pretium pretium tempor integer sed magna et.
            </p>
            
            <a 
              href="#" 
              className="inline-flex items-center text-lg font-semibold text-white transition-all duration-300 hover:translate-x-3 group animate-slide-in-left animation-delay-400"
            >
              Please Download Your Ticket
              <span className="ml-4 text-xl transform transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Right Section - Ticket */}
        <div className="flex-[0.6] bg-slate-50 p-8 flex flex-col justify-between rounded-lg shadow-lg animate-slide-in-right">
          {/* QR Code */}
          <div className="w-32 h-32 mx-auto mb-8 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center">
            <div className="w-24 h-24 bg-gray-300 rounded flex items-center justify-center">
                <img src='public/QR-code.svg' alt='QR Code' className='w-full h-full object-cover' />
            </div>
          </div>

          {/* Decorative dots */}
          <div className="relative flex justify-between mb-6">
            <div className="absolute -left-9 top-3 w-8 h-8 bg-gray-100 rounded-full"></div>
            <div className="absolute -right-9 top-3 w-8 h-8 bg-gray-100 rounded-full"></div>
          </div>

          {/* Ticket Details */}
          <div className="flex-grow border-t-4 border-dashed border-gray-300 pt-12">
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="animate-fade-in-up animation-delay-100">
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Movie
                  </div>
                  <div className="text-lg font-bold text-slate-800">
                    Spider-Man: ..
                  </div>
                </div>
                <div className="animate-fade-in-up animation-delay-500">
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Count
                  </div>
                  <div className="text-lg font-bold text-slate-800">
                    3 pcs
                  </div>
                </div>


                <div className="animate-fade-in-up animation-delay-300">
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Date
                  </div>
                  <div className="text-lg font-bold text-slate-800">
                    07 Jul
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="animate-fade-in-up animation-delay-200">
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Category
                  </div>
                  <div className="text-lg font-bold text-slate-800">
                    PG-13
                  </div>
                </div>
                
                    <div className="animate-fade-in-up animation-delay-400">
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Time
                  </div>
                  <div className="text-lg font-bold text-slate-800">
                    2:00pm
                  </div>
                </div>


                <div className="animate-fade-in-up animation-delay-600">
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Seats
                  </div>
                  <div className="text-lg font-bold text-slate-800">
                    C4, C5, C6
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-2 border-gray-300 p-6 flex items-center justify-between rounded-lg mb-8 animate-fade-in-up animation-delay-700">
              <span className="text-lg font-semibold text-slate-800 uppercase tracking-wider">
                Total
              </span>
              <span className="text-2xl font-extrabold text-blue-500">
                $30.00
              </span>
            </div>

            {/* Buttons */}
            <div className="space-y-4 animate-fade-in-up animation-delay-800">
              <button className="w-full bg-white text-blue-500 border-2 border-blue-500 py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:bg-blue-500 hover:text-white hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30">
                <span className="text-xl"></span>
                Download
              </button>
              
              <button className="w-full bg-blue-500 text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-blue-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/40">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            margin: 10px;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default TicketResult;