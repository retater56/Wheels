import {createSlice} from '@reduxjs/toolkit';
import {ICar} from '../../components/Search/types';

const defaultState: {
  carsIsFething: boolean;
  dataCars: ICar[];
  error: boolean;
} = {
  carsIsFething: false,
  dataCars: [],
  error: false,
};

export const carsSlice = createSlice({
  name: 'cars',
  initialState: defaultState,
  reducers: {
    fetchCars(state) {
      state.carsIsFething = true;
      state.error = false;
    },
    requestCarsSuccess(state, action) {
      state.dataCars = action.payload;
      state.carsIsFething = false;
      state.error = false;
    },
    requestCarsError(state) {
      state.carsIsFething = false;
      state.error = true;
    },
  },
});

const {actions, reducer} = carsSlice;

export const {fetchCars, requestCarsSuccess, requestCarsError} = actions;

export default reducer;
