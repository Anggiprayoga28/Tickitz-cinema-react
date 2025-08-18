import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentBooking: {
		movie: null,
		cinema: null,
		date: '',
		time: '',
		location: '',
		ticketPrice: 10,
		selectedSeats: [],
		totalPrice: 0,
		personalInfo: null,
		paymentMethod: null,
	},
	bookingHistory: [],
}

const bookingSlice = createSlice({
	name: 'booking',
	initialState,
	reducers: {
		setPaymentMethod: (state, action) => {
			state.currentBooking.paymentMethod = action.payload
		},

		setPersonalInfo: (state, action) => {
			state.currentBooking.personalInfo = action.payload
		},

		setMovieDetails: (state, action) => {
			state.currentBooking.movie = {
				id: action.payload.id,
				title: action.payload.title,
				poster: action.payload.poster,
				backdrop: action.payload.backdrop,
				genre_ids: action.payload.genre_ids,
				genres: action.payload.genres || [],
				runtime: action.payload.runtime,
				rating: action.payload.rating,
				overview: action.payload.overview,
				director: action.payload.director,
				cast: action.payload.cast,
				release_date: action.payload.release_date,
			}
		},

		setCinemaDetails: (state, action) => {
			state.currentBooking.cinema = {
				id: action.payload.id,
				name: action.payload.name,
				logo: action.payload.logo,
				available: action.payload.available,
			}
		},

		setBookingDateTime: (state, action) => {
			state.currentBooking.date = action.payload.date
			state.currentBooking.time = action.payload.time
			state.currentBooking.location = action.payload.location
			if (action.payload.ticketPrice) {
				state.currentBooking.ticketPrice = action.payload.ticketPrice
			}
		},

		setSelectedSeats: (state, action) => {
			state.currentBooking.selectedSeats = action.payload
			state.currentBooking.totalPrice =
				action.payload.length * state.currentBooking.ticketPrice
		},

		updateTicketPrice: (state, action) => {
			state.currentBooking.ticketPrice = action.payload
			state.currentBooking.totalPrice =
				state.currentBooking.selectedSeats.length * action.payload
		},

		clearCurrentBooking: (state) => {
			state.currentBooking = {
				movie: null,
				cinema: null,
				date: '',
				time: '',
				ticketPrice: 10,
				selectedSeats: [],
				totalPrice: 0,
			}
		},

		addToHistory: (state) => {
			const booking = {
				...state.currentBooking,
				bookingId: Date.now().toString(),
				bookingDate: new Date().toISOString(),
				status: 'confirmed',
			}
			state.bookingHistory.push(booking)
		},

		getCurrentBookingSummary: (state) => {
			return {
				hasMovie: !!state.currentBooking.movie,
				hasCinema: !!state.currentBooking.cinema,
				hasDateTime: !!(
					state.currentBooking.date && state.currentBooking.time
				),
				hasSeats: state.currentBooking.selectedSeats.length > 0,
				isComplete: !!(
					state.currentBooking.movie &&
					state.currentBooking.cinema &&
					state.currentBooking.date &&
					state.currentBooking.time &&
					state.currentBooking.selectedSeats.length > 0
				),
			}
		},
	},
})

export const {
	setMovieDetails,
	setCinemaDetails,
	setBookingDateTime,
	setSelectedSeats,
	updateTicketPrice,
	clearCurrentBooking,
	addToHistory,
	getCurrentBookingSummary,
	setPersonalInfo,
	setPaymentMethod,
} = bookingSlice.actions

export const selectCurrentBooking = (state) => state.booking.currentBooking
export const selectMovieDetails = (state) => state.booking.currentBooking.movie
export const selectCinemaDetails = (state) =>
	state.booking.currentBooking.cinema
export const selectBookingDateTime = (state) => ({
	date: state.booking.currentBooking.date,
	time: state.booking.currentBooking.time,
	location: state.booking.currentBooking.location,
})
export const selectSelectedSeats = (state) =>
	state.booking.currentBooking.selectedSeats
export const selectTotalPrice = (state) =>
	state.booking.currentBooking.totalPrice
export const selectBookingHistory = (state) => state.booking.bookingHistory

export default bookingSlice.reducer
