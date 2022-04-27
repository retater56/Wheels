import {call, put, takeEvery} from 'redux-saga/effects';
import {ICar} from '../../components/Search/types';
import {
  API_CARS,
  API_GET_SORTED_CARS_BY_COST,
  API_GET_SORTED_CARS_BY_COST_DESC,
  API_GET_SORTED_CARS_BY_MARK,
  API_GET_SORTED_CARS_BY_MARK_DESC,
  API_GET_SORTED_CARS_BY_SPEED,
  API_GET_SORTED_CARS_BY_SPEED_DESC,
} from '../../constants';
import {
  fetchCars,
  fetchSortedCars,
  requestCarsError,
  requestCarsSuccess,
} from '../reducers/carsReducer';

function* fetchCarsAsync() {
  try {
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
  let sortedCars: string;

  if (action.payload === 'sortCosts') {
    sortedCars = API_GET_SORTED_CARS_BY_COST;
  } else if (action.payload === 'sortCostsDesc') {
    sortedCars = API_GET_SORTED_CARS_BY_COST_DESC;
  } else if (action.payload === 'sortMarks') {
    sortedCars = API_GET_SORTED_CARS_BY_MARK;
  } else if (action.payload === 'sortMarksDesc') {
    sortedCars = API_GET_SORTED_CARS_BY_MARK_DESC;
  } else if (action.payload === 'sortMaxSpeed') {
    sortedCars = API_GET_SORTED_CARS_BY_SPEED;
  } else if (action.payload === 'sortMaxSpeedDesc') {
    sortedCars = API_GET_SORTED_CARS_BY_SPEED_DESC;
  }

  try {
    const carsData: ICar[] = yield call(async () => {
      const response = await fetch(sortedCars);
      const responseData = await response.json();
      return responseData;
    });
    yield put(requestCarsSuccess(carsData));
  } catch (error) {
    yield put(requestCarsError());
  }
}

export function* watchFetchCars() {
  yield takeEvery(fetchCars, fetchCarsAsync);
  yield takeEvery(fetchSortedCars, fetchSortedCarsAsync);
}
