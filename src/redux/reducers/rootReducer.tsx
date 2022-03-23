import {combineReducers} from 'redux';
import {carsReducer} from './carsReducer';
import {createAdReducer} from './createAdReducer';
import {newsReducer} from './newsReducer';
import {userReducer} from './userReducer';

export const rootReducer = combineReducers({
  news: newsReducer,
  cars: carsReducer,
  user: userReducer,
  createAd: createAdReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
