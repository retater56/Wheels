import {createSlice} from '@reduxjs/toolkit';

const defaultState: {
  bookingIsLoading: boolean;
  bookedTime: any[];
  error: boolean;
  carBooked: boolean;
  errorMessage: string;
  dataCustomer: {
    rentTime: string;
    rentDate: string;
    customerName: string;
    customerPhone: string;
    carId: string;
  };
} = {
  bookingIsLoading: false,
  bookedTime: [],
  error: false,
  carBooked: false,
  errorMessage: '',
  dataCustomer: {
    rentDate: '',
    rentTime: '',
    customerName: '',
    customerPhone: '',
    carId: '',
  },
};

export const bookingCarSlice = createSlice({
  name: 'bookingCar',
  initialState: defaultState,
  reducers: {
    bookingDateData(state, action) {
      state.bookingIsLoading = true;
    },
    bookingDateDataSuccess(state, action) {
      state.bookedTime = action.payload;
    },
    bookingCar(state, action) {
      state.dataCustomer = action.payload;
      state.bookingIsLoading = true;
      state.error = false;
    },
    bookingCarSuccess(state) {
      state.carBooked = true;
      state.bookingIsLoading = false;
    },
    bookingCarFailed(state, action) {
      state.bookingIsLoading = false;
      state.errorMessage = action.payload;
      state.error = true;
    },
    clearError(state) {
      state.error = false;
      state.errorMessage = '';
      state.bookingIsLoading = false;
    },
    clearBooked(state) {
      state.carBooked = false;
    },
  },
});

const {actions, reducer} = bookingCarSlice;

export const {
  bookingDateData,
  bookingDateDataSuccess,
  bookingCar,
  bookingCarSuccess,
  bookingCarFailed,
  clearError,
  clearBooked,
} = actions;

export default reducer;
