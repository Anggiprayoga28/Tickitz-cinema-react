import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';

// Move API key to environment variable
const API_KEY = '2beb647ab8bb467e8ccb593d79139017';

// Genre list will be fetched from API
let GENRE_LIST = {};

// Movie Detail Component
const MovieDetailPage = ({ movieId, movieData, onBack }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCinema, setSelectedCinema] = useState(null);
  const navigate = useNavigate();

  const cinemas = [
    { id: 1, name: "EBV.ID", logo: "/ebv-id-2.svg", available: true },
    { id: 2, name: "Hiflix", logo: "/hiflix-2.svg", available: true },
    { id: 3, name: "CineOne21", logo: "/cineone21-2.svg", available: true },
    { id: 4, name: "EBV.ID", logo: "/ebv-id-2.svg", available: true },
  ];

  const timeSlots = ["08:30 AM", "11:00 AM", "02:30 PM", "05:00 PM", "08:30 PM"];
  const locations = ["Purwokerto", "Jakarta", "Bandung", "Surabaya"];

  const getGenreNames = (genreIds) => {
    return genreIds?.map(id => GENRE_LIST[id]).filter(Boolean) || [];
  };

  const handleBookNow = () => {
    if (!selectedCinema || !selectedDate || !selectedTime || !selectedLocation) {
      alert("Please fill in all booking details!");
      return;
    }

    // Navigate to order page with booking details
    navigate('/order', {
      state: {
        movie: movieData,
        cinema: selectedCinema,
        date: selectedDate,
        time: selectedTime,
        location: selectedLocation
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-2"
        >
          ← Back to Movies
        </button>
      </div>

      {/* Hero Section with Movie Backdrop */}
      <div 
        className="relative h-80 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/w1920${movieData.backdrop_path || movieData.poster_path})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movieData.original_title}</h1>
            <p className="text-xl opacity-90">Experience the Magic of Cinema</p>
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-8">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Movie Poster */}
            <div className="flex-shrink-0">
              <div className="w-64 h-96 rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                  alt={movieData.original_title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Movie Information */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {movieData.original_title}
              </h1>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {getGenreNames(movieData.genre_ids).map((genre, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-medium shadow-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Movie Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">Release Date</p>
                  <p className="font-bold text-gray-900">
                    {new Date(movieData.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">Rating</p>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    <span className="font-bold text-gray-900">{movieData.vote_average?.toFixed(1)}/10</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">Popularity</p>
                  <p className="font-bold text-gray-900">{Math.round(movieData.popularity)}</p>
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Synopsis</h3>
                <p className="text-gray-700 leading-relaxed">{movieData.overview}</p>
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

// Main Movie Page Component
const MoviePage = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentGenreFilter, setCurrentGenreFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [genres, setGenres] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const navigate = useNavigate();

  // Fetch genres from TMDB API
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Create genre mapping object
      const genreMapping = {};
      data.genres.forEach(genre => {
        genreMapping[genre.id] = genre.name;
      });
      
      // Update global GENRE_LIST
      GENRE_LIST = genreMapping;
      setGenres(data.genres);
      
      // Set popular filter tags (you can customize this list)
      const popularGenres = data.genres
        .filter(genre => 
          ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'].includes(genre.name) ||
          genre.name === 'Science Fiction'
        )
        .map(genre => genre.name === 'Science Fiction' ? 'Sci-Fi' : genre.name)
        .slice(0, 8);
      
      setFilterTags(popularGenres);
      
    } catch (error) {
      console.error("Error fetching genres:", error);
      
      // Fallback to static genre list if API fails
      const fallbackGenres = [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 18, name: "Drama" },
        { id: 27, name: "Horror" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Science Fiction" },
        { id: 53, name: "Thriller" }
      ];
      
      const genreMapping = {};
      fallbackGenres.forEach(genre => {
        genreMapping[genre.id] = genre.name;
      });
      
      GENRE_LIST = genreMapping;
      setGenres(fallbackGenres);
      setFilterTags(['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller']);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      
      // Fetch genres first
      await fetchGenres();
      
      // Then fetch movies
      await fetchMovieData();
      
      setIsLoading(false);
    };

    initializeData();
  }, []);

  const fetchMovieData = async () => {
    try {
      const pages = [1, 2, 3];
      const allMoviePromises = pages.map((page) =>
        fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        ).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
      );

      const allResponses = await Promise.all(allMoviePromises);
      
      let combinedMovies = allResponses.reduce((acc, response) => {
        return acc.concat(response.results);
      }, []);
      
      // Remove duplicates
      combinedMovies = combinedMovies.filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.id === movie.id)
      );

      setAllMovies(combinedMovies);
      setFilteredMovies(combinedMovies);
    } catch (err) {
      console.error("Error fetching movie data:", err);
      // Set empty arrays if API fails
      setAllMovies([]);
      setFilteredMovies([]);
    }
  };

  useEffect(() => {
    const filterMovies = () => {
      let filtered = allMovies.filter((movie) => {
        const titleMatch = movie.original_title
          .toLowerCase()
          .includes(currentSearchTerm.toLowerCase());

        let genreMatch = true;
        if (currentGenreFilter && currentGenreFilter !== "All") {
          // Handle Science Fiction -> Sci-Fi mapping
          const searchGenre = currentGenreFilter === 'Sci-Fi' ? 'Science Fiction' : currentGenreFilter;
          
          const genreId = Object.keys(GENRE_LIST).find(
            (id) => GENRE_LIST[id].toLowerCase() === searchGenre.toLowerCase()
          );
          genreMatch = genreId
            ? movie.genre_ids.includes(parseInt(genreId))
            : true;
        }

        return titleMatch && genreMatch;
      });

      setFilteredMovies(filtered);
    };

    filterMovies();
  }, [allMovies, currentSearchTerm, currentGenreFilter]);

  const handleSearch = (e) => {
    setCurrentSearchTerm(e.target.value.trim());
  };

  const handleGenreFilter = (genre) => {
    if (currentGenreFilter === genre) {
      setCurrentGenreFilter("");
    } else {
      setCurrentGenreFilter(genre);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (firstName && email) {
      console.log("Newsletter signup:", { firstName, email });
      setFirstName("");
      setEmail("");
      alert("Successfully subscribed to newsletter!");
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleMovieDetail = (movie) => {
    setSelectedMovie(movie);
    setShowDetail(true);
  };

  const handleBackToMovies = () => {
    setShowDetail(false);
    setSelectedMovie(null);
  };

  const MovieCard = ({ movie }) => {
    const { genre_ids, original_title, poster_path, vote_average, overview } = movie;

    const matchingGenres = genre_ids
      .filter((id) => id in GENRE_LIST)
      .map((id) => GENRE_LIST[id])
      .slice(0, 3);

    return (
      <div className="group min-w-[280px] w-[280px] mb-8 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">
        <div className="relative overflow-hidden rounded-xl shadow-xl bg-white">
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={`${original_title} movie poster`}
              className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Rating Badge */}
            <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg text-sm font-bold">
              {vote_average?.toFixed(1)}
            </div>

            {/* Overlay with buttons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="w-[220px] px-6 py-3 border-2 border-white bg-transparent text-white text-sm font-semibold tracking-wide rounded-lg text-center hover:bg-white hover:text-black transition-all transform hover:scale-105"
              >
                View Details
              </button>
              <button
                onClick={() => handleMovieDetail(movie)}
                className="w-[220px] px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold tracking-wide border-2 border-blue-600 rounded-lg text-center hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
              >
                Buy Ticket
              </button>
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-xl font-bold leading-tight tracking-wide text-gray-900 mb-3 line-clamp-2">
              {original_title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {overview}
            </p>

            <div className="flex gap-2 flex-wrap">
              {matchingGenres.map((genreName, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-xs font-semibold py-1 px-3 shadow-sm"
                >
                  {genreName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show detail page if movie is selected
  if (showDetail && selectedMovie) {
    return (
      <MovieDetailPage 
        movieId={selectedMovie.id}
        movieData={selectedMovie}
        onBack={handleBackToMovies}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] bg-gradient-to-r from-black/60 to-black/60 bg-cover bg-center flex items-center justify-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/background.svg')",
            filter: "brightness(0.4)"
          }}
        ></div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <span className="text-lg font-semibold tracking-wide uppercase mb-4 block text-blue-400">
            Movie Collection of the Week
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Experience the Magic of Cinema
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            Book Your Tickets Today & Enjoy Premium Movie Experience
          </p>
          <div className="flex gap-3 justify-center">
            <span className="w-12 h-3 rounded-full bg-blue-600"></span>
            <span className="w-3 h-3 rounded-full bg-white/50"></span>
            <span className="w-3 h-3 rounded-full bg-white/50"></span>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 bg-white rounded-2xl shadow-xl p-8">
          <div className="relative flex-1 max-w-md">
            <label className="block mb-3 text-lg font-bold text-gray-800">
              Search Movies
            </label>
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all"
                placeholder="Search for movies..."
                value={currentSearchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <span className="text-lg font-bold text-gray-800">Filter by Genre</span>
            <div className="flex gap-3 flex-wrap">
              <button
                className={`py-3 px-6 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                  currentGenreFilter === ""
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setCurrentGenreFilter("")}
              >
                All
              </button>
              {filterTags.map((tag) => (
                <button
                  key={tag}
                  className={`py-3 px-6 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                    currentGenreFilter === tag
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => handleGenreFilter(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid Section */}
      <section className="max-w-7xl mx-auto px-8 pb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Featured Movies
        </h2>
        <div className="flex gap-8 justify-center flex-wrap">
          {isLoading ? (
            <div className="col-span-full text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-6 text-gray-600 text-lg">Loading amazing movies...</p>
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-600 text-xl">
              <div className="mb-4 text-6xl">🎬</div>
              No movies found. Try adjusting your search or filter.
            </div>
          ) : (
            filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-8 pb-16">
        <div className="relative rounded-3xl p-16 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 shadow-2xl">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Subscribe to Our Newsletter
            </h1>
            <p className="text-xl mb-12 text-blue-100">
              Get the latest movie updates, exclusive offers, and early access to tickets!
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                className="flex-1 p-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm rounded-xl text-white text-lg placeholder:text-white/70 focus:outline-none focus:ring-4 focus:ring-white/30"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="email"
                className="flex-1 p-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm rounded-xl text-white text-lg placeholder:text-white/70 focus:outline-none focus:ring-4 focus:ring-white/30"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="md:min-w-[200px] px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoviePage;