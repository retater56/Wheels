import {createSlice} from '@reduxjs/toolkit';
import {ICar} from '../../components/CreateAd/types';

const defaultState: {
  customer: string;
  carsIsFething: boolean;
  dataCars: ICar[];
  error: boolean;
} = {
  customer: '',
  carsIsFething: false,
  dataCars: [],
  error: false,
};

export const customerCarsSlice = createSlice({
  name: 'customerCars',
  initialState: defaultState,
  reducers: {
    fetchCustomerCars(state, action) {
      state.customer = action.payload;
      state.carsIsFething = true;
      state.error = false;
    },
    requestCustomerCarsSuccess(state, action) {
      state.dataCars = action.payload;
      state.carsIsFething = false;
      state.error = false;
    },
    requestCustomerCarsError(state) {
      state.carsIsFething = false;
      state.error = true;
    },
  },
});

const {actions, reducer} = customerCarsSlice;

export const {
  fetchCustomerCars,
  requestCustomerCarsSuccess,
  requestCustomerCarsError,
} = actions;

export default reducer;
