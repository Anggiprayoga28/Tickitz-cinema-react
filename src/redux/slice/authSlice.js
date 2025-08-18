import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        users: JSON.parse(localStorage.getItem("users")) || [],
        loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || null,
        isAuthenticated: !!JSON.parse(localStorage.getItem("loggedInUser")),
        error: null,
        loading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        
        clearError: (state) => {
            state.error = null;
        },
        
        registerUser: (state, action) => {
            const { email, password, name } = action.payload;

            // Reset error state
            state.error = null;

            // Check if email already exists
            const emailExist = state.users.some((u) => u.email === email);
            if (emailExist) {
                state.error = "Email sudah terdaftar";
                return;
            }

            // Create new user with additional fields
            const newUser = { 
                id: Date.now().toString(),
                email, 
                password,
                name: name || email.split('@')[0], // Use email prefix as default name
                profilePicture: null,
                createdAt: new Date().toISOString()
            };
            
            state.users.push(newUser);
            state.loggedInUser = newUser;
            state.isAuthenticated = true;

            // Save to localStorage
            localStorage.setItem("users", JSON.stringify(state.users));
            localStorage.setItem("loggedInUser", JSON.stringify(newUser));
        },

        loginUser: (state, action) => {
            const { email, password } = action.payload;

            // Reset error state
            state.error = null;

            const user = state.users.find(
                (u) => u.email === email && u.password === password
            );

            if (user) {
                state.loggedInUser = user;
                state.isAuthenticated = true;
                localStorage.setItem("loggedInUser", JSON.stringify(user));
            } else {
                state.error = "Email atau password salah";
            }
        },

        logoutUser: (state) => {
            state.loggedInUser = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem("loggedInUser");
        },

        updateUserProfile: (state, action) => {
            const { name, profilePicture } = action.payload;
            
            if (state.loggedInUser) {
                // Update logged in user
                state.loggedInUser = {
                    ...state.loggedInUser,
                    name: name || state.loggedInUser.name,
                    profilePicture: profilePicture !== undefined ? profilePicture : state.loggedInUser.profilePicture
                };

                // Update user in users array
                state.users = state.users.map(user => 
                    user.id === state.loggedInUser.id 
                        ? state.loggedInUser 
                        : user
                );

                // Update localStorage
                localStorage.setItem("loggedInUser", JSON.stringify(state.loggedInUser));
                localStorage.setItem("users", JSON.stringify(state.users));
            }
        },

        resetPassword: (state, action) => {
            const { email, newPassword } = action.payload;
            
            // Reset error state
            state.error = null;
            
            const userIndex = state.users.findIndex(user => user.email === email);
            
            if (userIndex !== -1) {
                // Update password
                state.users[userIndex].password = newPassword;
                
                // Update localStorage
                localStorage.setItem("users", JSON.stringify(state.users));
                
                // If this user is currently logged in, update logged in user too
                if (state.loggedInUser && state.loggedInUser.email === email) {
                    state.loggedInUser.password = newPassword;
                    localStorage.setItem("loggedInUser", JSON.stringify(state.loggedInUser));
                }
            } else {
                state.error = "Email tidak ditemukan";
            }
        },

        initializeAuth: (state) => {
            // Initialize auth state from localStorage on app startup
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
            
            state.users = users;
            state.loggedInUser = loggedInUser;
            state.isAuthenticated = !!loggedInUser;
        }
    },
});

export const { 
    setLoading, 
    clearError, 
    registerUser, 
    loginUser, 
    logoutUser, 
    updateUserProfile, 
    resetPassword,
    initializeAuth 
} = authSlice.actions;

export default authSlice.reducer;