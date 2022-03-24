import {call, put, takeEvery} from 'redux-saga/effects';
import {ICar} from '../../components/CreateAd/types';
import {API_GET_CARS_BY_NAME} from '../../constants';
import {
  requestOwnerCarsSuccess,
  requestOwnerCarsError,
  fetchOwnerCars,
} from '../actions/ownerAds';
import {FETCHED_OWNER_CARS} from '../constants';

function* fetchOwnerCarsAsync(action: ReturnType<typeof fetchOwnerCars>) {
  const owner = action.payload;

  try {
    console.log('fetchOwnerCarsAsync');
    const carsData: ICar[] = yield call(async () => {
      const response = await fetch(API_GET_CARS_BY_NAME(owner));
      const responseData = await response.json();
      return responseData;
    });
    yield put(requestOwnerCarsSuccess(carsData));
  } catch (error) {
    yield put(requestOwnerCarsError());
  }
}

export function* watchFetchOwnerCars() {
  console.log('watchFetchOwnerCars');
  yield takeEvery(FETCHED_OWNER_CARS, fetchOwnerCarsAsync);
}
