import {ICar} from '../../components/CreateAd/types';
import {createSlice} from '@reduxjs/toolkit';

const defaultState: {
  isLoading: boolean;
  dataCar: ICar;
  error: boolean;
} = {
  isLoading: false,
  dataCar: {
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
    cost: '',
    position: '',
    description: '',
    booking: {},
    owner: '',
  },
  error: false,
};

export const createAdSlice = createSlice({
  name: 'createAd',
  initialState: defaultState,
  reducers: {
    addCar(state, action) {
      state.dataCar = action.payload;
      state.isLoading = true;
      state.error = false;
    },
    updateCar(state, action) {
      state.dataCar = action.payload;
      state.isLoading = true;
      state.error = false;
    },
    addCarSuccess(state) {
      state.isLoading = false;
    },
    addCarFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
  },
});

const {actions, reducer} = createAdSlice;

export const {addCar, updateCar, addCarSuccess, addCarFailed} = actions;

export default reducer;
