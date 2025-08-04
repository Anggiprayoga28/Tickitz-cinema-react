import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';


const OrderPage = () => {
  const [selectedSeats, setSelectedSeats] = useState(['C4', 'C5', 'C6']);
  const navigate = useNavigate();
  
  // Define seat layout with their statuses
  const seatRows = [
    { 
      label: 'A', 
      seats: [
        'available', 'available', 'available', 'available', 'available', 
        'sold', 'available', 'gap', 'available', 'available', 'available', 
        'available', 'sold', 'available', 'available'
      ]
    },
    { 
      label: 'B', 
      seats: [
        'available', 'sold', 'sold', 'available', 'available', 
        'available', 'available', 'gap', 'available', 'available', 'available', 
        'available', 'available', 'available', 'available'
      ]
    },
    { 
      label: 'C', 
      seats: [
        'available', 'available', 'available', 'selected', 'selected', 
        'selected', 'available', 'gap', 'available', 'sold', 'available', 
        'available', 'sold', 'available', 'available'
      ]
    },
    { 
      label: 'D', 
      seats: [
        'available', 'sold', 'available', 'available', 'available', 
        'available', 'available', 'gap', 'available', 'sold', 'available', 
        'available', 'sold', 'available', 'available'
      ]
    },
    { 
      label: 'E', 
      seats: [
        'available', 'available', 'available', 'sold', 'available', 
        'available', 'available', 'gap', 'available', 'available', 'available', 
        'available', 'available', 'available', 'available'
      ]
    },
    { 
      label: 'F', 
      seats: [
        'available', 'available', 'available', 'available', 'available', 
        'available', 'available', 'gap', 'available', 'available', 'love', 
        'love', 'available', 'sold', 'available'
      ]
    },
    { 
      label: 'G', 
      seats: [
        'available', 'available', 'sold', 'available', 'available', 
        'available', 'available', 'gap', 'available', 'available', 'available', 
        'available', 'available', 'available', 'available'
      ]
    }
  ];

  const handleSeatClick = (rowLabel, seatIndex) => {
    const seatId = `${rowLabel}${seatIndex + 1}`;
    const row = seatRows.find(r => r.label === rowLabel);
    const seatStatus = row.seats[seatIndex];
    
    if (seatStatus === 'sold' || seatStatus === 'gap') return;
    
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(seat => seat !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  const getSeatClass = (status, rowLabel, seatIndex) => {
    const seatId = `${rowLabel}${seatIndex + 1}`;
    const isSelected = selectedSeats.includes(seatId);
    
    const baseClass = "w-7 h-7 rounded-md border-2 cursor-pointer transition-all duration-200";
    
    if (status === 'gap') return "w-5";
    if (isSelected || status === 'selected') return `${baseClass} bg-blue-500 border-blue-500`;
    if (status === 'sold') return `${baseClass} bg-gray-500 border-gray-600 cursor-not-allowed`;
    if (status === 'love') return `${baseClass} bg-pink-500 border-pink-600`;
    return `${baseClass} bg-gray-100 border-gray-300 hover:bg-blue-500 hover:border-blue-500`;
  };

  const ticketPrice = 10;
  const totalPrice = selectedSeats.length * ticketPrice;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-center mb-10">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              ✓
            </div>
            <div className="mt-2 text-sm text-gray-600">Dates And Time</div>
          </div>
          <div className="w-24 h-0.5 bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              2
            </div>
            <div className="mt-2 text-sm text-gray-600">Seat</div>
          </div>
          <div className="w-24 h-0.5 bg-gray-300 mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
              3
            </div>
            <div className="mt-2 text-sm text-gray-600">Payment</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 flex gap-6">
        {/* Main Content */}
        <div className="flex-1 bg-white rounded-xl p-8 shadow-lg">
          {/* Movie Info */}
          <div className="flex gap-5 mb-8 p-5 border-2 border-gray-200 rounded-lg">
            <div className="w-48 h-32 rounded-lg bg-gradient-to-br from-red-600 to-blue-800 flex items-center justify-center text-white font-bold relative overflow-hidden">
              <img src='/spiderposter.svg' className="absolute inset-0 "></img>
              
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Spider-Man: Homecoming</h2>
              <div className="flex gap-3 mb-5">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">Action</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">Adventure</span>
              </div>
              <div className="flex justify-between items-center mt-5">
                <div className="text-lg text-gray-700">Regular - 13:00 PM</div>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium">
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Seat Selection */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Choose Your Seat</h2>
            
            {/* Screen */}
            <div className="bg-gray-800 text-white py-3 mx-auto mb-10 rounded-full w-72 text-center font-bold">
              Screen
            </div>

            {/* Seating Chart */}
            <div className="mb-8">
              {seatRows.map((row) => (
                <div key={row.label} className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-5 font-bold text-gray-600">{row.label}</div>
                  {row.seats.map((status, index) => (
                    <div
                      key={index}
                      className={getSeatClass(status, row.label, index)}
                      onClick={() => handleSeatClick(row.label, index)}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Seat Numbers */}
            <div className="flex justify-center gap-2 mb-6 ml-7">
              <div className="w-5"></div>
              {[1, 2, 3, 4, 5, 6, 7, '', 8, 9, 10, 11, 12, 13, 14].map((num, index) => (
                <div key={index} className={`w-7 text-center text-xs text-gray-600 ${num === '' ? 'w-5' : ''}`}>
                  {num}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8 mt-8">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 bg-gray-100 border-2 border-gray-300 rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 bg-blue-500 rounded"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 bg-pink-500 rounded"></div>
                <span>Love seat</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 bg-gray-500 rounded"></div>
                <span>Sold</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white rounded-xl p-6 shadow-lg h-fit">
          <div className="position-center mb-6">
            <div className="bg-blue-100 p-4 rounded-lg mb-4">
              <img src="/CineOne21 2.svg" alt="" />
            </div>
            <p className="text-gray-600 mb-5">CineOne21 Cinema</p>

            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Movie selected</span>
                <span className="text-gray-800 font-medium text-sm">Spider-Man: Homecoming</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Tuesday, 07 July 2020</span>
                <span className="text-gray-800 font-medium text-sm">13:00pm</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">One ticket price</span>
                <span className="text-gray-800 font-medium text-sm">${ticketPrice}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Seat choosed</span>
                <span className="text-gray-800 font-medium text-sm">{selectedSeats.join(', ')}</span>
              </div>

              <div className="border-t-2 border-gray-100 pt-4 mt-5">
                <div className="flex justify-between">
                  <span className="text-gray-800 font-bold">Total Payment</span>
                  <span className="text-2xl font-bold text-blue-500">${totalPrice}</span>
                </div>
              </div>

          <button 
            onClick={() => navigate('/payment')}
            className="w-full bg-blue-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors mt-5"
            >
           Checkout now
          </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;