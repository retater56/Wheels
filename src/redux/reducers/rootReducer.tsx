import {combineReducers} from 'redux';
import {carsReducer} from './carsReducer';
import {createAdReducer} from './createAdReducer';
import {newsReducer} from './newsReducer';
import {ownerCarsReducer} from './ownerCarsReducer';
import {userReducer} from './userReducer';

export const rootReducer = combineReducers({
  news: newsReducer,
  cars: carsReducer,
  user: userReducer,
  createAd: createAdReducer,
  ownerCars: ownerCarsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
