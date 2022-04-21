import {ICar} from './components/Search/types';
import {RootState} from './redux/reducers/rootReducer';

const API_LINK = 'http://localhost:3000';

export const API_NEWS = (keyword: string) => {
  return `https://newsapi.org/v2/everything?q=${keyword}&apiKey=0f0c55d8f06347cc981c74f7426cf2f9`;
};
export const API_CARS = `${API_LINK}/cars`;
export const API_MARKS = `${API_LINK}/marks`;
export const API_MODELS = (mark: string) => {
  return `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${mark}/modelyear/2021?format=json`;
};
export const API_USER_REGISTER = `${API_LINK}/register`;
export const API_USER_LOGIN = `${API_LINK}/login`;

export const API_GET_USER_NAME = (name: string) => {
  return `${API_LINK}/users?userName=${name}`;
};

export const API_GET_USER_BY_EMAIL = (email: string) => {
  return `${API_LINK}/users?email=${email}`;
};

export const API_GET_CUSTOMER_CARS_BY_NAME = (name: string) => {
  return `${API_LINK}/users?userName=${name}`;
};

export const API_GET_CAR_BY_ID = (id: string) => {
  return `${API_LINK}/cars/${id}`;
};

export const API_GET_USER_BY_ID = (id: string) => {
  return `${API_LINK}/users/${id}`;
};

export const getNews = (state: RootState) => state.news.dataNews;
export const getNewsTheme = (state: RootState) => state.news.currentTheme;
export const getNewsIsFetching = (state: RootState) =>
  state.news.newsIsFetching;
export const getNewsError = (state: RootState) => state.news.error;

export const getCars = (state: RootState) => state.cars.dataCars;
export const getCarsIsFetching = (state: RootState) => state.cars.carsIsFething;
export const getCarsError = (state: RootState) => state.cars.error;

export const getUserName = (state: RootState) => state.user.userName;
export const getLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const getUserIsFetching = (state: RootState) => state.user.isLoading;

export const getOwnerCars = (state: RootState) => state.ownerCars.dataCars;
export const getOwnerCarsIsFetching = (state: RootState) =>
  state.ownerCars.carsIsFething;
export const getOwnerCarsError = (state: RootState) => state.ownerCars.error;

export const getCustomerCars = (state: RootState) =>
  state.customerCars.dataCars;
export const getCustomerCarsIsFetching = (state: RootState) =>
  state.customerCars.carsIsFething;
export const getCustomerCarsError = (state: RootState) =>
  state.customerCars.error;

export const getBookedTime = (state: RootState) => state.bookingCar.bookedTime;

export const getImgSource = (item: ICar) => {
  return item.imageSource
    ? item.imageSource
    : 'data:image/jpeg;base64,' + item.imgSourceBase64;
};

export const uriImgBase64 = (imgSource: string) => {
  return {
    uri: `data:image/jpeg;base64,${imgSource}`,
  };
};

export const uriImg = (imgSource: string) => {
  return {
    uri: `${imgSource}`,
  };
};

export const exampleUserLocation = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
