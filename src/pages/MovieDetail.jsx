import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setMovieDetails,
  setCinemaDetails,
  setBookingDateTime,
} from "../redux/slice/bookingSlice";
import { ToastContainer, toast } from 'react-toastify';

const API_KEY = "2beb647ab8bb467e8ccb593d79139017";

let GENRE_LIST = {};
let genresLoaded = false;

const getGenreList = async () => {
  if (genresLoaded && Object.keys(GENRE_LIST).length > 0) {
    return GENRE_LIST;
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `TMDB API error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();

    if (!data.genres || !Array.isArray(data.genres)) {
      throw new Error("Invalid API response structure - expected genres array");
    }

    const genreMapping = {};
    data.genres.forEach((genre) => {
      if (genre.id && genre.name) {
        genreMapping[genre.id] = genre.name;
      }
    });

    if (Object.keys(genreMapping).length === 0) {
      throw new Error("No valid genres received from API");
    }

    GENRE_LIST = genreMapping;
    genresLoaded = true;

    console.log("Genres loaded from TMDB API:", data.genres.length, "genres");

    return GENRE_LIST;
  } catch (error) {
    console.error("Error fetching genres from TMDB API:", error.message);

    // Fallback genres
    const fallbackGenres = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    GENRE_LIST = fallbackGenres;
    genresLoaded = true;

    return GENRE_LIST;
  }
};

const MovieDetailPage = () => {
  const { id: movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);

  // Sample cinema data
  const cinemas = [
    { id: 1, name: "EBV.ID", logo: "/ebv.id 2.svg", available: true },
    { id: 2, name: "Hiflix", logo: "/hiflix 2.svg", available: true },
    { id: 3, name: "CineOne21", logo: "/CineOne21 2.svg", available: true },
    { id: 4, name: "EBV.ID", logo: "/ebv.id 2.svg", available: true },
  ];

  const timeSlots = [
    "08:30 AM",
    "11:00 AM",
    "02:30 PM",
    "05:00 PM",
    "08:30 PM",
  ];
  const locations = ["Purwokerto", "Jakarta", "Bandung", "Surabaya"];

  const fetchGenres = async () => {
    try {
      const genreMapping = await getGenreList();
      const genreArray = Object.entries(genreMapping).map(([id, name]) => ({
        id: parseInt(id),
        name,
      }));
      setGenres(genreArray);
    } catch (error) {
      console.error("Error loading genres:", error.message);
      setGenres([]);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      await fetchGenres();
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

      const director =
        movieData.credits?.crew?.find((person) => person.job === "Director")
          ?.name || "Unknown";
      const mainCast =
        movieData.credits?.cast?.slice(0, 5).map((actor) => actor.name) || [];

      const processedMovie = {
        ...movieData,
        director,
        cast: mainCast,
      };

      setMovie(processedMovie);

      dispatch(
        setMovieDetails({
          id: processedMovie.id,
          title: processedMovie.title || processedMovie.original_title,
          poster: processedMovie.poster_path,
          backdrop: processedMovie.backdrop_path,
          genre_ids: processedMovie.genres?.map((g) => g.id) || [],
          genres: processedMovie.genres || [],
          runtime: processedMovie.runtime,
          rating: processedMovie.vote_average,
          overview: processedMovie.overview,
          director: processedMovie.director,
          cast: processedMovie.cast,
          release_date: processedMovie.release_date,
        })
      );
    } catch (error) {
      console.error("Error fetching movie details:", error);

      const fallbackMovie = {
        id: movieId,
        title: "Sample Movie",
        original_title: "Sample Movie",
        poster_path: "/sample-poster.jpg",
        backdrop_path: "/sample-backdrop.jpg",
        genres: [
          { id: 28, name: "Action" },
          { id: 12, name: "Adventure" },
        ],
        release_date: "2024-01-01",
        overview:
          "This is a sample movie description. The actual movie data could not be loaded.",
        vote_average: 7.5,
        runtime: 120,
        director: "Sample Director",
        cast: ["Actor 1", "Actor 2", "Actor 3"],
      };

      setMovie(fallbackMovie);

      dispatch(
        setMovieDetails({
          id: fallbackMovie.id,
          title: fallbackMovie.title,
          poster: fallbackMovie.poster_path,
          backdrop: fallbackMovie.backdrop_path,
          genre_ids: fallbackMovie.genres?.map((g) => g.id) || [],
          genres: fallbackMovie.genres || [],
          runtime: fallbackMovie.runtime,
          rating: fallbackMovie.vote_average,
          overview: fallbackMovie.overview,
          director: fallbackMovie.director,
          cast: fallbackMovie.cast,
          release_date: fallbackMovie.release_date,
        })
      );
    }
  };

  const handleBookNow = () => {
    if (
      !selectedCinema ||
      !selectedDate ||
      !selectedTime ||
      !selectedLocation
    ) {
      toast("Please fill in all booking details!");
      return;
    }

    dispatch(setCinemaDetails(selectedCinema));

    dispatch(
      setBookingDateTime({
        date: selectedDate,
        time: selectedTime,
        location: selectedLocation,
        ticketPrice: 10,
      })
    );

    navigate(`/order/${movieId}`);
  };

  const handleBackToMovies = () => {
    const fromState = location.state?.from;
    if (fromState) {
      navigate(fromState);
    } else {
      navigate("/movies");
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
    if (Object.keys(GENRE_LIST).length === 0) return [];
    return genreIds.map((id) => GENRE_LIST[id]).filter(Boolean);
  };

  const formatReleaseDate = (dateString) => {
    if (!dateString) return "Unknown";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Unknown";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-6 text-gray-600 text-lg">Loading movie details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ToastContainer />
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/w1920${
            movie.backdrop_path || movie.poster_path
          })`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div>
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Movie Poster */}
            <div className="flex-shrink-0">
              <div className="w-72 h-108 rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/placeholder-poster.jpg"
                  }
                  alt={movie.title || movie.original_title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-poster.jpg";
                  }}
                />
              </div>
            </div>

            {/* Movie Information */}
            <div className="flex-1 mt-30">
              <h1 className="text-5xl font-semibold text-gray-900 mb-6">
                {movie.title || movie.original_title}
              </h1>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {movie.genres && movie.genres.length > 0
                  ? movie.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-200 text-gray-500 rounded-full text-base"
                      >
                        {genre.name}
                      </span>
                    ))
                  : getGenreNames(movie.genre_ids).length > 0 &&
                    getGenreNames(movie.genre_ids).map((genre, index) => (
                      <span
                        key={index}
                        className="px-6 py-3 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-base font-semibold shadow-md"
                      >
                        {genre}
                      </span>
                    ))}
              </div>

              {/* Movie Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 mb-11">
                <div className="bg-gray-50 rounded-xl">
                  <p className="text-gray-500 text-sm mb-2">Release Date</p>
                  <p className="text-gray-900 text-lg">
                    {formatReleaseDate(movie.release_date)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl col-span-3">
                  <p className="text-gray-500 text-sm mb-2">Director</p>
                  <p className="text-gray-900 text-lg">
                    {movie.director}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl">
                  <p className="text-gray-500 text-sm mb-2">Duration</p>
                  <p className="text-gray-900 text-lg">
                    {formatRuntime(movie.runtime)}
                  </p>
                </div>
                {movie.cast && movie.cast.length > 0 && (
                <div className="col-span-2">
                  <p className="text-gray-500 text-sm mb-3">Cast</p>
                  <p className="text-gray-900 text-lg">
                    {movie.cast.join(", ")}
                  </p>
                </div>
              )}
              </div>

              
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div>
          <h3 className="text-2xl text-gray-500 mb-4">Synopsis</h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            {movie.overview}
          </p>
        </div>
        {/* Booking Section */}
        <div className="p-10 mt-10">
          <h2 className="text-3xl text-gray-900 mb-10 text-start">
            Book Tickets
          </h2>

          {/* Booking Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-4">
                Choose Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              />
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-700 mb-4">
                Choose Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              >
                <option value="">Select time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-base font-semibold text-gray-700 mb-4">
                Choose Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              >
                <option value="">Select location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 text-lg">
                Filter
              </button>
            </div>
          </div>

          {/* Cinema Selection */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl text-gray-900">
                Choose Cinema
              </h3>
              <span className="flex justify-start text-gray-500 text-lg">
                {cinemas.filter((c) => c.available).length} Available
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              {cinemas.map((cinema) => (
                <div
                  key={cinema.id}
                  onClick={() => cinema.available && setSelectedCinema(cinema)}
                  className={`relative p-8 border-3 rounded-md cursor-pointer transition-all transform hover:scale-105 ${
                    selectedCinema?.id === cinema.id
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100"
                      : cinema.available
                      ? "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      : "border-gray-200 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center h-20 mb-4">
                    <img src={cinema.logo}/>
                  </div>
                  <p className="text-center font-bold text-gray-800 text-lg">
                    {cinema.name}
                  </p>

                  {!cinema.available && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 rounded-md">
                      <span className="text-gray-500 font-bold text-lg">
                        Unavailable
                      </span>
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
              disabled={
                !selectedCinema ||
                !selectedDate ||
                !selectedTime ||
                !selectedLocation
              }
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 text-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
