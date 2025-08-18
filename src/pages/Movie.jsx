import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_KEY = '2beb647ab8bb467e8ccb593d79139017';
let GENRE_LIST = {};

const MoviePage = () => {
  const navigate = useNavigate();
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentGenreFilter, setCurrentGenreFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [genres, setGenres] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  
  const ITEMS_PER_PAGE = 8;

  // Custom hook untuk URL parameters
  const getURLParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      page: parseInt(urlParams.get('page')) || 1,
      search: urlParams.get('search') || '',
      genre: urlParams.get('genre') || ''
    };
  };

  const setURLParams = (params) => {
    const urlParams = new URLSearchParams(window.location.search);
    
    Object.keys(params).forEach(key => {
      if (params[key]) {
        urlParams.set(key, params[key]);
      } else {
        urlParams.delete(key);
      }
    });

    const newURL = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, '', newURL);
  };

  const [currentPage, setCurrentPage] = useState(() => getURLParams().page);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const genreMapping = {};
      data.genres.forEach(genre => {
        genreMapping[genre.id] = genre.name;
      });
      
      GENRE_LIST = genreMapping;
      setGenres(data.genres);
      
      const popularGenres = ['Action', 'Comedy', 'Drama', 'Romance', 'Sci-Fi', 'Adventure'];
      setFilterTags(popularGenres);
      
    } catch (error) {
      console.error("Error fetching genres:", error);
      const fallbackGenres = [
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
        { id: 18, name: "Drama" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Science Fiction" },
        { id: 12, name: "Adventure" }
      ];
      
      const genreMapping = {};
      fallbackGenres.forEach(genre => {
        genreMapping[genre.id] = genre.name;
      });
      
      GENRE_LIST = genreMapping;
      setGenres(fallbackGenres);
      setFilterTags(['Action', 'Comedy', 'Drama', 'Romance', 'Sci-Fi', 'Adventure']);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      await fetchGenres();
      await fetchMovieData();
      
      const urlParams = getURLParams();
      setCurrentPage(urlParams.page);
      setCurrentSearchTerm(urlParams.search);
      setCurrentGenreFilter(urlParams.genre);
      
      setIsLoading(false);
    };

    initializeData();

    const handlePopState = () => {
      const urlParams = getURLParams();
      setCurrentPage(urlParams.page);
      setCurrentSearchTerm(urlParams.search);
      setCurrentGenreFilter(urlParams.genre);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const fetchMovieData = async () => {
    try {
      const pages = [1, 2, 3, 4, 5];
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

      combinedMovies = combinedMovies.filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.id === movie.id)
      );

      setAllMovies(combinedMovies);
    } catch (err) {
      console.error("Error fetching movie data:", err);
      setAllMovies([]);
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

      const totalPagesCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);
      setTotalPages(totalPagesCount);

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedMovies = filtered.slice(startIndex, endIndex);

      setFilteredMovies(paginatedMovies);
    };

    filterMovies();
  }, [allMovies, currentSearchTerm, currentGenreFilter, currentPage]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.trim();
    setCurrentSearchTerm(searchValue);
    setCurrentPage(1);
    
    setURLParams({
      page: 1,
      search: searchValue || null,
      genre: currentGenreFilter || null
    });
  };

  const handleGenreFilter = (genre) => {
    let newGenre = "";
    if (currentGenreFilter !== genre) {
      newGenre = genre;
    }
    
    setCurrentGenreFilter(newGenre);
    setCurrentPage(1);
    
    setURLParams({
      page: 1,
      search: currentSearchTerm || null,
      genre: newGenre || null
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    
    setURLParams({
      page: page,
      search: currentSearchTerm || null,
      genre: currentGenreFilter || null
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation handlers
  const handleMovieDetail = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const handleBuyTicket = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const MovieCard = ({ movie }) => {
    const { genre_ids, original_title, poster_path, vote_average, overview } = movie;

    const matchingGenres = genre_ids
      .filter((id) => id in GENRE_LIST)
      .map((id) => GENRE_LIST[id])
      .slice(0, 2);

    return (
      <div className="group w-full max-w-[280px] mx-auto mb-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white">
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={`${original_title} movie poster`}
              className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay with buttons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={() => handleBuyTicket(movie)}
                className="w-[200px] px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                Buy Ticket
              </button>
              <button
                onClick={() => handleMovieDetail(movie)}
                className="w-[200px] px-4 py-2 border-2 border-white bg-transparent text-white text-sm font-semibold rounded-lg hover:bg-white hover:text-black transition-all"
              >
                View Details
              </button>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
              {original_title}
            </h3>

            <div className="flex gap-2 flex-wrap mb-3">
              {matchingGenres.map((genreName, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 rounded-full text-xs font-medium py-1 px-2"
                >
                  {genreName}
                </span>
              ))}
            </div>

            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {overview}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] bg-gradient-to-r from-black/80 to-black/60 flex items-center justify-start text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/background.svg')",
            filter: "brightness(1.0)"
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-2xl">
            <span className="text-sm tracking-wide uppercase mb-2 block font-medium">
              LIST MOVIE OF THE WEEK
            </span>
            <h1 className="text-4xl md:text-5xl leading-tight mb-6">
              Experience the Magic of Cinema: Book Your Tickets Today
            </h1>
          </div>
        </div>
        
        <div className="absolute flex gap-2 justify-center bottom-8 left-1/2 transform -translate-x-1/2">
          <span className="w-8 h-2 rounded-full bg-blue-600"></span>
          <span className="w-2 h-2 rounded-full bg-white/50"></span>
          <span className="w-2 h-2 rounded-full bg-white/50"></span>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
            <div className="flex-1 max-w-md">
              <label className="block mb-3 text-lg font-semibold text-gray-800">
                Cari Genre
              </label>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Tulis Kata Pencarian..."
                  value={currentSearchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-3">
              <span className="text-lg font-semibold text-gray-800">Filter</span>
              <div className="flex gap-2 flex-wrap">
                <button
                  className={`py-2 px-4 text-sm rounded-full transition-all duration-200 ${
                    currentGenreFilter === ""
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setCurrentGenreFilter("")}
                >
                  ALL
                </button>
                {filterTags.map((tag) => (
                  <button
                    key={tag}
                    className={`py-2 px-4 rounded-full text-sm transition-all duration-200 ${
                      currentGenreFilter === tag
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => handleGenreFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movies Grid Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-6 text-gray-600 text-lg">Loading amazing movies...</p>
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="text-center py-20 text-gray-600 text-xl">
              <div className="mb-4 text-6xl">🎬</div>
              No movies found. Try adjusting your search or filter.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-center items-center gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              ← Prev
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className="w-10 h-10 rounded-lg text-sm font-bold bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all"
              >
                {totalPages}
              </button>
            )}

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              Next →
            </button>
          </div>          
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative my-16 rounded-2xl p-8 pb-16 bg-blue-700 text-white overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-6">
            Subscribe to our newsletter
          </h2>

          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="flex-grow px-4 py-3 rounded-md text-white bg-blue-600 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-white placeholder-blue-200"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="flex-grow px-4 py-3 rounded-md text-white bg-blue-600 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-white placeholder-blue-200"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 rounded-md font-semibold transition-colors"
            >
              Subscribe Now
            </button>
          </form>
        </div>

        <div className="absolute -right-30 -bottom-50 w-60 h-60 rounded-full border-8 border-white opacity-20"></div>
      </section>
    </div>
  );
};

export default MoviePage;