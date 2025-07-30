import React, { useState, useEffect} from 'react';
import { Search, Menu, X } from 'lucide-react';


const GENRE_LIST = {
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

const MovieWebsite = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [currentGenreFilter, setCurrentGenreFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');

  const objOption = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTM3NTM1YTkwNzk5YWQzNGUzYzI1MWRkZDAyODVkNSIsIm5iZiI6MTc0MTM1NjEwNS4wMDgsInN1YiI6IjY3Y2FmYzQ5NTQ3ODNjYWFhM2FmZjI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TRKDbK0_ae0jY-ZYpujQnuIvG90lefKw8fFul9qWdJM",
    },
  };

  const filterTags = ['Thriller', 'Horror', 'Romantic', 'Adventure', 'Sci-Fi'];

  
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setIsLoading(true);
        const pages = [1, 2, 3];
        const allMoviePromises = pages.map(page => 
          fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, objOption)
            .then(response => {
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
        
        
        combinedMovies = combinedMovies.filter((movie, index, self) => 
          index === self.findIndex(m => m.id === movie.id)
        );
        
        setAllMovies(combinedMovies);
        setFilteredMovies(combinedMovies);
        
      } catch (err) {
        console.error("Error fetching movie data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  
  useEffect(() => {
    const filterMovies = () => {
      let filtered = allMovies.filter(movie => {
   
        const titleMatch = movie.original_title
          .toLowerCase()
          .includes(currentSearchTerm.toLowerCase());
        
       
        let genreMatch = true;
        if (currentGenreFilter && currentGenreFilter !== 'All') {
          
          const genreId = Object.keys(GENRE_LIST).find(
            id => GENRE_LIST[id].toLowerCase() === currentGenreFilter.toLowerCase()
          );
          genreMatch = genreId ? movie.genre_ids.includes(parseInt(genreId)) : true;
        }
        
        return titleMatch && genreMatch;
      });

      setFilteredMovies(filtered);
    };

    filterMovies();
  }, [allMovies, currentSearchTerm, currentGenreFilter]);

  
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
   
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [currentSearchTerm]);

  const handleSearch = (e) => {
    setCurrentSearchTerm(e.target.value.trim());
  };

  const handleGenreFilter = (genre) => {
    if (genre === 'Thriller' && currentGenreFilter === '') {
      setCurrentGenreFilter('Thriller');
    } else if (currentGenreFilter === genre) {
      setCurrentGenreFilter('');
    } else {
      setCurrentGenreFilter(genre);
    }
  };

  const handleNewsletterSubmit = () => {
    console.log('Newsletter signup:', { firstName, email });
  
    setFirstName('');
    setEmail('');
  };

  const MovieCard = ({ movie }) => {
    const { genre_ids, original_title, poster_path } = movie;

   
    const matchingGenres = genre_ids
      .filter((id) => id in GENRE_LIST)
      .map((id) => GENRE_LIST[id])
      .slice(0, 3);

    return (
      <div className="group min-w-[220px] w-[220px] mb-8 transition-transform duration-300 hover:-translate-y-2">
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={`${original_title} movie poster`}
            className="w-full aspect-[2/3] object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = '/asset/images/placeholder-movie.jpg';
            }}
          />
          
         
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href="/index/detail.html"
              className="w-[185px] px-4 py-3 border border-white bg-transparent text-white text-sm font-normal tracking-wide rounded text-center hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Details
            </a>
            <a
              href="/pages/order/order-page.html"
              className="w-[185px] px-4 py-3 bg-blue-600 text-gray-50 text-sm font-normal tracking-wide border border-blue-600 rounded text-center hover:bg-blue-700 transition-colors"
            >
              Buy Ticket
            </a>
          </div>
        </div>
        
        <h3 className="mt-5 text-xl font-bold leading-tight tracking-wide">
          {original_title}
        </h3>
        
        <div className="flex gap-2 mt-4 flex-wrap">
          {matchingGenres.map((genreName, index) => (
            <span
              key={index}
              className="bg-gray-100 bg-opacity-10 rounded-full text-xs text-center font-normal leading-normal py-1 px-4 text-gray-500"
            >
              {genreName}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="font-mulish bg-white">
     
      <nav className="flex justify-between items-center py-5 px-[5%] border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="flex-1 max-w-[130px]">
          <a href="/index.html" className="block">
            <img src="/tickitz-blu.svg"/>
          </a>
        </div>

        
        <div className="flex-[4] hidden md:flex justify-center">
          <ul className="flex list-none gap-10">
            <li>
              <a href="/index.html" className="text-gray-900 font-normal text-sm leading-5 hover:text-blue-600 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                Home
              </a>
            </li>
            <li>
              <a href="/index/movie.html" className="text-gray-900 font-normal text-sm leading-5 hover:text-blue-600 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                Movie
              </a>
            </li>
            <li>
              <a href="/index/detail.html" className="text-gray-900 font-normal text-sm leading-5 hover:text-blue-600 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                Buy Ticket
              </a>
            </li>
          </ul>
        </div>

        
        <div className="flex-1 hidden md:flex justify-end gap-3">
          <a href="/index/login.html" className="px-4 py-3 border border-blue-600 bg-transparent text-blue-600 text-sm font-normal tracking-wide rounded hover:bg-blue-600 hover:bg-opacity-10 transition-colors">
            Sign in
          </a>
          <a href="/index/register.html" className="px-4 py-3 bg-blue-600 text-gray-50 text-sm font-normal tracking-wide border border-blue-600 rounded hover:bg-blue-700 transition-colors">
            Sign Up
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[2000] p-5 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <a href="/index.html" className="block">
            <img src="/tickitz-blu.svg"/>
          </a>
            
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col gap-5">
            <a href="/index.html" className="text-lg text-gray-900 py-2 border-b border-gray-100">Home</a>
            <a href="/index/movie.html" className="text-lg text-gray-900 py-2 border-b border-gray-100">Movie</a>
            <a href="/index/detail.html" className="text-lg text-gray-900 py-2 border-b border-gray-100">Buy Ticket</a>
          </div>
          
          <div className="flex flex-col gap-4 mt-8">
            <a href="/index/login.html" className="px-4 py-3 border border-blue-600 bg-transparent text-blue-600 text-sm font-normal tracking-wide rounded text-center">
              Sign in
            </a>
            <a href="/index/register.html" className="px-4 py-3 bg-blue-600 text-gray-50 text-sm font-normal tracking-wide border border-blue-600 rounded text-center">
              Sign Up
            </a>
          </div>
        </div>
      )}

      <main>
        
        <section className="relative w-full h-[70vh] min-h-[500px] bg-gradient-to-r from-black/60 to-black/60 bg-cover bg-center flex items-center justify-start text-white px-[5%]" 
                 style={{ backgroundImage: "url('../../public/background.svg')" }}>
          <div className="max-w-[800px] flex flex-col gap-6">
            <span className="text-sm font-semibold tracking-wide uppercase">
              LIST MOVIE OF THE WEEK
            </span>
            <h1 className="text-5xl md:text-6xl font-normal leading-[60px] m-0 text-white tracking-wide max-w-[560px]">
              Experience the Magic of Cinema: Book Your Tickets Today
            </h1>
            <div className="flex gap-2 mt-8 justify-center md:justify-start md:ml-[33rem]">
              <span className="w-8 h-2 rounded bg-blue-600"></span>
              <span className="w-2 h-2 rounded-full bg-white/50"></span>
              <span className="w-2 h-2 rounded-full bg-white/50"></span>
            </div>
          </div>
        </section>

      
        <section className="max-w-[1200px] mx-auto p-5">
          <div className="flex flex-col md:flex-row md:justify-start md:items-center gap-8 ml-6">
           
            <div className="relative">
              <label className="block mb-2 text-sm text-gray-800">Cari Event</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  className="w-full max-w-[320px] pl-10 pr-4 py-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 transition-colors"
                  placeholder="New Born Expert"
                  value={currentSearchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

           
            <div className="flex flex-col items-start gap-4">
              <span className="text-sm text-gray-800">Filter</span>
              <div className="flex gap-9 flex-wrap">
                {filterTags.map((tag) => (
                  <button
                    key={tag}
                    className={`py-2 px-4 rounded text-sm cursor-pointer bg-transparent border-none transition-all duration-200 ${
                      currentGenreFilter === tag || (tag === 'Thriller' && currentGenreFilter === '')
                        ? 'py-2 px-6 bg-blue-600 text-white rounded-lg'
                        : 'text-gray-500 hover:bg-gray-50'
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

        
        <section className="relative">
          <div className="px-[5%] py-4 flex gap-5 justify-center flex-wrap overflow-x-auto pb-5 scroll-smooth">
            {isLoading ? (
              <div className="col-span-full text-center py-10">
                <div className="inline-block w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500">Loading movies...</p>
              </div>
            ) : filteredMovies.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500 text-lg">
                No movies found. Try adjusting your search or filter.
              </div>
            ) : (
              filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            )}
          </div>
        </section>

        
        <section className="flex justify-center items-center min-h-[40vh] px-[5%] py-10">
          <div className="relative w-full max-w-[1100px] rounded-xl p-16 overflow-hidden bg-blue-500">
            <div className="flex flex-col gap-8 items-center relative z-10 justify-center w-full">
              <h1 className="text-white text-center text-4xl md:text-5xl font-normal leading-tight tracking-wide mb-6 max-w-[732px]">
                Subscribe to our newsletter
              </h1>
              
              <div className="flex flex-col md:flex-row gap-4 w-full max-w-[620px] justify-center items-center">
                <input
                  type="text"
                  className="flex-1 min-w-[200px] p-4 border border-white/30 bg-transparent rounded text-white text-base leading-7 outline-none min-h-[50px] placeholder:text-white/70"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="email"
                  className="flex-1 min-w-[200px] p-4 border border-white/30 bg-transparent rounded text-white text-base leading-7 outline-none min-h-[50px] placeholder:text-white/70"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleNewsletterSubmit}
                  className="rounded-lg bg-white min-w-[220px] h-14 px-6 py-4 font-semibold cursor-pointer text-blue-600 text-sm tracking-wide border-none flex-1 md:flex-initial transition-colors hover:bg-gray-100"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </section>

        
        <footer className="mt-24 bg-white py-5">
          <div className="flex justify-between max-w-[1200px] mx-auto px-[5%] py-10 flex-wrap gap-8">
            <section className="mb-8 min-w-[200px] flex-1">
              <div className="mb-4">
                <a href="/index.html" className="block">
                <img src="/tickitz-blu.svg"/>
                </a>
              </div>
              <p className="text-gray-500 leading-relaxed max-w-[250px]">
                Stop waiting in line. Buy tickets conveniently, watch movies quietly.
              </p>
            </section>

            <section className="mb-8 min-w-[200px] flex-1">
              <h3 className="text-lg mb-5 text-gray-900">Explore</h3>
              <div className="flex flex-col gap-4">
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Cinemas</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Movies List</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">My Ticket</a>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Notification</a>
              </div>
            </section>

            <section className="mb-8 min-w-[200px] flex-1">
              <h3 className="text-lg mb-5 text-gray-900">Our Sponsor</h3>
              <div className="flex flex-col gap-4">
                <div className="h-8 mb-2">
                  <img src="../public/ebv.id 2.svg" alt="Ebv.id" />
                </div>
                <div className="h-8 mb-2">
                  <img src="../public/CineOne21 2.svg" alt="CineOne21" />
                </div>
                <div className="h-8 mb-2">
                  <img src="../public/hiflix 2.svg" alt="Hiflix" />
                </div>
              </div>
            </section>

            <section className="mb-8 min-w-[200px] flex-1">
              <h3 className="text-lg mb-5 text-gray-900">Follow us</h3>
              <div className="flex flex-col gap-4">
                <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <img src="../public/facebook.svg" alt="Facebook" />
                  Tickitz Cinema id
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <img src="../public/instagram.svg" alt="Instagram" />
                  tickitz.id
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <img src="../public/twitter.svg" alt="Twitter" />
                  tickitz.id
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <img src="../public/youtube.svg" alt="Youtube" />
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

export default MovieWebsite;