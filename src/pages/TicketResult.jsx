import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCurrentBooking } from "../redux/slice/bookingSlice";
import { Download, ArrowLeft } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';

const TicketResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bookingData = useSelector((state) => state.booking.currentBooking);

  useEffect(() => {
    if (
      !bookingData.movie ||
      !bookingData.cinema ||
      !bookingData.selectedSeats.length
    ) {
      navigate("/movies");
      return;
    }
  }, [bookingData, navigate]);

  const handleDone = () => {
    dispatch(clearCurrentBooking());
    navigate("/movies");
  };

  const handleDownload = () => {
    toast("Download functionality would be implemented here");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "07 Jul";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "2:00pm";
    return timeString;
  };
  console.log("Booking Data:", bookingData);
  if (
    !bookingData.movie ||
    !bookingData.cinema ||
    !bookingData.selectedSeats.length
  ) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6 text-8xl">🎬</div>
          <p className="text-gray-600 text-2xl mb-6">No ticket data found</p>
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
    <div className="min-h-screen bg-gray-50 font-sans text-black">
      <div className="container mx-auto max-w-6xl min-h-screen flex gap-8 animate-fade-in p-6">
        <ToastContainer />
        {/* Left Section */}
        <div
          className="flex-1 p-20 flex flex-col justify-center text-white relative rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/background.svg) center/cover",
          }}
        >
          {/* Content */}
          <div className="relative z-10">
            <div className="mb-10">
              <img
                src="/logo-tickitz.png"
                alt="Tickitz"
                className="w-60 h-auto"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <div className="hidden text-5xl text-white">TICKITZ</div>
            </div>

            <h1 className="text-4xl mb-8 leading-tight animate-slide-in-left">
              Thank you For Purchasing
            </h1>

            <p className="text-xl leading-relaxed mb-12 opacity-90 animate-slide-in-left animation-delay-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              voluptate quo odit vero ullam!
            </p>

            <a
              href="#"
              onClick={handleDownload}
              className="inline-flex items-center text-xl font-semibold text-white transition-all duration-300 hover:translate-x-3 group animate-slide-in-left animation-delay-400"
            >
              Please Download Your Ticket
              <span className="ml-6 text-2xl transform transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Right Section - Ticket */}
        <div className="flex-[0.6] bg-white p-10 flex flex-col justify-between rounded-2xl animate-slide-in-right">
          {/* QR Code */}
          <div className="w-50 h-50 mx-auto mb-10 flex items-center justify-center">
            <img
              src="/QR-code.svg"
              alt="QR Code"
              className="w-full h-full object-contain p-4"
            />
          </div>

          {/* Decorative dots */}
          <div className="relative flex justify-between mb-8">
            <div className="absolute -left-11 top-0 w-10 h-10 bg-gray-50 rounded-full"></div>
            <div className="absolute -right-11 top-0 w-10 h-10 bg-gray-50 rounded-full"></div>
            <div className="w-full border-t-4 border-dashed border-gray-300"></div>
          </div>

          {/* Ticket Details */}
          <div className="flex-grow">
            <div className="grid grid-cols-2 gap-8 mb-10">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="animate-fade-in-up animation-delay-100">
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    Movie
                  </div>
                  <div className="text-lg text-black">
                    {bookingData.movie?.title?.length > 15
                      ? bookingData.movie.title.substring(0, 15) + ".."
                      : bookingData.movie?.title || "Movie"}
                  </div>
                </div>
                <div className="animate-fade-in-up animation-delay-500">
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    Date
                  </div>
                  <div className="text-lg text-black">
                    {formatDate(bookingData.date)}
                  </div>
                </div>

                <div className="animate-fade-in-up animation-delay-300">
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    Count
                  </div>
                  <div className="text-lg text-black">
                    {bookingData.selectedSeats?.length || 0} pcs
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div className="animate-fade-in-up animation-delay-200">
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    Category
                  </div>
                  <div className="text-lg text-black">PG-13</div>
                </div>

                <div className="animate-fade-in-up animation-delay-400">
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    Time
                  </div>
                  <div className="text-lg text-black">
                    {formatTime(bookingData.time)}
                  </div>
                </div>

                <div className="animate-fade-in-up animation-delay-600">
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    Seats
                  </div>
                  <div className="text-lg text-black">
                    {bookingData.selectedSeats?.join(", ") || "No seats"}
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-2 border-gray-300 p-8 flex items-center justify-between rounded-xl mb-10 animate-fade-in-up animation-delay-800 bg-gray-50">
              <span className="text-xl text-black uppercase tracking-wider">
                Total
              </span>
              <span className="text-3xl font-extrabold text-blue-500">
                ${bookingData.totalPrice || 0}
              </span>
            </div>

            {/* Buttons */}
            <div className="space-y-5 animate-fade-in-up animation-delay-900">
              <button
                onClick={handleDownload}
                className="w-full bg-white text-blue-500 border-3 border-blue-500 py-5 px-8 rounded-md text-xl flex items-center justify-center gap-4 transition-all duration-300 hover:bg-blue-500 hover:text-white hover:-translate-y-1"
              >
                <Download className="w-6 h-6" />
                Download
              </button>

              <button
                onClick={handleDone}
                className="w-full bg-blue-500 text-white py-5 px-8 rounded-md text-xl transition-all duration-300 hover:bg-blue-600 hover:-translate-y-1"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        .animation-delay-900 {
          animation-delay: 0.9s;
        }

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
