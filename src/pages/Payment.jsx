import { useState, useEffect } from "react";
import {
  X,
  Copy,
  Check,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setPaymentMethod,
  setPersonalInfo,
  addToHistory,
} from "../redux/store";
import { addOrder } from "../redux/slice/orderHistoriSlice";
import { ToastContainer, toast } from 'react-toastify';

const PaymentModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bookingData = useSelector((state) => state.booking.currentBooking);

  console.log("bookingData:", bookingData);

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [virtualAccount, setVirtualAccount] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+62",
    phoneNumber: "",
  });

  // Generate virtual account when modal opens
  useEffect(() => {
    if (isModalOpen) {
      const generatedVA = `123213289${Math.random().toString().slice(2, 11)}`;
      setVirtualAccount(generatedVA);
    }
  }, [isModalOpen]);

  // Check if we have booking data, if not redirect
  useEffect(() => {
    if (
      !bookingData.movie ||
      !bookingData.cinema ||
      !bookingData.selectedSeats.length
    ) {
      navigate("/movies");
      return;
    }

    // Update personal info in Redux
    dispatch(setPersonalInfo(formData));
  }, [bookingData, navigate, dispatch, formData]);

  const paymentMethods = [
    {
      id: "google-pay",
      src: "/logos_google-pay.svg",
      name: "Google Pay",
      category: "digital_wallet",
    },
    {
      id: "visa",
      src: "/logos_visa.svg",
      name: "Visa",
      category: "credit_card",
    },
    {
      id: "gopay",
      src: "/Logo GoPay (SVG-240p) - FileVector69 1.png",
      name: "GoPay",
      category: "digital_wallet",
    },
    {
      id: "paypal",
      src: "/logos_paypal.svg",
      name: "PayPal",
      category: "digital_wallet",
    },
    {
      id: "dana",
      src: "/logoDana.png",
      name: "DANA",
      category: "digital_wallet",
    },
    {
      id: "bca",
      src: "/Bank BCA Logo (SVG-240p) - FileVector69 1.svg",
      name: "BCA",
      category: "bank_transfer",
    },
    {
      id: "bri",
      src: "/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.svg",
      name: "BRI",
      category: "bank_transfer",
    },
    {
      id: "ovo",
      src: "/Vector.svg",
      name: "OVO",
      category: "digital_wallet",
    },
  ];

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    const method = paymentMethods.find((m) => m.id === methodId);
    dispatch(setPaymentMethod(method));
  };

  const handlePayClick = () => {
    if (selectedMethod) {
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
    setCopySuccess(false);
    setIsProcessing(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(virtualAccount);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = virtualAccount;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
    dispatch(setPersonalInfo(newFormData));
  };

  const handleCheckPayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Add to booking history with paid status
      const orderData = {
        paymentStatus: "paid",
      };
      dispatch(addToHistory(orderData));

      // Add to order history
      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        movie: {
          title: bookingData.movie.title,
          poster: bookingData.movie.poster,
        },
        cinema: {
          name: bookingData.cinema.name,
          logo: bookingData.cinema.logo,
        },
        status: "used",
        paymentStatus: "paid",
        category: "PG-13",
        time: bookingData.time,
        seats: bookingData.seats,
        count: `${bookingData.selectedSeats.length} pcs`,
        totalPrice: bookingData.totalPrice,
        paymentMethod: selectedMethod,
      };
      dispatch(addOrder(newOrder));

      setIsProcessing(false);
      closeModal();
      navigate("/ticket-result");
    }, 2000);
  };

  // Complete handlePayLater function for Payment.jsx

const handlePayLater = () => {
  try {
    // Validate that we have the required booking data
    if (!bookingData.movie || !bookingData.cinema || !bookingData.selectedSeats.length) {
      toast("Booking data is incomplete. Please start over.");
      navigate("/movies");
      return;
    }

    // Ensure we have a virtual account number
    const vaNumber = virtualAccount || `123213289${Math.random().toString().slice(2, 11)}`;
    
    // Add to booking history with not-paid status
    const orderData = {
      paymentStatus: "not-paid",
    };
    dispatch(addToHistory(orderData));

    // Create the order for order history
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      movie: {
        title: bookingData.movie.title,
        poster: bookingData.movie.poster,
      },
      cinema: {
        name: bookingData.cinema.name,
        logo: bookingData.cinema.logo,
      },
      status: "active", // Active status for unpaid tickets
      paymentStatus: "not-paid",
      virtualAccount: vaNumber,
      totalPrice: bookingData.totalPrice,
      dueDate: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days from now
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      category: "PG-13", // This could be dynamic based on movie data
      time: bookingData.time,
      seats: bookingData.selectedSeats, // Array of selected seats
      count: `${bookingData.selectedSeats.length} pcs`,
      paymentMethod: selectedMethod,
    };
    
    // Dispatch the order to Redux store
    dispatch(addOrder(newOrder));

    // Close the modal
    closeModal();
    
    // Navigate to order history page
    navigate("/order-history");
    
    // Optional: Show success message
    console.log("Order added to history successfully:", newOrder);
    
  } catch (error) {
    console.error("Error in handlePayLater:", error);
    toast("An error occurred while processing your order. Please try again.");
  }
};

// Also ensure the modal shows the correct virtual account
useEffect(() => {
  if (isModalOpen && !virtualAccount) {
    const generatedVA = `123213289${Math.random().toString().slice(2, 11)}`;
    setVirtualAccount(generatedVA);
  }
}, [isModalOpen, virtualAccount]);
  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not selected";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Not selected";
    return timeString;
  };

  const getPaymentMethodsByCategory = (category) => {
    return paymentMethods.filter((method) => method.category === category);
  };

  // Don't render if we don't have booking data
  if (
    !bookingData.movie ||
    !bookingData.cinema ||
    !bookingData.selectedSeats.length
  ) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6 text-8xl"></div>
          <p className="text-gray-600 text-2xl mb-6">No booking data found</p>
          <button
            onClick={() => navigate("/movies")}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-3 mx-auto text-lg font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      {/* Progress Steps */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex justify-center items-center space-x-8">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mb-2">
              <Check size={16} />
            </div>
            <div className="text-xs text-gray-600">Dates And Time</div>
          </div>
		  <div className="w-22 h-[50%] border-b border-dashed"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mb-2">
              <Check size={16} />
            </div>
            <div className="text-xs text-gray-600">Seat</div>
          </div>
		  <div className="w-22 h-[50%] border-b border-dashed"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mb-2">
              3
            </div>
            <div className="text-xs text-gray-600">Payment</div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto bg-white min-h-screen ">
        {/* Main Content */}
        <div className="px-6 mt-6">
          {/* Payment Info Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">
              Payment Info
            </h2>

            <div className="space-y-3 text-sm">
              <div>
                <div className="text-gray-500 uppercase text-xs mb-1">
                  DATE & TIME
                </div>
                <div className="text-gray-800 font-medium mb-6">
                  {formatDate(bookingData.date)} at{" "}
                  {formatTime(bookingData.time)}
                </div>
              </div>

              <div>
                <div className="text-gray-500 uppercase text-xs mb-1">
                  MOVIE TITLE
                </div>
                <div className="text-gray-800 font-medium mb-6">
                  {bookingData.movie?.title || "Movie Title"}
                </div>
              </div>

              <div>
                <div className="text-gray-500 uppercase text-xs mb-1">
                  CINEMA NAME
                </div>
                <div className="text-gray-800 font- mb-6">
                  {bookingData.cinema?.name || "Cinema Name"}
                </div>
              </div>

              <div>
                <div className="text-gray-500 uppercase text-xs mb-1">
                  NUMBER OF TICKETS
                </div>
                <div className="text-gray-800 font-medium mb-6">
                  {bookingData.seats?.length || 0} pieces
                </div>
              </div>

              <div>
                <div className="text-gray-500 uppercase text-xs mb-1">
                  TOTAL PAYMENT
                </div>
                <div className="text-blue-600 font-semibold text-lg mb-6">
                  ${bookingData.totalPrice || 0}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Personal Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2 font-medium">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-20 px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="+62">+62</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+81">+81</option>
                  </select>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="mb-10 mt-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Payment Method
            </h2>

            <div className="grid grid-cols-4 gap-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                  className={`relative p-3 border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 bg-white hover:border-blue-500 aspect-square ${
                    selectedMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    className="h-6 w-auto object-contain"
                    src={method.src}
                    alt={method.name}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pay Button */}
          <div className="pb-8">
            <button
              onClick={handlePayClick}
              disabled={!selectedMethod}
              className={`w-full py-4 rounded-lg text-lg font-semibold transition-all duration-300 ${
                selectedMethod
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Pay your order
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              disabled={isProcessing}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-6 text-center">
                Payment Info
              </h2>

              {/* Virtual Account for bank transfer */}
              {paymentMethods.find((m) => m.id === selectedMethod)?.category ===
                "bank_transfer" && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      No. Rekening Virtual
                    </span>
                    <button
                      onClick={handleCopy}
                      disabled={isProcessing}
                      className="text-blue-600 text-sm font-medium px-3 py-1 border border-blue-600 rounded hover:bg-blue-50"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="font-mono text-lg font-bold text-center bg-gray-50 py-3 rounded border">
                    {virtualAccount}
                  </div>
                </div>
              )}

              {/* Total Payment */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Payment</span>
                  <span className="text-xl font-bold text-blue-600">
                    ${bookingData.totalPrice}
                  </span>
                </div>
              </div>

              {/* Payment Due */}
              <div className="mb-6">
                <p className="text-sm text-gray-600 text-center">
                  Pay this payment bill before it is due{" "}
                  <span className="text-red-500 font-medium">
                    on June 23, 2023
                  </span>
                  . If the bill has not been paid by the specified time, it will
                  be forfeited.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckPayment}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Processing..." : "Check Payment"}
                </button>

                <button
                  onClick={handlePayLater}
                  disabled={isProcessing}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50"
                >
                  Pay Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
