import {combineReducers} from '@reduxjs/toolkit';
import carsReducer from './carsReducer';
import createAdReducer from './createAdReducer';
import newsReducer from './newsReducer';
import ownerCarsReducer from './ownerCarsReducer';
import userReducer from './userReducer';
import bookingCarReducer from './bookingCarReducer';
import customerCarsReducer from './customerCarsReducer';

export const rootReducer = combineReducers({
  news: newsReducer,
  cars: carsReducer,
  user: userReducer,
  createAd: createAdReducer,
  ownerCars: ownerCarsReducer,
  customerCars: customerCarsReducer,
  bookingCar: bookingCarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
