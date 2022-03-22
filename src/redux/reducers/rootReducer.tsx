import {combineReducers} from 'redux';
import {carsReducer} from './carsReducer';
import {newsReducer} from './newsReducer';
import {userReducer} from './userReducer';

export const rootReducer = combineReducers({
  news: newsReducer,
  cars: carsReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
