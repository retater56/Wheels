import {call, put, takeEvery} from 'redux-saga/effects';
import {ICar} from '../../components/Search/types';
import {API_CARS} from '../../constants';
import {
  fetchCars,
  fetchSortedCars,
  requestCarsError,
  requestCarsSuccess,
} from '../reducers/carsReducer';

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

function* fetchSortedCarsAsync(action: ReturnType<typeof fetchSortedCars>) {
  const sortLink = action.payload;

  try {
    console.log('fetchSortedCarsAsync');
    const carsData: ICar[] = yield call(async () => {
      const response = await fetch(`${API_CARS}${sortLink}`);
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
  yield takeEvery(fetchCars, fetchCarsAsync);
  yield takeEvery(fetchSortedCars, fetchSortedCarsAsync);
}
