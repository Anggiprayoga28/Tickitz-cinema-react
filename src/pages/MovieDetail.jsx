import React, { useState, useEffect } from "react";
import { Search, Calendar, Clock, MapPin, Star, Play, ArrowLeft } from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

/*
 * TMDB API Configuration
 * 
 * To use this component properly, set up your environment variables:
 * 
 * Method 1 (Recommended): Use Bearer Token
 * REACT_APP_TMDB_API_TOKEN=your_bearer_token_here
 * 
 * Method 2 (Fallback): Use API Key  
 * REACT_APP_TMDB_API_KEY=your_api_key_here
 * 
 * Get your credentials from: https://www.themoviedb.org/settings/api
 */

// Move API credentials to environment variables
const API_KEY =  '2beb647ab8bb467e8ccb593d79139017';

// Global genre list to avoid multiple API calls across components
let GENRE_LIST = {};
let genresLoaded = false;

// Utility function to get cached genres or fetch if not available
// This can be exported and used across multiple components to avoid duplicate API calls
const getGenreList = async () => {
  if (genresLoaded && Object.keys(GENRE_LIST).length > 0) {
    return GENRE_LIST;
  }

  try {
    // TMDB API configuration
    const apiUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US';
    
    // Prepare headers - prefer Bearer token if available, fallback to API key
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    let requestUrl = apiUrl;
    
    if (API_KEY) {
      // Use Bearer token method (recommended by TMDB)
      headers['Authorization'] = `Bearer ${API_KEY}`;
    } else {
      // Fallback to API key method
      requestUrl = `${apiUrl}&api_key=${API_KEY}`;
    }
    
    // Fetch genres from TMDB Genre Movie List API
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`TMDB API error! status: ${response.status}, message: ${errorText}`);
    }
    
    const data = await response.json();
    
    // Validate API response structure according to TMDB documentation
    if (!data.genres || !Array.isArray(data.genres)) {
      throw new Error('Invalid API response structure - expected genres array');
    }
    
    // Create genre mapping object from API response
    const genreMapping = {};
    data.genres.forEach(genre => {
      if (genre.id && genre.name) {
        genreMapping[genre.id] = genre.name;
      }
    });
    
    // Validate we got some genres
    if (Object.keys(genreMapping).length === 0) {
      throw new Error('No valid genres received from API');
    }
    
    GENRE_LIST = genreMapping;
    genresLoaded = true;
    
    console.log("✅ Genres loaded from TMDB API:", data.genres.length, "genres");
    console.log("📋 Available genres:", data.genres.map(g => g.name).join(", "));
    
    return GENRE_LIST;
    
  } catch (error) {
    console.error("❌ Error fetching genres from TMDB API:", error.message);
    console.error("💡 Please check your TMDB API credentials in environment variables");
    
    // Don't use fallback mapping - throw error to handle at component level
    throw new Error(`Failed to load genres from TMDB API: ${error.message}`);
  }
};

// Export utility function for use in other components
// export { getGenreList };

const MovieDetailPage = () => {
  const { id: movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);

  // Sample cinema data with corrected paths
  const cinemas = [
    { id: 1, name: "EBV.ID", logo: "/public/ebv.id 2.svg", available: true },
    { id: 2, name: "Hiflix", logo: "/public/hiflix 2.svg", available: true },
    { id: 3, name: "CineOne21", logo: "/public/CineOne21 2.svg", available: true },
    { id: 4, name: "EBV.ID", logo: "/public/ebv.id 2.svg", available: true },
  ];

  const timeSlots = ["08:30 AM", "11:00 AM", "02:30 PM", "05:00 PM", "08:30 PM"];
  const locations = ["Purwokerto", "Jakarta", "Bandung", "Surabaya"];

  // Fetch genres from TMDB API (simplified using utility function)
  const fetchGenres = async () => {
    try {
      const genreMapping = await getGenreList();
      
      // Convert mapping back to array format for state
      const genreArray = Object.entries(genreMapping).map(([id, name]) => ({
        id: parseInt(id),
        name
      }));
      
      setGenres(genreArray);
      
    } catch (error) {
      console.error("Error loading genres:", error.message);
      
      // Handle genre loading failure gracefully
      setGenres([]);
      
      // Show user-friendly error message
      console.warn("🚫 Genres could not be loaded. Movie genre tags will not be displayed.");
      console.warn("💡 This doesn't affect movie functionality, but genre information won't be available.");
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      
      // Fetch genres first
      await fetchGenres();
      
      // Then fetch movie details
      await fetchMovieDetail();
      
      setIsLoading(false);
    };

    initializeData();
  }, [movieId]);

  const fetchMovieDetail = async () => {
    if (!movieId) {
      console.error("No movie ID provided");
      setIsLoading(false);
      return;
    }
    

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const movieData = await response.json();
      
      // Process cast and crew data
      const director = movieData.credits?.crew?.find(person => person.job === "Director")?.name || "Unknown";
      const mainCast = movieData.credits?.cast?.slice(0, 5).map(actor => actor.name) || [];
      
      setMovie({
        ...movieData,
        director,
        cast: mainCast
      });
    } catch (error) {
      console.error("Error fetching movie details:", error);
      
      // Set sample movie data as fallback
      setMovie({
        id: movieId,
        original_title: "Sample Movie",
        poster_path: "/sample-poster.jpg",
        backdrop_path: "/sample-backdrop.jpg",
        genre_ids: [28, 12, 878],
        release_date: "2024-01-01",
        overview: "This is a sample movie description. The actual movie data could not be loaded.",
        vote_average: 7.5,
        runtime: 120,
        director: "Sample Director",
        cast: ["Actor 1", "Actor 2", "Actor 3"]
      });
    }
  };

  const handleBookNow = () => {
    if (!selectedCinema || !selectedDate || !selectedTime || !selectedLocation) {
      alert("Please fill in all booking details!");
      return;
    }

    // Navigate to order page with booking details
    navigate('/order', {
      state: {
        movie: {
          id: movie.id,
          title: movie.original_title,
          poster: movie.poster_path,
          genre_ids: movie.genre_ids
        },
        cinema: selectedCinema,
        date: selectedDate,
        time: selectedTime,
        location: selectedLocation
      }
    });
  };

  const handleBackToMovies = () => {
    // Check if came from a specific route
    const fromState = location.state?.from;
    
    if (fromState) {
      navigate(fromState);
    } else {
      navigate('/movies');
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "Unknown";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getGenreNames = (genreIds) => {
    if (!genreIds || !Array.isArray(genreIds)) return [];
    
    // If no genres were loaded from API, return empty array
    if (Object.keys(GENRE_LIST).length === 0) {
      return [];
    }
    
    return genreIds.map(id => GENRE_LIST[id]).filter(Boolean);
  };

  const formatReleaseDate = (dateString) => {
    if (!dateString) return "Unknown";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return "Unknown";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-6xl">🎬</div>
          <p className="text-gray-600 text-xl mb-4">Movie not found</p>
          <button 
            onClick={handleBackToMovies}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={handleBackToMovies}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Movies
        </button>
      </div>

      {/* Hero Section */}
      <div 
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/w1920${movie.backdrop_path || movie.poster_path})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.original_title}</h1>
            <p className="text-xl opacity-90">Experience the Magic of Cinema</p>
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Movie Poster */}
            <div className="flex-shrink-0">
              <div className="w-64 h-96 rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder-poster.jpg"}
                  alt={movie.original_title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-poster.jpg";
                  }}
                />
              </div>
            </div>

            {/* Movie Information */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {movie.original_title}
              </h1>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {getGenreNames(movie.genre_ids).length > 0 ? (
                  getGenreNames(movie.genre_ids).map((genre, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-medium shadow-sm"
                    >
                      {genre}
                    </span>
                  ))
                ) : (
                  movie.genre_ids && movie.genre_ids.length > 0 && (
                    <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      {movie.genre_ids.length} Genre{movie.genre_ids.length > 1 ? 's' : ''} Available
                    </span>
                  )
                )}
              </div>

              {/* Movie Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">Release Date</p>
                  <p className="font-bold text-gray-900">
                    {formatReleaseDate(movie.release_date)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">Director</p>
                  <p className="font-bold text-gray-900">{movie.director}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">Duration</p>
                  <p className="font-bold text-gray-900">{formatRuntime(movie.runtime)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">Rating</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-bold text-gray-900">{movie.vote_average?.toFixed(1)}/10</span>
                  </div>
                </div>
              </div>

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div className="mb-6">
                  <p className="text-gray-500 text-sm mb-2">Cast</p>
                  <p className="font-semibold text-gray-900">{movie.cast.join(", ")}</p>
                </div>
              )}

              {/* Synopsis */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Synopsis</h3>
                <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 mt-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Book Your Tickets</h2>

          {/* Booking Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Calendar className="inline w-4 h-4 mr-1" />
                Choose Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Clock className="inline w-4 h-4 mr-1" />
                Choose Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <MapPin className="inline w-4 h-4 mr-1" />
                Choose Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 font-semibold shadow-lg">
                Filter
              </button>
            </div>
          </div>

          {/* Cinema Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Choose Cinema</h3>
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {cinemas.filter(c => c.available).length} Available
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {cinemas.map((cinema) => (
                <div
                  key={cinema.id}
                  onClick={() => cinema.available && setSelectedCinema(cinema)}
                  className={`relative p-6 border-3 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                    selectedCinema?.id === cinema.id
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl"
                      : cinema.available
                      ? "border-gray-200 hover:border-blue-300 hover:bg-gray-50 shadow-lg"
                      : "border-gray-200 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center h-16 mb-3">
                    <img 
                      src={cinema.logo} 
                      alt={cinema.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.src = "/placeholder-logo.jpg";
                      }}
                    />
                  </div>
                  <p className="text-center font-semibold text-gray-800">{cinema.name}</p>
                  
                  {selectedCinema?.id === cinema.id && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                  )}
                  
                  {!cinema.available && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 rounded-xl">
                      <span className="text-gray-500 font-semibold">Unavailable</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center space-x-3">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-12 h-12 rounded-full font-bold transition-all transform hover:scale-110 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          {/* Book Now Button */}
          <div className="text-center">
            <button
              onClick={handleBookNow}
              disabled={!selectedCinema || !selectedDate || !selectedTime || !selectedLocation}
              className="px-16 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-xl disabled:shadow-none"
            >
              Book Now
            </button>
            {(!selectedCinema || !selectedDate || !selectedTime || !selectedLocation) && (
              <p className="mt-3 text-gray-500 text-sm">Please complete all fields to proceed</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;