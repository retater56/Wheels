import {createSlice} from '@reduxjs/toolkit';
import {ICar} from '../../components/CreateAd/types';

const defaultState: {
  isLoading: boolean;
  item: ICar;
  userName: string;
  error: boolean;
} = {
  isLoading: false,
  item: {
    id: '',
    imgSourceBase64: '',
    mark: '',
    model: '',
    fuel: '',
    vehicleType: '',
    transmission: '',
    seats: '',
    maxSpeed: '',
    capacity: '',
    position: '',
    cost: '',
    description: '',
    booking: {},
  },
  userName: '',
  error: false,
};

export const cancelBookingSlice = createSlice({
  name: 'cancelBooking',
  initialState: defaultState,
  reducers: {
    cancelBooking(state, action) {
      state.isLoading = true;
      state.item = action.payload.item;
      state.userName = action.payload.userName;
      state.error = false;
    },
    cancelBookingSuccess(state) {
      state.isLoading = false;
    },
    cancelBookingFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
  },
});

const {actions, reducer} = cancelBookingSlice;

export const {
  cancelBooking,
  cancelBookingSuccess,
  cancelBookingFailed,
} = actions;

export default reducer;
