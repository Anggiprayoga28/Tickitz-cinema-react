import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Debug: Check if API key exists
console.log("API Key exists:", !!API_KEY);

const handleApiError = (error) => {
  console.error("API Error:", error);
  if (error.response?.status === 401) {
    return "Invalid API key. Please check your VITE_TMDB_API_KEY in .env file";
  }
  return error.response?.data?.status_message || error.message || "An error occurred";
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page = 1, { rejectWithValue }) => {
    try {
      // Check if API key exists
      if (!API_KEY) {
        throw new Error("TMDB API Key is not configured. Please set VITE_TMDB_API_KEY in your .env file");
      }

      console.log("Fetching movies with page:", page);
      
      const [genreRes, popularRes] = await Promise.all([
        axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`),
        axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
      ]);

      console.log("Genre response:", genreRes.data);
      console.log("Popular response:", popularRes.data);

      const genreMap = new Map(genreRes.data.genres.map(g => [g.id, g.name]));

      return {
        genreMap: Array.from(genreMap.entries()), // Convert to array for serialization
        movies: popularRes.data.results || [],
        page: popularRes.data.page || 1,
        total_pages: popularRes.data.total_pages || 1
      };
    } catch (error) {
      console.error("fetchMovies error:", error);
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Fetch upcoming movies
export const fetchUpcoming = createAsyncThunk(
  "movies/fetchUpcoming",
  async (page = 1, { rejectWithValue }) => {
    try {
      if (!API_KEY) {
        throw new Error("TMDB API Key is not configured. Please set VITE_TMDB_API_KEY in your .env file");
      }

      console.log("Fetching upcoming movies with page:", page);
      
      const res = await axios.get(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      
      console.log("Upcoming response:", res.data);
      
      return {
        results: res.data.results || [],
        page: res.data.page || 1,
        total_pages: res.data.total_pages || 1
      };
    } catch (error) {
      console.error("fetchUpcoming error:", error);
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Fetch movie by genre
export const fetchMoviesByGenre = createAsyncThunk(
  "movies/fetchMoviesByGenre",
  async ({ genreId, page = 1 }, { rejectWithValue }) => {
    try {
      if (!API_KEY) {
        throw new Error("TMDB API Key is not configured. Please set VITE_TMDB_API_KEY in your .env file");
      }

      const res = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&page=${page}`
      );
      return {
        movies: res.data.results || [],
        genreId,
        page: res.data.page || 1,
        total_pages: res.data.total_pages || 1
      };
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// Fetch movies by search query
export const fetchMoviesBySearch = createAsyncThunk(
  "movies/fetchMoviesBySearch",
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      if (!API_KEY) {
        throw new Error("TMDB API Key is not configured. Please set VITE_TMDB_API_KEY in your .env file");
      }

      const res = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=${page}&include_adult=false`
      );
      return {
        results: res.data.results || [],
        page: res.data.page || 1,
        total_pages: res.data.total_pages || 1,
        query
      };
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const initialState = {
  popular: { results: [], page: 1, total_pages: 1 },
  upcoming: { results: [], page: 1, total_pages: 1 },
  byGenre: { genreId: null, results: [], page: 1, total_pages: 1 },
  bySearch: { results: [], page: 1, total_pages: 1, query: '' },
  genreMap: [],
  loading: { popular: false, upcoming: false, byGenre: false, bySearch: false },
  error: null
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    resetSearchResults: (state) => {
      state.bySearch = initialState.bySearch;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchMovies
      .addCase(fetchMovies.pending, (state) => {
        state.loading.popular = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading.popular = false;
        state.popular.results = action.payload.movies;
        state.genreMap = action.payload.genreMap;
        state.popular.page = action.payload.page;
        state.popular.total_pages = action.payload.total_pages;
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading.popular = false;
        state.error = action.payload;
        console.error("fetchMovies rejected:", action.payload);
      })

      // fetchUpcoming
      .addCase(fetchUpcoming.pending, (state) => {
        state.loading.upcoming = true;
        state.error = null;
      })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.loading.upcoming = false;
        state.upcoming.results = action.payload.results;
        state.upcoming.page = action.payload.page;
        state.upcoming.total_pages = action.payload.total_pages;
      })
      .addCase(fetchUpcoming.rejected, (state, action) => {
        state.loading.upcoming = false;
        state.error = action.payload;
        console.error("fetchUpcoming rejected:", action.payload);
      })

      // fetchMoviesByGenre
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading.byGenre = true;
        state.error = null;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.loading.byGenre = false;
        state.byGenre.genreId = action.payload.genreId;
        state.byGenre.results = action.payload.movies;
        state.byGenre.page = action.payload.page;
        state.byGenre.total_pages = action.payload.total_pages;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading.byGenre = false;
        state.error = action.payload;
      })

      // fetchMoviesBySearch
      .addCase(fetchMoviesBySearch.pending, (state) => {
        state.loading.bySearch = true;
        state.error = null;
      })
      .addCase(fetchMoviesBySearch.fulfilled, (state, action) => {
        state.loading.bySearch = false;
        state.bySearch.results = action.payload.results;
        state.bySearch.query = action.payload.query;
        state.bySearch.page = action.payload.page;
        state.bySearch.total_pages = action.payload.total_pages;
      })
      .addCase(fetchMoviesBySearch.rejected, (state, action) => {
        state.loading.bySearch = false;
        state.error = action.payload;
      });
  },
});

export const { resetSearchResults, clearError } = movieSlice.actions;
export default movieSlice.reducer;