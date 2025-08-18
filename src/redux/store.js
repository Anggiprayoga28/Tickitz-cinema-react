import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from './slice/bookingSlice'
import orderHistoryReducer from './slice/orderHistoriSlice'
import authReducer from './slice/authSlice'
import movieReducer from './slice/movieSlice'
import selectedReducer from './slice/selectedSlice' // Keep for backward compatibility if needed
import {
	persistStore,
	persistReducer,
	PERSIST,
	REHYDRATE,
	REGISTER,
	FLUSH,
	PAUSE,
	PURGE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // localStorage

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	booking: bookingReducer,
	orderHistory: orderHistoryReducer,
	auth: authReducer,
	movies: movieReducer,
	selected: selectedReducer, // Keep for backward compatibility
})

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['movies'], // movies tidak perlu di-persist karena data API
	whitelist: ['booking', 'orderHistory', 'auth'], // Only persist important data
}

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Buat store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					PERSIST,
					REHYDRATE,
					REGISTER,
					FLUSH,
					PAUSE,
					PURGE,
				],
			},
		}),
	devTools: import.meta.env.VITE_ENVIRONMENT === 'development',
})

export const persistor = persistStore(store)
export * from './slice/bookingSlice'
export default { store, persistor }
