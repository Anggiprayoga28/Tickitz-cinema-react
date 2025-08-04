import React, { useState } from "react";
import { X, Copy, Check } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router";


const PaymentModal = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [virtualAccount, setVirtualAccount] = useState('12321328913829724');
  const [copySuccess, setCopySuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Jonas El Rodriguez",
    email: "jonasrodri1234@gmail.com",
    countryCode: "+62",
    phoneNumber: "81445687121",
  });
  
  const navigate = useNavigate();

  const paymentMethods = [
    { id: "goggle-pay", src: "/logos_google-pay.svg" },
    { id: "visa", src: "/logos_visa.svg" },
    { id: "gopay", src: "/Logo GoPay (SVG-240p) - FileVector69 1.png" },
    { id: "paypal", src: "/logos_paypal.svg" },
    { id: "dana", src: "/logoDana.png" },
    { id: "bca", src: "/Bank BCA Logo (SVG-240p) - FileVector69 1.svg" },
    {
      id: "bri",
      src: "/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.svg",
    },
    { id: "ovo", src: "/Vector.svg" },
  ];

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
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
  };

  const handleCopy = async () => {
    try {
      // await navigator.clipboard.writeText(virtualAccount);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckPayment = () => {
    navigate("/ticket-result");
    closeModal();
  };

  const handlePayLater = () => {
    closeModal();
    alert("Payment saved for later. You can complete it anytime.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white min-h-screen">
        {/* Progress Steps */}
        <div className="bg-gray-300 p-5 flex justify-between items-center">
          <div className="flex flex-col items-center flex-1 relative">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mb-2 relative z-10">
              <Check size={16} />
            </div>
            <div className="text-xs text-gray-600 text-center">
              Dates And Time
            </div>
            <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-400 z-0"></div>
          </div>
          <div className="flex flex-col items-center flex-1 relative">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mb-2 relative z-10">
              <Check size={16} />
            </div>
            <div className="text-xs text-gray-600 text-center">Seat</div>
            <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-400 z-0"></div>
          </div>
          <div className="flex flex-col items-center flex-1 relative">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mb-2 relative z-10">
              3
            </div>
            <div className="text-xs text-gray-600 text-center">Payment</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          <form>
            {/* Payment Info Section */}
            <div className="mb-9">
              <h2 className="text-xl font-semibold mb-5 text-gray-800">
                Payment Info
              </h2>

              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase mb-1 tracking-wider">
                  Date & Time
                </div>
                <div className="text-sm text-gray-800 font-medium">
                  Tuesday, 07 July 2020 at 02:00pm
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase mb-1 tracking-wider">
                  Movie Title
                </div>
                <div className="text-sm text-gray-800 font-medium">
                  Spider-Man: Homecoming
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase mb-1 tracking-wider">
                  Cinema Name
                </div>
                <div className="text-sm text-gray-800 font-medium">
                  CineOne21 Cinema
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase mb-1 tracking-wider">
                  Number of Tickets
                </div>
                <div className="text-sm text-gray-800 font-medium">
                  3 pieces
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase mb-1 tracking-wider">
                  Total Payment
                </div>
                <div className="text-base text-blue-500 font-semibold">
                  $30.00
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="mb-9">
              <h2 className="text-xl font-semibold mb-5 text-gray-800">
                Personal Information
              </h2>

              <div className="mb-5">
                <label className="block text-sm text-gray-600 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  readOnly
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  readOnly
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm text-gray-600 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-20 px-4 py-3 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    readOnly
                  />
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Payment Method Section */}
          <div className="mb-9">
            <h2 className="text-xl font-semibold mb-5 text-gray-800">
              Payment Method
            </h2>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {paymentMethods.map((method) => (
                <div
                  // src={`../public/${method.src}.svg`}
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-300 bg-white hover:border-blue-500 hover:-translate-y-1 min-h-[80px] ${
                    selectedMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <img className="text-2xl mb-1" src={method.src}></img>
                  <div className="text-xs text-center text-gray-600">
                    {method.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayClick}
            disabled={!selectedMethod}
            className={`w-full py-4 border-none rounded-xl text-base font-semibold transition-all duration-300 ${
              selectedMethod
                ? "bg-blue-500 text-white cursor-pointer hover:bg-blue-600 active:translate-y-0.5"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            {selectedMethod ? "Pay your order" : "Select payment method first"}
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex justify-center items-center p-5">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-5 bg-transparent border-none text-2xl cursor-pointer text-gray-500 p-1 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:text-gray-800"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <header className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-800">
                Payment Info
              </h1>
            </header>

            {/* Payment Details */}
            <section>
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-500 text-base">
                  No. Rekening Virtual :
                </span>
                <div className="flex items-center">
                  <span className="font-medium text-base text-gray-800 mr-4"></span>
                  <button
                    onClick={handleCopy}
                    className="bg-white border border-blue-600 text-blue-600 rounded-md px-4 py-2 text-sm cursor-pointer transition-all duration-300 hover:bg-blue-600 hover:text-white flex items-center gap-2"
                  >
                    <Copy size={16} />
                    Copy
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-500 text-base">Total Payment :</span>
                <span className="font-semibold text-base text-blue-600">
                  $30.00
                </span>
              </div>

              <p className="my-8 leading-relaxed text-gray-500">
                Pay this payment bill before it is due,{" "}
                <span className="text-red-600 font-medium">
                  on June 23, 2023
                </span>
                . If the bill has not been paid by the specified time, it will
                be forfeited
              </p>

              {/* Success Message */}
              {copySuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded my-3 flex items-center gap-2">
                  <Check size={16} />
                  Virtual account number copied to clipboard!
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 mt-8">
                <button
                  onClick={handleCheckPayment}
                  className="bg-blue-600 text-white border-none rounded-md py-4 text-base font-medium cursor-pointer shadow-lg transition-all duration-300 hover:bg-blue-700 hover:-translate-y-1"
                >
                  Check Payment
                </button>
                <button
                  onClick={handlePayLater}
                  className="bg-transparent border-none text-blue-600 text-base font-medium cursor-pointer text-center py-3 transition-colors duration-300 hover:text-blue-700"
                >
                  Pay Later
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentModal;
