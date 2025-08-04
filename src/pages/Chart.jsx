import React, { useEffect, useRef } from 'react';
import * as Chart from 'chart.js';

// Register Chart.js components
Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.PointElement,
  Chart.LineElement,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend,
  Chart.Filler
);

const TickitzDashboard = () => {
  const salesChartRef = useRef(null);
  const ticketSalesChartRef = useRef(null);
  const salesChartInstance = useRef(null);
  const ticketSalesChartInstance = useRef(null);

  // Sample data for charts
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [1200, 1800, 2800, 2200, 1900, 2400],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.3)',
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointBackgroundColor: '#3B82F6',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          color: '#9CA3AF'
        }
      },
      y: {
        grid: {
          color: '#F3F4F6',
          borderDash: [2, 2]
        },
        border: {
          display: false
        },
        ticks: {
          color: '#9CA3AF',
          callback: function(value) {
            return value;
          }
        }
      }
    },
    elements: {
      point: {
        hoverRadius: 6
      }
    }
  };

  useEffect(() => {
    // Sales Chart
    if (salesChartRef.current) {
      if (salesChartInstance.current) {
        salesChartInstance.current.destroy();
      }
      
      const ctx = salesChartRef.current.getContext('2d');
      salesChartInstance.current = new Chart.Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions
      });
    }

    // Ticket Sales Chart
    if (ticketSalesChartRef.current) {
      if (ticketSalesChartInstance.current) {
        ticketSalesChartInstance.current.destroy();
      }
      
      const ctx = ticketSalesChartRef.current.getContext('2d');
      ticketSalesChartInstance.current = new Chart.Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions
      });
    }

    return () => {
      if (salesChartInstance.current) {
        salesChartInstance.current.destroy();
      }
      if (ticketSalesChartInstance.current) {
        ticketSalesChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">Tickitz</h1>
              <nav className="flex space-x-8">
                <a href="#" className="text-gray-500 hover:text-gray-700 font-medium">Dashboard</a>
                <a href="#" className="text-gray-900 hover:text-gray-700 font-medium">Movie</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Location</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Sales Chart Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Sales Chart</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Movies Name</option>
                    <option>Avengers: End Game</option>
                    <option>Spider-Man</option>
                    <option>Batman</option>
                  </select>
                  <svg className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="relative">
                  <select className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                  </select>
                  <svg className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Filter
                </button>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Avengers: End Game</p>
            </div>
            <div className="h-64">
              <canvas ref={salesChartRef}></canvas>
            </div>
          </div>

          {/* Ticket Sales Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Ticket Sales</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Category</option>
                    <option>Adventure</option>
                    <option>Action</option>
                    <option>Drama</option>
                  </select>
                  <svg className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="relative">
                  <select className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Location</option>
                    <option>Jakarta</option>
                    <option>Bandung</option>
                    <option>Surabaya</option>
                  </select>
                  <svg className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Filter
                </button>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Adventure, Purwokerto</p>
            </div>
            <div className="h-64">
              <canvas ref={ticketSalesChartRef}></canvas>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TickitzDashboard;