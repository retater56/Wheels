import {createSlice} from '@reduxjs/toolkit';
import {today} from '../../components/Search/constants';

const defaultState: {
  bookingIsLoading: boolean;
  bookedTime: any[];
  dataCustomer: {
    rentDate: Date;
    rentTime: string;
    customerName: string;
    customerPhone: string;
    carId: string;
  };
  error: boolean;
} = {
  bookingIsLoading: false,
  bookedTime: [],
  dataCustomer: {
    rentDate: today,
    rentTime: '',
    customerName: '',
    customerPhone: '',
    carId: '',
  },
  error: false,
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
      state.bookingIsLoading = false;
    },
    bookingCarFailed(state) {
      state.bookingIsLoading = false;
      state.error = true;
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
} = actions;

export default reducer;
