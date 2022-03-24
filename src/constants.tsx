import {RootState} from './redux/reducers/rootReducer';

export const API_NEWS =
  'https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=0f0c55d8f06347cc981c74f7426cf2f9';
export const API_CARS = 'http://localhost:3000/cars';
export const API_MARKS = 'http://localhost:3000/marks';
export const API_MODELS = (mark: string) => {
  return `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${mark}/modelyear/2021?format=json`;
};
export const API_USER_REGISTER = 'http://localhost:3000/register';
export const API_USER_LOGIN = 'http://localhost:3000/login';

export const API_GET_USER_BY_EMAIL = (email: string) => {
  return `http://localhost:3000/users?email=${email}`;
};

export const API_GET_CARS_BY_NAME = (name: string) => {
  return `http://localhost:3000/cars?owner=${name}`;
};

export const getNews = (state: RootState) => state.news.dataNews;
export const getNewsIsFetching = (state: RootState) =>
  state.news.newsIsFetching;
export const getNewsError = (state: RootState) => state.news.error;

export const getCars = (state: RootState) => state.cars.dataCars;
export const getCarsIsFetching = (state: RootState) => state.cars.carsIsFething;
export const getCarsError = (state: RootState) => state.cars.error;

export const getUserName = (state: RootState) => state.user.userName;
export const getLoggedIn = (state: RootState) => state.user.isLoggedIn;

export const getOwnerCars = (state: RootState) => state.ownerCars.dataCars;
export const getOwnerCarsIsFetching = (state: RootState) => state.ownerCars.carsIsFething;
export const getOwnerCarsError = (state: RootState) => state.ownerCars.error;
