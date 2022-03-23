import {call, put, takeEvery} from 'redux-saga/effects';
import {ICar} from '../../components/Search/types';
import {API_CARS} from '../../constants';
import {
  requestCarsError,
  requestCarsSuccess,
} from '../actions/cars';
import {FETCHED_CARS} from '../constants';

function* fetchCarsAsync() {
  try {
    console.log('fetchCarsAsync');
    const carsData: ICar[] = yield call(async () => {
      const response = await fetch(API_CARS);
      const responseData = await response.json();
      return responseData;
    });
    yield put(requestCarsSuccess(carsData));
  } catch (error) {
    yield put(requestCarsError());
  }
}

export function* watchFetchCars() {
  console.log('watchFetchCars');
  yield takeEvery(FETCHED_CARS, fetchCarsAsync);
}
