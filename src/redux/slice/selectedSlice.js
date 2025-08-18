import { createSlice } from "@reduxjs/toolkit";

const selectedSlice = createSlice({
    name: 'selected',
    initialState: {
        selectedDate: '',
        selectedTime: '',
        selectedLocation: null,
        selectedCinema: null,
        selectedSeats: [],
        totalPrice: 0,
        selectedMovie: null, // Add movie data
    },
    reducers:{
        selectDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        selectTime: (state, action) => {
            state.selectedTime = action.payload;
        },
        selectLocation: (state, action) => {
            state.selectedLocation = action.payload;
        },
        selectCinema: (state, action) => {
            state.selectedCinema = action.payload;
        },
        selectSeats: (state, action) => {
            state.selectedSeats = action.payload.seats;
            state.totalPrice = action.payload.totalPrice;
        },
        selectMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
        resetSelection: (state) => {
            state.selectedDate = '';
            state.selectedTime = '';
            state.selectedLocation = null;
            state.selectedCinema = null;
            state.selectedSeats = [];
            state.totalPrice = 0;
            state.selectedMovie = null;
        }
    }
})

export const { 
    selectDate, 
    selectTime, 
    selectLocation, 
    selectCinema, 
    selectSeats, 
    selectMovie,
    resetSelection 
} = selectedSlice.actions;

export default selectedSlice.reducer;