import {createSlice} from '@reduxjs/toolkit';
import {ICar} from '../../components/CreateAd/types';

const defaultState: {
  owner: string;
  carsIsFething: boolean;
  dataCars: ICar[];
  error: boolean;
} = {
  owner: '',
  carsIsFething: false,
  dataCars: [],
  error: false,
};

export const ownerCarsSlice = createSlice({
  name: 'ownerCars',
  initialState: defaultState,
  reducers: {
    fetchOwnerCars(state, action) {
      (state.owner = action.payload),
        (state.carsIsFething = true),
        (state.error = false);
    },
    requestOwnerCarsSuccess(state, action) {
      (state.dataCars = action.payload),
        (state.carsIsFething = false),
        (state.error = false);
    },
    requestOwnerCarsError(state) {
      (state.carsIsFething = false), (state.error = true);
    },
  },
});

const {actions, reducer} = ownerCarsSlice;

export const {fetchOwnerCars, requestOwnerCarsSuccess, requestOwnerCarsError} =
  actions;

export default reducer;
