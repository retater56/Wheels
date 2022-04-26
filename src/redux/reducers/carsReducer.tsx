import {createSlice} from '@reduxjs/toolkit';
import {ICar} from '../../components/Search/types';

const defaultState: {
  carsIsFething: boolean;
  dataCars: ICar[];
  sort: string;
  error: boolean;
} = {
  carsIsFething: false,
  dataCars: [],
  sort: '',
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
    fetchSortedCars(state, action) {
      state.carsIsFething = true;
      state.error = false;
      state.sort = action.payload;
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

export const {fetchCars, fetchSortedCars, requestCarsSuccess, requestCarsError} = actions;

export default reducer;
