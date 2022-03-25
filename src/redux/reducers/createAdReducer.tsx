import {ICar} from '../../components/CreateAd/types';
import {createSlice} from '@reduxjs/toolkit';

const defaultState: {
  isLoading: boolean;
  dataCar: ICar;
  error: boolean;
} = {
  isLoading: false,
  dataCar: {
    imgSourceBase64: '',
    mark: '',
    model: '',
    fuel: '',
    doors: '',
    transmission: '',
    seats: '',
    baggageCapacity: '',
    capacity: '',
    owner: '',
  },
  error: false,
};

export const createAdSlice = createSlice({
  name: 'createAd',
  initialState: defaultState,
  reducers: {
    addCar(state, action) {
      (state.dataCar = action.payload),
        (state.isLoading = true),
        (state.error = false);
    },
    addCarSuccess(state) {
      state.isLoading = false;
    },
    addCarFailed(state) {
      (state.isLoading = false), (state.error = true);
    },
  },
});

const {actions, reducer} = createAdSlice;

export const {addCar, addCarSuccess, addCarFailed} = actions;

export default reducer;
