import React, { useState } from "react";
import {
  Search,
  Menu,
  X,
  Star,
  ChevronDown,
  Download,
  Copy,
} from "lucide-react";

const OrderHistoryPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Location");
  const [expandedOrders, setExpandedOrders] = useState({});
  const [showTicketResult, setShowTicketResult] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const orders = [
    {
      id: 1,
      date: "Tuesday, 07 July 2020 - 04:30pm",
      movie: "Spider-Man: Homecoming",
      cinema: "CineOne21",
      cinemaLogo: "/public/CineOne21 2.svg",
      status: "active",
      paymentStatus: "not-paid",
      virtualAccount: "12321328913829724",
      totalPayment: "$30",
      dueDate: "June 23, 2023",
      category: "PG-13",
      time: "4:30pm",
      seats: "C4, C5, C6",
      count: "3 pcs",
    },
    {
      id: 2,
      date: "Monday, 14 June 2020 - 02:00pm",
      movie: "Avengers: End Game",
      cinema: "EBV.ID",
      cinemaLogo: "/public/ebv.id 2.svg",
      status: "used",
      paymentStatus: "paid",
      category: "PG-13",
      time: "2:00pm",
      seats: "C4, C5, C6",
      count: "3 pcs",
      totalPayment: "$30.00",
    },
    {
      id: 3,
      date: "Monday, 14 June 2020 - 02:00pm",
      movie: "Avengers: End Game",
      cinema: "EBV.ID",
      cinemaLogo: "/public/ebv.id 2.svg",
      status: "used",
      paymentStatus: "paid",
      category: "PG-13",
      time: "2:00pm",
      seats: "C4, C5, C6",
      count: "3 pcs",
      totalPayment: "$30.00",
    },
  ];

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-4 py-2 rounded-lg font-bold text-xs tracking-wider text-center w-48 h-10 flex items-center justify-center";

    switch (status) {
      case "active":
        return `${baseClasses} bg-green-100 text-green-600`;
      case "used":
        return `${baseClasses} bg-gray-100 text-gray-500`;
      default:
        return baseClasses;
    }
  };

  const getPaymentBadge = (paymentStatus) => {
    const baseClasses =
      "px-4 py-2 rounded-lg font-bold text-xs tracking-wider text-center w-48 h-10 flex items-center justify-center";

    switch (paymentStatus) {
      case "paid":
        return `${baseClasses} bg-blue-100 text-blue-600`;
      case "not-paid":
        return `${baseClasses} bg-red-100 text-red-600`;
      default:
        return baseClasses;
    }
  };

  // Ticket Result Modal Component
  const TicketResultModal = ({ order, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex">
          {/* Left Section */}
          <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 p-16 flex flex-col justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10">
              <div className="mb-8">
                <img
                  src="/asset/icon/logo Tickitz.png"
                  alt="Tickitz"
                  className="w-64"
                />
              </div>
              <h1 className="text-4xl font-bold mb-6 leading-tight">
                Thank you For Purchasing
              </h1>
              <p className="text-lg leading-relaxed mb-10 opacity-90">
                Lorem ipsum dolor sit amet consectetur. Quam pretium pretium
                tempor integer sed magna et.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-lg font-semibold hover:translate-x-2 transition-transform"
              >
                Please Download Your Ticket
                <span className="ml-4 text-xl">→</span>
              </a>
            </div>
          </div>

          {/* Right Section - Ticket */}
          <div className="flex-none w-96 bg-gray-50 p-6 flex flex-col justify-between relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            {/* QR Code */}
            <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg mx-auto mb-8 flex items-center justify-center">
              <img
                src="/public/QR-code.svg"
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Dots */}
            <div className="relative mb-8">
              <div className="absolute -left-10 w-8 h-8 bg-gray-100 rounded-full"></div>
              <div className="absolute -right-10 w-8 h-8 bg-gray-100 rounded-full"></div>
              <div className="border-t-2 border-dashed border-gray-300"></div>
            </div>

            {/* Ticket Details */}
            <div className="flex-grow grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Movie
                  </div>
                  <div className="font-bold text-gray-900">
                    {order.movie.split(":")[0]}:..
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Category
                  </div>
                  <div className="font-bold text-gray-900">
                    {order.category}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Date
                  </div>
                  <div className="font-bold text-gray-900">07 Jul</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Time
                  </div>
                  <div className="font-bold text-gray-900">{order.time}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Count
                  </div>
                  <div className="font-bold text-gray-900">{order.count}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Seats
                  </div>
                  <div className="font-bold text-gray-900">{order.seats}</div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-2 border-gray-300 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900 uppercase tracking-wider">
                  Total
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {order.totalPayment}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-3 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all">
                <Download className="w-5 h-5" />
                Download
              </button>
              <button
                onClick={onClose}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // If showing ticket result, render the modal
  if (showTicketResult) {
    return (
      <TicketResultModal
        order={showTicketResult}
        onClose={() => setShowTicketResult(null)}
      />
    );
  }
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 mb-12">
        <nav className="flex justify-between items-center px-5 py-5 border-b border-gray-200 bg-white">
          {/* Logo */}
          <div className="flex-1 max-w-32">
            <a href="/index.html" className="block">
              <img
                src="/public/tickitz-blu.svg"
                alt="Tickitz Logo"
                className="w-full h-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-4 justify-center">
            <ul className="flex gap-10">
              <li>
                <a
                  href="/index.html"
                  className="text-slate-800 font-normal text-sm hover:text-blue-600 relative group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="/index/movie.html"
                  className="text-slate-800 font-normal text-sm hover:text-blue-600 relative group"
                >
                  Movie
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a
                  href="/index/detail.html"
                  className="text-slate-800 font-normal text-sm hover:text-blue-600 relative group"
                >
                  Buy Ticket
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-3">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border-none bg-transparent cursor-pointer focus:outline-none pr-3"
            >
              <option value="Location">Location</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
            </select>
            <Search className="w-6 h-6 text-gray-600" />
            <img
              src="/public/FotoProfil.png"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-between w-7 h-5 cursor-pointer"
            onClick={toggleMobileMenu}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col p-5 transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-8">
              <div className="navbar-brand">
                <a href="/index.html">
                  <img src="/asset/icon/logo Tickitz.png" alt="Tickitz Logo" />
                </a>
              </div>
              <button onClick={toggleMobileMenu} className="text-2xl">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-5 mb-8">
              <a
                href="/index.html"
                className="text-lg py-2 border-b border-gray-100"
              >
                Home
              </a>
              <a
                href="/index/movie.html"
                className="text-lg py-2 border-b border-gray-100"
              >
                Movie
              </a>
              <a
                href="/index/detail.html"
                className="text-lg py-2 border-b border-gray-100"
              >
                Buy Ticket
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="/index/login.html"
                className="btn border border-blue-600 text-blue-600 px-4 py-3 rounded text-center"
              >
                Sign in
              </a>
              <a
                href="/index/register.html"
                className="btn bg-blue-600 text-white px-4 py-3 rounded text-center"
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-9">
          {/* Sidebar */}
          <aside className="bg-white rounded-3xl p-8 shadow-lg h-fit">
            {/* Info Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-semibold text-gray-600">INFO</h2>
              <div className="w-6 h-6 rounded-full">
                <img src="/public/Group.svg" alt="Menu dots" />
              </div>
            </div>

            {/* User Profile */}
            <div className="flex flex-col items-center mb-6">
              <img
                src="/public/FotoProfil.png"
                alt="Profile"
                className="w-38 h-38 rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">El Rodriguez</h3>
              <p className="text-sm text-gray-500">Moviegoers</p>
            </div>

            <hr className="border-gray-200 my-6" />

            {/* Loyalty Card */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl p-5 text-white relative overflow-hidden shadow-lg">
              {/* Background decoration */}
              <div className="absolute -top-20 -right-15 w-36 h-36 bg-[#FFFFFF4D] rounded-full"></div>
              <div className="absolute -top-15 -right-20 w-36 h-36 bg-[#FFFFFF4D] rounded-full"></div>

              <div className="flex items-center gap-2 mb-2 font-medium relative z-10">
                <span>Moviegoers</span>
                <Star className="w-11 h-11 absolute -right-3 -top-5 text-yellow-300 fill-current" />
              </div>

              <div className="text-3xl font-normal mb-1 relative z-10">
                320 <span className="text-xs opacity-90">points</span>
              </div>
            </div>

            {/* Progress Section */}
            <div className="mt-4">
              <div className="text-xs mb-2">180 points become a master</div>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <div className="w-2/5 h-full bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="space-y-5">
            {/* Tabs Navigation */}
            <nav className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-2">
                <Link
                  to="/profile"
                  className="p-5 text-center text-gray-500 font-medium transition-colors hover:text-gray-700"
                >
                  Account Settings
                </Link>
                <Link
                  to="/order-history"
                  className="p-5 text-center text-gray-800 font-medium relative"
                >
                  Order History
                  <span className="absolute bottom-0 left-1/4 w-1/2 h-1 bg-blue-600 rounded-t"></span>
                </Link>
              </div>
            </nav>

            {/* Order History List */}
            <div className="space-y-5">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 mb-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">{order.date}</p>
                      <h3 className="text-xl font-semibold leading-10 tracking-wide">
                        {order.movie}
                      </h3>
                    </div>
                    <img
                      src={order.cinemaLogo}
                      alt={order.cinema}
                      className="w-25 h-10 rounded self-center justify-self-start lg:justify-self-end"
                    />
                  </div>

                  <hr className="border-gray-200 my-9" />

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-center mb-4">
                    <div className="flex flex-col lg:flex-row gap-3">
                      <span className={getStatusBadge(order.status)}>
                        {order.status === "active"
                          ? "Ticket in active"
                          : "Ticket used"}
                      </span>
                      <span className={getPaymentBadge(order.paymentStatus)}>
                        {order.paymentStatus === "paid" ? "Paid" : "Not Paid"}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="flex items-center gap-2 text-gray-400 text-sm justify-self-end hover:text-gray-600"
                    >
                      Show Details
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedOrders[order.id] ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {expandedOrders[order.id] && (
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      {order.paymentStatus === "not-paid" ? (
                        // Unpaid ticket details
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                No. Rekening Virtual
                              </h4>
                              <div className="flex items-center gap-2">
                                <p className="font-mono text-lg font-semibold text-gray-900">
                                  {order.virtualAccount}
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(order.virtualAccount)
                                  }
                                  className="px-3 py-1 bg-gray-100 border border-gray-300 text-blue-600 text-sm rounded hover:bg-gray-200 transition-colors"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                Total Payment
                              </h4>
                              <p className="text-xl font-bold text-blue-600">
                                {order.totalPayment}
                              </p>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-4">
                              Pay this payment bill before it is due, on{" "}
                              <span className="font-semibold text-red-600">
                                {order.dueDate}
                              </span>
                              . If the bill has not been paid by the specified
                              time, it will be forfeited
                            </p>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                              Cek Pembayaran
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Paid ticket details - show ticket information inline
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Ticket Information
                          </h3>

                          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
                            {/* QR Code */}
                            <div className="flex justify-center lg:justify-start">
                              <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg p-4 flex items-center justify-center">
                                <img
                                  src="/public/QR-code.svg"
                                  alt="QR Code"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>

                            {/* Ticket Details Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                              <div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                  Category
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {order.category}
                                </div>
                              </div>

                              <div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                  Time
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {order.time}
                                </div>
                              </div>

                              <div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                  Seats
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {order.seats}
                                </div>
                              </div>

                              <div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                  Total
                                </div>
                                <div className="font-bold text-xl text-gray-900">
                                  {order.totalPayment}
                                </div>
                              </div>

                              <div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                  Movie
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {order.movie.length > 15
                                    ? order.movie.substring(0, 15) + ".."
                                    : order.movie}
                                </div>
                              </div>

                              <div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                  Date
                                </div>
                                <div className="font-semibold text-gray-900">
                                  07 Jul
                                </div>
                              </div>

                              <div>
                                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                  Count
                                </div>
                                <div className="font-semibold text-gray-900">
                                  {order.count}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-25 bg-white py-5">
          <div className="flex flex-wrap justify-between max-w-6xl mx-auto px-5 py-10 gap-8">
            <section className="min-w-50 flex-1">
              <div className="mb-4">
                <img
                  src="/public/tickitz-blu.svg"
                  alt="Tickitz Footer"
                  className="max-w-32 h-auto"
                />
              </div>
              <p className="text-gray-500 leading-relaxed max-w-64">
                Stop waiting in line. Buy tickets conveniently, watch movies
                quietly.
              </p>
            </section>

            <section className="min-w-50 flex-1">
              <h3 className="text-lg mb-5 text-gray-800">Explore</h3>
              <nav className="flex flex-col gap-4">
                <a
                  href="/index/movie.html"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Cinemas
                </a>
                <a
                  href="/index/movie.html"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Movies List
                </a>
                <a
                  href="/index/ticketResult.html"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  My Ticket
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Notification
                </a>
              </nav>
            </section>

            <section className="min-w-50 flex-1">
              <h3 className="text-lg mb-5 text-gray-800">Our Sponsor</h3>
              <div className="flex flex-col gap-4">
                <img
                  src="/public/ebv.id 2.svg"
                  alt="EBV.ID"
                  className="h-8 w-fit"
                />
                <img
                  src="/public/CineOne21 2.svg"
                  alt="CineOne21"
                  className="h-8 w-fit"
                />
                <img
                  src="/public/hiflix 2.svg"
                  alt="Hiflix"
                  className="h-8 w-fit"
                />
              </div>
            </section>

            <section className="min-w-50 flex-1">
              <h3 className="text-lg mb-5 text-gray-800">Follow us</h3>
              <div className="flex flex-col gap-4">
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <img
                    src="/public/facebook.svg"
                    alt="Facebook"
                    className="w-5 h-5"
                  />
                  Tickitz Cinema id
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <img
                    src="/public/instagram.svg"
                    alt="Instagram"
                    className="w-5 h-5"
                  />
                  tickitz.id
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <img
                    src="/public/twitter.svg"
                    alt="Twitter"
                    className="w-5 h-5"
                  />
                  tickitz.id
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <img
                    src="/public/youtube.svg"
                    alt="YouTube"
                    className="w-5 h-5"
                  />
                  Tickitz Cinema id
                </a>
              </div>
            </section>
          </div>

          <div className="text-center text-gray-500 py-5 w-full mt-5">
            © 2020 Tickitz. All Rights Reserved.
          </div>
        </footer>
      </main>
    </div>
  );
};

export default OrderHistoryPage;
