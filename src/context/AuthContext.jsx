// contexts/AuthContext.jsx - Hybrid version that syncs with Redux
import { createContext, useContext, useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Initial state
const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || null,
  isAuthenticated: !!JSON.parse(localStorage.getItem("loggedInUser")),
  error: null,
  loading: false,
};

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  CLEAR_ERROR: 'CLEAR_ERROR',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERROR: 'REGISTER_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT: 'LOGOUT',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_ERROR: 'RESET_PASSWORD_ERROR',
  INITIALIZE_AUTH: 'INITIALIZE_AUTH',
  SYNC_WITH_REDUX: 'SYNC_WITH_REDUX'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      const newUser = action.payload;
      const updatedUsers = [...state.users, newUser];
      
      // Save to localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));
      
      return {
        ...state,
        users: updatedUsers,
        loggedInUser: newUser,
        isAuthenticated: true,
        error: null,
        loading: false,
      };

    case AUTH_ACTIONS.REGISTER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
      return {
        ...state,
        loggedInUser: action.payload,
        isAuthenticated: true,
        error: null,
        loading: false,
      };

    case AUTH_ACTIONS.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem("loggedInUser");
      return {
        ...state,
        loggedInUser: null,
        isAuthenticated: false,
        error: null,
      };

    case AUTH_ACTIONS.UPDATE_PROFILE:
      const { name, profilePicture } = action.payload;
      const updatedLoggedInUser = {
        ...state.loggedInUser,
        name: name || state.loggedInUser.name,
        profilePicture: profilePicture !== undefined ? profilePicture : state.loggedInUser.profilePicture
      };

      const updatedUsersArray = state.users.map(user => 
        user.id === updatedLoggedInUser.id ? updatedLoggedInUser : user
      );

      // Update localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(updatedLoggedInUser));
      localStorage.setItem("users", JSON.stringify(updatedUsersArray));

      return {
        ...state,
        loggedInUser: updatedLoggedInUser,
        users: updatedUsersArray,
      };

    case AUTH_ACTIONS.RESET_PASSWORD_SUCCESS:
      const { email, newPassword } = action.payload;
      const resetUsers = state.users.map(user => 
        user.email === email ? { ...user, password: newPassword } : user
      );

      let resetLoggedInUser = state.loggedInUser;
      if (state.loggedInUser && state.loggedInUser.email === email) {
        resetLoggedInUser = { ...state.loggedInUser, password: newPassword };
        localStorage.setItem("loggedInUser", JSON.stringify(resetLoggedInUser));
      }

      localStorage.setItem("users", JSON.stringify(resetUsers));

      return {
        ...state,
        users: resetUsers,
        loggedInUser: resetLoggedInUser,
        error: null,
      };

    case AUTH_ACTIONS.RESET_PASSWORD_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case AUTH_ACTIONS.INITIALIZE_AUTH:
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
      
      return {
        ...state,
        users,
        loggedInUser,
        isAuthenticated: !!loggedInUser,
      };

    case AUTH_ACTIONS.SYNC_WITH_REDUX:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // Redux integration
  const reduxDispatch = useDispatch();
  const reduxAuth = useSelector(state => state.auth || {});

  // Sync Context with Redux auth state
  useEffect(() => {
    if (reduxAuth.loggedInUser || reduxAuth.isAuthenticated !== undefined) {
      dispatch({ 
        type: AUTH_ACTIONS.SYNC_WITH_REDUX, 
        payload: {
          loggedInUser: reduxAuth.loggedInUser || state.loggedInUser,
          isAuthenticated: reduxAuth.isAuthenticated !== undefined ? reduxAuth.isAuthenticated : state.isAuthenticated,
          users: reduxAuth.users || state.users
        }
      });
    }
  }, [reduxAuth]);

  // Initialize auth on mount
  useEffect(() => {
    dispatch({ type: AUTH_ACTIONS.INITIALIZE_AUTH });
  }, []);

  // Action creators
  const setLoading = (loading) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: loading });
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const registerUser = async ({ email, password, name }) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

    try {
      // Check if email already exists
      const emailExists = state.users.some((user) => user.email === email);
      if (emailExists) {
        dispatch({ 
          type: AUTH_ACTIONS.REGISTER_ERROR, 
          payload: "Email sudah terdaftar" 
        });
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name: name || email.split('@')[0],
        profilePicture: null,
        createdAt: new Date().toISOString()
      };

      dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: newUser });
      
      // Sync with Redux if needed
      if (reduxDispatch && typeof reduxDispatch === 'function') {
        try {
          // Import redux action jika diperlukan
          // reduxDispatch(registerUserRedux(newUser));
        } catch (err) {
          console.log('Redux sync not available');
        }
      }
    } catch (error) {
      dispatch({ 
        type: AUTH_ACTIONS.REGISTER_ERROR, 
        payload: "Registration failed" 
      });
    }
  };

  const loginUser = async ({ email, password }) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

    try {
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
        
        // Sync with Redux if needed
        if (reduxDispatch && typeof reduxDispatch === 'function') {
          try {
            // Import redux action jika diperlukan
            // reduxDispatch(loginUserRedux(user));
          } catch (err) {
            console.log('Redux sync not available');
          }
        }
      } else {
        dispatch({ 
          type: AUTH_ACTIONS.LOGIN_ERROR, 
          payload: "Email atau password salah" 
        });
      }
    } catch (error) {
      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_ERROR, 
        payload: "Login failed" 
      });
    }
  };

  const logoutUser = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    
    // Sync with Redux if needed
    if (reduxDispatch && typeof reduxDispatch === 'function') {
      try {
        // Import redux action jika diperlukan
        // reduxDispatch(logoutUserRedux());
      } catch (err) {
        console.log('Redux sync not available');
      }
    }
  };

  const updateUserProfile = ({ name, profilePicture }) => {
    if (state.loggedInUser) {
      dispatch({ 
        type: AUTH_ACTIONS.UPDATE_PROFILE, 
        payload: { name, profilePicture } 
      });
    }
  };

  const resetPassword = ({ email, newPassword }) => {
    const userExists = state.users.some(user => user.email === email);
    
    if (userExists) {
      dispatch({ 
        type: AUTH_ACTIONS.RESET_PASSWORD_SUCCESS, 
        payload: { email, newPassword } 
      });
    } else {
      dispatch({ 
        type: AUTH_ACTIONS.RESET_PASSWORD_ERROR, 
        payload: "Email tidak ditemukan" 
      });
    }
  };

  const value = {
    // State
    users: state.users,
    loggedInUser: state.loggedInUser,
    isAuthenticated: state.isAuthenticated,
    error: state.error,
    loading: state.loading,
    
    // Actions
    setLoading,
    clearError,
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};